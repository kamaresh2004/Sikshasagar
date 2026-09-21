import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, Motion, Radius, Shadow, Spacing } from '@/constants/theme';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const TOAST_COLORS: Record<ToastType, string> = {
  success: Colors.success,
  error: Colors.danger,
  info: Colors.primary,
};

const TOAST_ICONS: Record<ToastType, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'information',
};

let toastListeners: ((t: ToastItem) => void)[] = [];
let toastCounter = 0;

/**
 * Fire a toast from anywhere: `toast('Attendance saved', 'success')`.
 * The message slides in from the top and auto-dismisses.
 */
export function toast(message: string, type: ToastType = 'success') {
  const item = { id: ++toastCounter, message, type };
  toastListeners.forEach((l) => l(item));
}

/** Mount once at the app root (inside a SafeAreaProvider). */
export function ToastHost() {
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(-140));
  const [opacity] = useState(() => new Animated.Value(0));
  const [item, setItem] = useState<ToastItem | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (t: ToastItem) => {
      setItem(t);
      translateY.setValue(-140);
      opacity.setValue(0);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: Motion.normal, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: Motion.fast + 40, useNativeDriver: true }),
      ]).start();
      timeoutRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -140, duration: Motion.fast, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: Motion.fast, useNativeDriver: true }),
        ]).start(() => setItem(null));
      }, 2600);
    },
    [translateY, opacity],
  );

  useEffect(() => {
    toastListeners.push(show);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== show);
    };
  }, [show]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  if (!item) return null;

  const color = TOAST_COLORS[item.type];

  return (
    <View style={[styles.wrap, styles.nonInteractive, { top: insets.top + 10 }]}>
      <Animated.View
        style={[styles.toast, { opacity, transform: [{ translateY }] }]}
        accessibilityLiveRegion="polite"
      >
        <View style={[styles.icon, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={TOAST_ICONS[item.type]} size={18} color={Colors.white} />
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  nonInteractive: {
    pointerEvents: 'none',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    width: '92%',
    maxWidth: 560,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    ...Shadow.lg,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: Colors.text,
    lineHeight: 19,
  },
});
