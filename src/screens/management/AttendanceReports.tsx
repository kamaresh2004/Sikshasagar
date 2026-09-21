import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AttStatus, Colors, FontFamily, Spacing } from '@/constants/theme';
import { ATTENDANCE_TODAY, CLASSES, attendanceRate } from '@/constants/mock';
import { AttStatusKey } from '@/constants/theme';

const STATUS_KEYS: AttStatusKey[] = ['PRESENT', 'ABSENT', 'LEAVE'];

export default function AttendanceReportsScreen() {
  const [selected, setSelected] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<AttStatusKey | 'all'>('all');

  const filtered = ATTENDANCE_TODAY.filter(
    (a) =>
      (selected === 'all' || a.classId === selected) &&
      (statusFilter === 'all' || a.status === statusFilter),
  );

  const rate = attendanceRate();

  return (
    <Screen scroll>
      <Header title="Attendance reports" subtitle="Fri, 07 Aug 2026" />

      <View style={styles.chipRow}>
        <FilterChip label="All classes" active={selected === 'all'} onPress={() => setSelected('all')} />
        {CLASSES.map((c) => (
          <FilterChip key={c.id} label={c.name} active={selected === c.id} onPress={() => setSelected(c.id)} />
        ))}
      </View>

      <View style={styles.statusRow}>
        <FilterChip label="All" active={statusFilter === 'all'} onPress={() => setStatusFilter('all')} />
        {STATUS_KEYS.map((k) => (
          <FilterChip
            key={k}
            label={AttStatus[k].label}
            active={statusFilter === k}
            onPress={() => setStatusFilter(k)}
            dotColor={AttStatus[k].color}
          />
        ))}
      </View>

      <SectionTitle title="Summary" />
      <Card style={styles.summaryCard}>
        {STATUS_KEYS.map((k, i) => {
          const count = ATTENDANCE_TODAY.filter((a) => a.status === k).length;
          return (
            <React.Fragment key={k}>
              {i > 0 ? <View style={styles.summaryDivider} /> : null}
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: AttStatus[k].color }]}>
                  {count}
                </Text>
                <Text style={styles.summaryLabel}>{AttStatus[k].label}</Text>
              </View>
            </React.Fragment>
          );
        })}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.primary }]}>{rate}%</Text>
          <Text style={styles.summaryLabel}>Present rate</Text>
        </View>
      </Card>

      <SectionTitle title={`Records (${filtered.length})`} />
      {filtered.length === 0 ? (
        <EmptyState icon="filter-off-outline" title="No matching records" message="Try a different class or status filter." />
      ) : (
        <Card style={styles.list}>
          {filtered.map((a, i) => (
            <View key={a.id}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <ListItem
                icon={AttStatus[a.status].icon}
                title={a.studentName}
                subtitle={`${a.className}${a.time ? ` • In at ${a.time}` : ''}`}
                tint={AttStatus[a.status].color}
                right={<Badge label={AttStatus[a.status].label} tone={a.status === 'PRESENT' ? 'success' : a.status === 'ABSENT' ? 'danger' : 'warning'} />}
              />
            </View>
          ))}
        </Card>
      )}
    </Screen>
  );
}

function FilterChip({
  label,
  active,
  onPress,
  dotColor,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  dotColor?: string;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      {dotColor ? <View style={[styles.chipDot, { backgroundColor: dotColor }]} /> : null}
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  summaryCard: {
    flexDirection: 'row',
    paddingVertical: Spacing.four,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: FontFamily.display,
    fontWeight: '800',
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
  },
  list: {
    paddingHorizontal: Spacing.four,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
