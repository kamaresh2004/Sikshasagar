import { useRoute, type RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { AttStatus, Colors, FontFamily, Motion, Radius, Spacing } from '@/constants/theme';
import { ATTENDANCE_TODAY, studentById } from '@/constants/mock';
import { ParentNavParamList } from '@/navigation/types';

export default function ParentAttendanceHistoryScreen() {
  const route = useRoute<RouteProp<ParentNavParamList, 'AttendanceHistory'>>();
  const student = studentById(route.params.studentId);
  const records = ATTENDANCE_TODAY.filter((a) => a.studentId === route.params.studentId);
  const present = records.filter((r) => r.status === 'PRESENT').length;
  const total = records.length || 1;
  const target = Math.round((present / total) * 100);

  const [countUp] = useState(() => new Animated.Value(0));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const listener = countUp.addListener(({ value }) => setDisplay(Math.round(value)));
    Animated.timing(countUp, {
      toValue: target,
      duration: Motion.slow + 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => countUp.removeListener(listener);
  }, [countUp, target]);

  return (
    <Screen scroll>
      <Header title="Attendance" subtitle={student?.name ?? 'Attendance history'} />

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryValue}>{display}%</Text>
        <Text style={styles.summaryLabel}>Attendance this term</Text>
        <View style={styles.barWrap}>
          <ProgressBar progress={present / total} height={8} />
        </View>
      </Card>

      {records.length === 0 ? (
        <EmptyState icon="calendar-blank-outline" title="No records yet" message="Daily attendance for your child will appear here." />
      ) : (
        <View style={styles.list}>
          {records.map((r, i) => (
            <View key={r.id}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <ListItem
                icon={AttStatus[r.status].icon}
                title={r.date}
                subtitle={r.time ? `Reported in at ${r.time}` : 'No check-in time'}
                tint={AttStatus[r.status].color}
                right={<Badge label={AttStatus[r.status].label} tone={r.status === 'PRESENT' ? 'success' : r.status === 'ABSENT' ? 'danger' : 'warning'} />}
              />
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: Spacing.five,
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  summaryValue: {
    fontSize: 32,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.success,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  barWrap: {
    width: '100%',
    marginTop: Spacing.four,
  },
  list: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
