import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GreetingHeader } from '@/components/shared/GreetingHeader';
import { QuickActions } from '@/components/shared/QuickActions';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Screen } from '@/components/ui/Screen';
import { CircularProgress } from '@/components/ui/motion/CircularProgress';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { ACTIVITIES, CLASSES, HOMEWORK, attendanceRate } from '@/constants/mock';
import { TeacherNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';

export default function TeacherHomeScreen() {
  const navigation = useNavigation<NavigationProp<TeacherNavParamList>>();
  const user = useAuthStore((s) => s.user);
  const myClass = CLASSES.find((c) => c.teacherId === user?.id) ?? CLASSES[1];
  const rate = attendanceRate();

  return (
    <Screen scroll padded={false}>
      <GreetingHeader subtitle={`${myClass.name} • ${myClass.studentCount} little learners`} />

      <View style={styles.content}>
        <View style={styles.bentoRow}>
          <Card style={styles.ringCard}>
            <CircularProgress value={rate} color={Colors.success} label={`${rate}%`} />
            <Text style={styles.ringLabel}>Attendance today</Text>
            <Text style={styles.ringSub}>Nursery A</Text>
          </Card>
          <View style={styles.bentoCol}>
            <Card style={styles.bentoMini}>
              <Text style={styles.bentoMiniValue}>2</Text>
              <Text style={styles.bentoMiniLabel}>New photos</Text>
            </Card>
            <Card style={styles.bentoMini}>
              <Text style={styles.bentoMiniValue}>{ATTENDANCE_COUNT}</Text>
              <Text style={styles.bentoMiniLabel}>Present</Text>
            </Card>
          </View>
        </View>

        <SectionTitle title="Today's quick actions" />
        <QuickActions
          columns={4}
          actions={[
            { key: 'att', label: 'Mark attendance', icon: 'clipboard-check-outline', tint: Colors.success, onPress: () => navigation.navigate('Attendance') },
            { key: 'act', label: 'Log activity', icon: 'pencil-ruler', tint: Colors.primary, onPress: () => navigation.navigate('Activities') },
            { key: 'photo', label: 'Upload photos', icon: 'camera-plus-outline', tint: Colors.coral, onPress: () => navigation.navigate('UploadPhotos') },
            { key: 'homework', label: 'Homework', icon: 'book-edit-outline', tint: Colors.accent, onPress: () => navigation.navigate('Homework') },
            { key: 'perf', label: 'Performance', icon: 'star-circle-outline', tint: '#7C3AED', onPress: () => navigation.navigate('TeacherPerformance') },
            { key: 'events', label: 'Events', icon: 'calendar-star', tint: '#DB2777', onPress: () => navigation.navigate('Events') },
            { key: 'leave', label: 'Leave requests', icon: 'calendar-check-outline', tint: Colors.warning, onPress: () => navigation.navigate('TeacherLeaveRequests') },
            { key: 'more', label: 'More', icon: 'dots-horizontal-circle-outline', tint: Colors.textSecondary, onPress: () => navigation.navigate('More') },
          ]}
        />

        <SectionTitle title="Recent activity" />
        {ACTIVITIES.filter((a) => a.classId === myClass.id).slice(0, 2).map((a) => (
          <Card key={a.id} style={styles.activityCard}>
            <Text style={styles.activityEmoji}>{a.emoji}</Text>
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>{a.title}</Text>
              <Text style={styles.activityDate}>{a.date}</Text>
            </View>
          </Card>
        ))}

        <SectionTitle title="Homework" />
        {HOMEWORK.filter((h) => h.classId === myClass.id).slice(0, 2).map((h) => (
          <Card key={h.id} style={styles.activityCard}>
            <Text style={styles.activityEmoji}>{h.emoji}</Text>
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>{h.title}</Text>
              <Text style={styles.activityDate}>{h.subject} • Due {h.dueDate}</Text>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const ATTENDANCE_COUNT = attendanceRate();

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  ringCard: {
    flex: 1.4,
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
  ringLabel: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.three,
  },
  ringSub: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bentoCol: {
    flex: 1,
    gap: Spacing.three,
  },
  bentoMini: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  bentoMiniValue: {
    fontSize: 26,
    fontFamily: FontFamily.displayBold,
    fontWeight: '800',
    color: Colors.primary,
  },
  bentoMiniLabel: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  card: {
    padding: Spacing.four,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  classEmojiWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classEmoji: {
    fontSize: 28,
  },
  classText: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  classMeta: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  classCount: {
    alignItems: 'flex-end',
  },
  classCountValue: {
    fontSize: 22,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.success,
  },
  classCountLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  activityEmoji: {
    fontSize: 22,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  activityDate: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});
