import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors, FontFamily, Radius } from '@/constants/theme';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'coral';

interface BadgeProps {
  label: string;
  tone?: Tone;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const TONES: Record<Tone, { colors: readonly [string, string]; fg: string }> = {
  primary: { colors: [Colors.primarySoft, '#CFE5EC'], fg: Colors.primaryDark },
  success: { colors: [Colors.successSoft, '#D2EFE0'], fg: Colors.successDark },
  warning: { colors: [Colors.warningSoft, '#FAE8C9'], fg: Colors.warningDark },
  danger: { colors: [Colors.dangerSoft, '#F9D7D7'], fg: Colors.danger },
  info: { colors: [Colors.infoSoft, '#CFE5EC'], fg: Colors.info },
  neutral: { colors: [Colors.neutralSoft, '#DFE5EC'], fg: Colors.textSecondary },
  coral: { colors: [Colors.coralSoft, '#FAD8CE'], fg: Colors.coralDark },
};

export function Badge({ label, tone = 'neutral', icon }: BadgeProps) {
  const { colors, fg } = TONES[tone];
  return (
    <LinearGradient colors={[...colors]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.wrap}>
      {icon ? <MaterialCommunityIcons name={icon} size={13} color={fg} style={styles.icon} /> : null}
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: FontFamily.display,
    fontWeight: '700',
  },
});
