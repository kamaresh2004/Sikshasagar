import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors, FontFamily } from '@/constants/theme';

interface DemoAccount {
  label: string;
  email: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  tint: string;
  soft: string;
  active?: boolean;
}

export function DemoAccounts({ accounts, onSelect }: { accounts: DemoAccount[]; onSelect: (email: string) => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Try a demo login</Text>
      {accounts.map((a) => (
        <View key={a.email} style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: a.soft }]}>
            <MaterialCommunityIcons name={a.icon} size={18} color={a.tint} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>{a.label}</Text>
            <Text style={styles.email}>{a.email}</Text>
          </View>
          <PressableChip
            label={a.active ? 'Filled' : 'Use'}
            onPress={() => onSelect(a.email)}
          />
        </View>
      ))}
    </View>
  );
}

function PressableChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <View style={[styles.chip, label === 'Filled' && styles.chipActive]}>
      <Text style={[styles.chipText, label === 'Filled' && styles.chipTextActive]} onPress={onPress}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#C7E5F8',
  },
  title: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  email: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.primary,
  },
  chipTextActive: {
    color: Colors.white,
  },
});
