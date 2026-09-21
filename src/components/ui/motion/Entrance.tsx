import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, type ViewStyle } from 'react-native';

import { Motion } from '@/constants/theme';

interface FadeInUpProps {
  children: React.ReactNode;
  /** Stagger offset in ms. Keep small so cards assemble quickly. */
  delay?: number;
  distance?: number;
  duration?: number;
  style?: ViewStyle;
}

/**
 * Fade + slight upward slide entrance (RN core Animated — reliable on web +
 * native). Use for screen-level and card-list entrances (150–250ms).
 */
export function FadeInUp({
  children,
  delay = 0,
  distance = Motion.rise,
  duration = Motion.normal,
  style,
}: FadeInUpProps) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(distance));

  useEffect(() => {
    const anim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    anim.start();
    return () => anim.stop();
  }, [opacity, translateY, delay, distance, duration]);

  return (
    <Animated.View style={[styles.base, { opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

interface PopInProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}

/**
 * Spring pop-in for emphasis (hero numbers, milestone values). One-off use.
 */
export function PopIn({ children, delay = 0, style }: PopInProps) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.94));

  useEffect(() => {
    const anim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        ...Motion.springBounce,
        delay,
        useNativeDriver: true,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }),
    ]);
    anim.start();
    return () => anim.stop();
  }, [opacity, scale, delay]);

  return (
    <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
