import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';

import { Colors, FontFamily, Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { usePressScale } from '@/components/ui/motion/usePressScale';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  padded?: boolean;
}

export function Card({ children, onPress, padded = true, style, ...rest }: CardProps) {
  if (onPress) {
    return (
      <View style={styles.shadowWrap}>
        <PressableCard onPress={onPress} padded={padded} style={style}>
          {children}
        </PressableCard>
      </View>
    );
  }
  return (
    <View style={styles.shadowWrap}>
      <View style={[styles.card, padded && styles.padded, style]} {...rest}>
        {children}
      </View>
    </View>
  );
}

function PressableCard({
  children,
  onPress,
  padded,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  padded: boolean;
  style?: CardProps['style'];
}) {
  const { scale, handlers } = usePressScale();
  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        {...handlers}
        style={({ pressed }) => [
          styles.card,
          padded && styles.padded,
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export function CardTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.headerRow}>
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: Radius.lg,
    ...Shadow.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  padded: {
    padding: Spacing.five,
  },
  pressed: {
    opacity: 0.94,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: Type.subheading,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: Type.bodySmall,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
