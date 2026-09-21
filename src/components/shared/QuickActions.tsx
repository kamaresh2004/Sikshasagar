import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Reveal, PopIn } from '@/components/ui/Reveal';
import { usePressScale } from '@/components/ui/usePressScale';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

export interface QuickAction {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tint: string;
  onPress: () => void;
}

export function QuickActions({ actions, columns = 4 }: { actions: QuickAction[]; columns?: number }) {
  return (
    <View style={[styles.grid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {actions.map(({ key, ...a }, i) => (
        <Reveal key={key} delay={i * 45} style={{ width: `${100 / columns}%` }}>
          <QuickActionCell {...a} />
        </Reveal>
      ))}
    </View>
  );
}

function QuickActionCell({
  label,
  icon,
  tint,
  onPress,
}: {
  label: string;
  icon: QuickAction['icon'];
  tint: string;
  onPress: () => void;
}) {
  const { scale, handlers } = usePressScale();
  return (
    <Animated.View style={[styles.cell, { transform: [{ scale }] }]}>
      <Pressable onPress={onPress} {...handlers}>
        <View style={[styles.iconWrap, { backgroundColor: `${tint}1C` }]}>
          <PopIn>
            <MaterialCommunityIcons name={icon} size={24} color={tint} />
          </PopIn>
        </View>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: Spacing.four,
    rowGap: Spacing.four,
  },
  cell: {
    alignItems: 'center',
    paddingHorizontal: Spacing.one,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
