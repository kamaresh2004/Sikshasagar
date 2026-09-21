import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  emoji?: string;
  title: string;
  message?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon = 'check-decagram', emoji, title, message, children }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      {emoji ? (
        <Text style={styles.emoji}>{emoji}</Text>
      ) : (
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name={icon} size={32} color={Colors.primary} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: Spacing.seven,
    paddingHorizontal: Spacing.six,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  emoji: {
    fontSize: 40,
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  message: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.two,
    lineHeight: 18,
  },
});
