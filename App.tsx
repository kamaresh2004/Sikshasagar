import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts as useFredoka,
} from '@expo-google-fonts/fredoka';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Easing, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Logo } from '@/components/brand/Logo';
import { ToastHost } from '@/components/ui/Toast';
import { Colors } from '@/constants/theme';
import { api } from '@/services/api';
import { ensurePushSetup, scheduleFeeDueReminder } from '@/services/notifications';
import { unwireRealtime, wireRealtime } from '@/services/realtime';
import AuthNavigator from '@/navigation/AuthNavigator';
import RootNavigator from '@/navigation/RootNavigator';
import { useAuthStore } from '@/store/auth';
import { useLeaveStore } from '@/store/leave';
import { useNotificationsStore } from '@/store/notifications';

function Splash() {
  const [scale] = useState(() => new Animated.Value(0.7));
  const [opacity] = useState(() => new Animated.Value(0));
  const [spinner] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(120),
      Animated.timing(spinner, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity, spinner]);

  return (
    <View style={styles.splash}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Logo size={88} />
      </Animated.View>
      <Animated.View
        style={[
          styles.spinner,
          {
            opacity: spinner,
            transform: [
              {
                scale: spinner.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ],
          },
        ]}
      >
        <ActivityIndicator color={Colors.primary} />
      </Animated.View>
    </View>
  );
}

export default function App() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const hydrate = useAuthStore((s) => s.hydrate);
  const [fontsLoaded] = useFredoka({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const [fontTimeout, setFontTimeout] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFontTimeout(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const ready = fontsLoaded || fontTimeout;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user) {
      unwireRealtime();
      return;
    }
    wireRealtime();
    // Prime the live stores (notifications + leave) so screens show server data
    // instead of the mock snapshot immediately.
    api.listNotifications().then((res) => {
      if (res.ok && res.data) useNotificationsStore.getState().setItems(res.data);
    });
    api.listLeave().then((res) => {
      if (res.ok && res.data) useLeaveStore.getState().setRequests(res.data);
    });
    ensurePushSetup()
      .then((token) => {
        if (token) api.registerPushToken(token);
      })
      .then(() => scheduleFeeDueReminder());
    return () => unwireRealtime();
  }, [user]);

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <NavigationContainer theme={DefaultTheme}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
          {!ready || isLoading ? <Splash /> : user ? <RootNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        <ToastHost />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  splash: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginTop: 24,
    height: 24,
  },
});
