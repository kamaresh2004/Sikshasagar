import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors, FontFamily, Radius, Spacing, Type } from '@/constants/theme';

interface ListItemProps {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  emoji?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  tint?: string;
}

function ListItemPressable({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      {children}
    </Pressable>
  );
}

export function ListItem({ icon, emoji, title, subtitle, right, onPress, tint }: ListItemProps) {
  const color = tint ?? Colors.primary;
  const body = (
    <>
      {icon ? (
        <View style={[styles.iconWrap, { backgroundColor: `${color}18` }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
      ) : emoji ? (
        <View style={[styles.iconWrap, styles.emojiWrap]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      ) : null}
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ?? (onPress ? <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.textMuted} /> : null)}
    </>
  );

  if (onPress) {
    return (
      <ListItemPressable onPress={onPress}>
        <View style={styles.row}>{body}</View>
      </ListItemPressable>
    );
  }
  return <View style={styles.row}>{body}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiWrap: {
    backgroundColor: Colors.primarySoft,
  },
  emoji: {
    fontSize: 22,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: Type.body,
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
