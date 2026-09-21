import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LeaveCard } from '@/components/shared/LeaveCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { FadeInView } from '@/components/ui/Reveal';
import { Screen } from '@/components/ui/Screen';
import { useRefreshing } from '@/hooks/useRefreshing';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { LeaveStatus } from '@/constants/types';
import { useLeaveStore } from '@/store/leave';

const FILTERS: { key: 'all' | LeaveStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'declined', label: 'Declined' },
];

export default function ManagementLeaveRequestsScreen() {
  const requests = useLeaveStore((s) => s.requests);
  const { refreshing, onRefresh } = useRefreshing();
  const [filter, setFilter] = useState<'all' | LeaveStatus>('all');

  const filtered = requests.filter((r) => filter === 'all' || r.status === filter);
  const pending = requests.filter((r) => r.status === 'pending').length;

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header title="Leave requests" subtitle={`${pending} pending across the school`} />

      <View style={styles.chipRow}>
        {FILTERS.map((f) => (
          <Pressable key={f.key} onPress={() => setFilter(f.key)} style={[styles.chip, filter === f.key && styles.chipActive]}>
            <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>{f.label}</Text>
          </Pressable>
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState icon="calendar-remove-outline" title="Nothing here" message="No leave requests match this filter." />
      ) : (
        <>
          {filtered.map((r, i) => (
            <FadeInView key={r.id} delay={i * 40}>
              <LeaveCard request={r} />
            </FadeInView>
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
});