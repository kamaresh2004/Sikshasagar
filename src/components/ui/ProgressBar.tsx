import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { Colors, Motion } from '@/constants/theme';

interface ProgressBarProps {
  /** 0..1 fraction of completion. */
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

/**
 * Animated progress fill (used for fee collection, attendance, etc.).
 * The bar eases from its current width to the target on mount/update.
 */
export function ProgressBar({ progress, color = Colors.success, trackColor = '#E5EAF0', height = 8 }: ProgressBarProps) {
  const [anim] = useState(() => new Animated.Value(0));
  const clamped = Math.max(0, Math.min(1, progress));

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamped,
      duration: Motion.slow + 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [anim, clamped]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
      <Animated.View style={[styles.fill, { width, backgroundColor: color, borderRadius: height / 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});