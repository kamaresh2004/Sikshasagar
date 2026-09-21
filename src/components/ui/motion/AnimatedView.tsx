import React from 'react';
import { Animated as RNAnimated, StyleSheet, type ViewStyle } from 'react-native';

/**
 * Pre-built Animated.View that applies an animated scale for press feedback.
 * Usage: pass `scale` from `usePressScale()`.
 */
export function AnimatedView({
  scale,
  style,
  children,
  ...rest
}: {
  scale: RNAnimated.AnimatedInterpolation<number> | RNAnimated.Value;
  style?: ViewStyle | (ViewStyle | undefined)[] | null;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof RNAnimated.View>, 'style'>) {
  return (
    <RNAnimated.View style={[styles.base, style, { transform: [{ scale }] }]} {...rest}>
      {children}
    </RNAnimated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
  },
});