import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';

interface SkeletonProps {
  height?: number;
  width?: number | `${number}%`;
  radius?: number;
  style?: ViewStyle;
}

/**
 * Shimmering placeholder block. Use while data is loading instead of a
 * blank screen or a spinner — instantly reads as "professional".
 */
export function Skeleton({ height = 14, width = '100%', radius = 8, style }: SkeletonProps) {
  const [shimmer] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const translateX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-180, 620] });

  return (
    <View
      style={[{ height, width, borderRadius: radius, backgroundColor: Colors.neutralSoft, overflow: 'hidden' }, style]}
    >
      <Animated.View style={[styles.sheen, { pointerEvents: 'none', transform: [{ translateX }] }]} />
    </View>
  );
}

/** Placeholder that mirrors a StatCard (gradient value card). */
export function SkeletonStat() {
  return (
    <View style={[styles.shell, styles.stat]}>
      <Skeleton height={38} width={38} radius={19} />
      <Skeleton height={26} width="60%" radius={6} style={{ marginTop: 12 }} />
      <Skeleton height={12} width="72%" radius={6} style={{ marginTop: 8 }} />
    </View>
  );
}

/** Placeholder that mirrors an announcement / activity card. */
export function SkeletonNotice() {
  return (
    <View style={[styles.shell, styles.notice]}>
      <View style={styles.noticeTop}>
        <Skeleton height={34} width={34} radius={17} />
        <Skeleton height={15} width="42%" radius={6} />
        <Skeleton height={15} width={34} radius={17} />
      </View>
      <Skeleton height={12} width="92%" radius={6} style={{ marginTop: 12 }} />
      <Skeleton height={12} width="66%" radius={6} style={{ marginTop: 6 }} />
    </View>
  );
}

/** Placeholder for a list row (avatar + text + trailing pill). */
export function SkeletonRow() {
  return (
    <View style={[styles.shell, styles.row]}>
      <Skeleton height={36} width={36} radius={18} />
      <View style={styles.rowText}>
        <Skeleton height={14} width="58%" radius={6} />
        <Skeleton height={11} width="38%" radius={5} />
      </View>
      <Skeleton height={20} width={52} radius={10} />
    </View>
  );
}

/** Narrow heading line used inside skeleton screens. */
export function SkeletonTitle() {
  return <Skeleton height={16} width={128} radius={6} style={{ marginTop: 20, marginBottom: 12 }} />;
}

const styles = StyleSheet.create({
  sheen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 120,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  shell: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.md,
  },
  stat: {
    minHeight: 132,
    padding: Spacing.four,
  },
  notice: {
    padding: Spacing.five,
    marginBottom: Spacing.three,
  },
  noticeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  rowText: {
    flex: 1,
    gap: 6,
  },
});
