import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { Motion } from '@/constants/theme';
import { FadeInUp, PopIn as MotionPopIn } from '@/components/ui/motion/Entrance';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: ViewStyle;
}

/**
 * Fade + rise entrance. Backwards-compatible alias backed by the reanimated
 * (UI-thread) motion kit.
 */
export function Reveal({ children, delay = 0, distance = Motion.rise, style }: FadeInViewProps) {
  return (
    <FadeInUp delay={delay} distance={distance} style={style}>
      {children}
    </FadeInUp>
  );
}

/** Friendly alias for Reveal. */
export const FadeInView = Reveal;

/**
 * Stagger — assembles its children one after another.
 *   <Stagger>…sections…</Stagger>
 */
export function Stagger({ children }: { children: React.ReactNode }) {
  const childrenArr = React.Children.toArray(children);
  return (
    <>
      {childrenArr.map((child, i) => (
        <View key={i}>
          <FadeInUp delay={i * 40}>{child}</FadeInUp>
        </View>
      ))}
    </>
  );
}

/** Spring pop-in for emphasis (hero numbers, milestones). */
export function PopIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}) {
  return (
    <MotionPopIn delay={delay} style={style}>
      {children}
    </MotionPopIn>
  );
}