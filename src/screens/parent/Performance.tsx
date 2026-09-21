import { useRoute, type RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { PERFORMANCE } from '@/constants/mock';
import { ParentNavParamList } from '@/navigation/types';

const CATEGORY_META: Record<string, { icon: 'party-popper' | 'school-outline' | 'account-group-outline' | 'bell-outline'; tint: string; soft: string }> = {
  Milestone: { icon: 'party-popper', tint: '#D97706', soft: '#FDF1E3' },
  Academic: { icon: 'school-outline', tint: '#2563EB', soft: '#E7EEFC' },
  Social: { icon: 'account-group-outline', tint: '#7C6BF0', soft: '#EFEDFD' },
  Behavior: { icon: 'bell-outline', tint: '#F973A5', soft: '#FEE8F0' },
};

export default function ParentPerformanceScreen() {
  const route = useRoute<RouteProp<ParentNavParamList, 'ParentPerformance'>>();
  const notes = PERFORMANCE.filter((p) => p.studentId === route.params.studentId);

  return (
    <Screen scroll>
      <Header title="Performance updates" subtitle="Teacher notes & milestones" />

      {notes.length === 0 ? (
        <EmptyState icon="star-outline" title="No updates yet" message="Teacher notes about your child's progress will appear here." />
      ) : (
        notes.map((n, i) => {
          const meta = CATEGORY_META[n.category] ?? CATEGORY_META.Academic;
          return (
            <Card key={n.id} style={[styles.card, i === 0 && styles.cardFirst]}>
              <View style={styles.header}>
                <View style={[styles.iconWrap, { backgroundColor: meta.soft }]}>
                  <MaterialCommunityIcons name={meta.icon} size={20} color={meta.tint} />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.category}>{n.category}</Text>
                  <Text style={styles.date}>{n.date}</Text>
                </View>
                <Badge label={`${n.rating}/5`} tone={n.rating >= 4 ? 'success' : n.rating === 3 ? 'warning' : 'danger'} />
              </View>
              <Text style={styles.note}>{n.note}</Text>
            </Card>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  cardFirst: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  category: {
    fontSize: 15,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  date: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  note: {
    fontSize: 13.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginTop: Spacing.three,
  },
});
