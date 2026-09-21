/**
 * Push notifications — client wiring.
 *
 * The app is currently backed by mock data, so this module:
 *   1. Requests permission and registers the Expo push token (client side).
 *   2. Fires LOCAL notifications on device for in-app actions
 *      (attendance saved, leave decided, fee dued reminder).
 *
 * Real remote push to other devices needs a backend that calls the Expo Push
 * API (or FCM) with a registered token — the token obtained here is what that
 * backend would target. Remote push will light up without UI changes once a
 * server is connected.
 *
 * NOTE: Android remote-push was removed from Expo Go in SDK 53+, and loading
 * the expo-notifications module in Expo Go throws at startup. To keep the app
 * working when scanned with Expo Go, the module is loaded LAZILY behind a
 * try/catch — on Expo Go every call safely no-ops; in a dev build / standalone
 * app local + remote notifications light up.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';

import { FEES, studentById } from '@/constants/mock';
import { Student } from '@/constants/types';
import { useAuthStore } from '@/store/auth';

type NotificationsModule = typeof import('expo-notifications');

let notificationsModule: NotificationsModule | null | undefined;

/**
 * Lazy-require expo-notifications.
 * Returns null in Expo Go, where loading the module throws on Android
 * (remote push was removed there in SDK 53+), so we never touch it there.
 */
function getNotifications(): NotificationsModule | null {
  if (notificationsModule !== undefined) return notificationsModule;
  if (isRunningInExpoGo()) {
    notificationsModule = null;
    return null;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const mod = require('expo-notifications') as NotificationsModule;
    mod.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    notificationsModule = mod;
  } catch {
    notificationsModule = null;
  }
  return notificationsModule;
}

/** Request permission + create the Android channel + fetch the push token. */
export async function ensurePushSetup(): Promise<string | null> {
  const Notifications = getNotifications();
  if (!Notifications) return null;
  try {
    const current = await Notifications.getPermissionsAsync();
    let permission = current;
    if (permission.status !== 'granted') {
      permission = await Notifications.requestPermissionsAsync();
    }
    if (permission.status !== 'granted') return null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch {
      return null; // push token needs a projectId (works in a dev build, not Expo Go)
    }
  } catch {
    return null;
  }
}

let lastNotificationAt = 0;

/** Fire a local notification immediately (debounced to avoid bursts). */
export async function notify(title: string, body: string) {
  const Notifications = getNotifications();
  if (!Notifications) return;
  const now = Date.now();
  if (now - lastNotificationAt < 1500) return;
  lastNotificationAt = now;
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default', data: { screen: 'Notifications' } },
      trigger: null,
    });
  } catch {
    // notifications unavailable (e.g. web) — ignore
  }
}

/**
 * Schedule a one-time reminder for the next outstanding fee for the current
 * user's children. Runs once per install, at 9 AM on the due date.
 */
export async function scheduleFeeDueReminder() {
  const Notifications = getNotifications();
  if (!Notifications) return;
  const user = useAuthStore.getState().user;
  if (!user?.linkedStudentIds?.length) return;
  const children = user.linkedStudentIds
    .map((id) => studentById(id))
    .filter((s): s is Student => Boolean(s));
  const outstanding = FEES.find(
    (f) => f.status !== 'paid' && children.some((c) => c.id === f.studentId),
  );
  if (!outstanding) return;
  try {
    const flagged = await AsyncStorage.getItem('sikshasagar.feeReminderScheduled');
    if (flagged) return;
    const when = new Date(`${outstanding.dueDate} 09:00:00`);
    if (Number.isNaN(when.getTime()) || when.getTime() < Date.now() + 60000) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Fee due reminder',
        body: `${outstanding.studentName}'s balance of ₹${(outstanding.amount - outstanding.paid).toLocaleString('en-IN')} is due by ${outstanding.dueDate}.`,
        sound: 'default',
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: when },
    });
    await AsyncStorage.setItem('sikshasagar.feeReminderScheduled', '1');
  } catch {
    // ignore setup failures
  }
}