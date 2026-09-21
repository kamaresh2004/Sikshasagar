import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { usePressScale } from '@/components/ui/motion/usePressScale';
import { Colors, FontFamily, Gradients, Radius, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'soft';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  style?: ViewStyle;
  fullWidth?: boolean;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: Colors.primary,
  accent: Colors.accent,
  outline: 'transparent',
  ghost: 'transparent',
  danger: Colors.danger,
  soft: Colors.primarySoft,
};

const VARIANT_FG: Record<Variant, string> = {
  primary: Colors.white,
  accent: Colors.white,
  outline: Colors.primary,
  ghost: Colors.primary,
  danger: Colors.white,
  soft: Colors.primaryDark,
};

const VARIANT_BORDER: Record<Variant, string> = {
  primary: 'transparent',
  accent: 'transparent',
  outline: Colors.primary,
  ghost: 'transparent',
  danger: Colors.danger,
  soft: 'transparent',
};

const VARIANT_GRADIENT: Partial<Record<Variant, readonly [string, string]>> = {
  primary: Gradients.statPrimary,
  accent: Gradients.statAccent,
  danger: [Colors.danger, Colors.danger],
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  fullWidth = true,
}: ButtonProps) {
  const bg = VARIANT_BG[variant];
  const fg = VARIANT_FG[variant];
  const border = VARIANT_BORDER[variant];
  const gradient = VARIANT_GRADIENT[variant];
  const { scale, handlers } = usePressScale();

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        {...handlers}
        style={({ pressed }) => [
          styles.base,
          fullWidth && styles.full,
          { backgroundColor: bg, borderColor: border },
          (disabled || loading) && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        {gradient && (
          <LinearGradient
            colors={[...gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, styles.nonInteractive]}
          />
        )}
        {icon && !loading && (
          <MaterialCommunityIcons name={icon} size={20} color={fg} style={styles.icon} />
        )}
        <Text style={[styles.label, { color: fg }]}>{loading ? 'Please wait…' : title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...({ shadowColor: '#14324A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 3 } as object),
  },
  full: {
    alignSelf: 'stretch',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.md,
  },
  nonInteractive: {
    pointerEvents: 'none',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily.displayBold,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  icon: {
    marginRight: Spacing.two,
  },
});
