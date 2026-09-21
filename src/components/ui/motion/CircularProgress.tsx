import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Colors, FontFamily, Type } from '@/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  duration?: number;
}

/**
 * Animated circular progress ring. The stroke draws to `value` (RN core
 * Animated — reliable on web + native). Used for attendance/performance %s.
 */
export function CircularProgress({
  value,
  size = 84,
  strokeWidth = 9,
  color = Colors.primary,
  trackColor = Colors.border,
  label,
  duration = 600,
}: CircularProgressProps) {
  const [progress] = useState(() => new Animated.Value(0));
  const clamped = Math.max(0, Math.min(100, value));

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: clamped,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [progress, clamped, duration]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.value, { color }]}>{label ?? `${Math.round(clamped)}%`}</Text>
      </View>
    </View>
  );
}

export interface RingCardStyle {
  card?: ViewStyle;
  label?: TextStyle;
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: Type.body,
    fontFamily: FontFamily.displayBold,
    fontWeight: '700',
  },
});