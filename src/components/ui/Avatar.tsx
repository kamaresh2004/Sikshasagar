import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

interface AvatarProps {
  name: string;
  color?: string;
  emoji?: string;
  size?: number;
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export function Avatar({ name, color, emoji, size = 44 }: AvatarProps) {
  const bg = color ?? Colors.primary;
  const font = Math.round(size * 0.38);
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: emoji ? Colors.primarySoft : bg,
        },
      ]}
    >
      {emoji ? (
        <Text style={{ fontSize: Math.round(size * 0.5) }}>{emoji}</Text>
      ) : (
        <Text style={[styles.text, { color: '#FFFFFF', fontSize: font }]}>{initials(name)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  text: {
    fontFamily: FontFamily.display,
    fontWeight: '700',
  },
});
