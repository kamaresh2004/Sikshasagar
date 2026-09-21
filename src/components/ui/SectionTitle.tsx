import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Spacing, Type } from '@/constants/theme';

interface SectionTitleProps {
  title: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
    marginTop: Spacing.five,
  },
  title: {
    fontSize: Type.subheading,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
});
