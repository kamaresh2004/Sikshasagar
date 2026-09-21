import { useRoute, type RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { studentById } from '@/constants/mock';
import { ManagementNavParamList } from '@/navigation/types';

export default function StudentDetailScreen() {
  const route = useRoute<RouteProp<ManagementNavParamList, 'StudentDetail'>>();
  const student = studentById(route.params.studentId);

  if (!student) return null;

  return (
    <Screen scroll>
      <Header title="Student profile" subtitle={student.className} />

      <LinearGradient
        colors={['#E8F6F8', Colors.background]}
        style={styles.hero}
      >
        <Avatar name={student.name} emoji={student.emoji} size={88} />
        <Text style={styles.name}>{student.name}</Text>
        <View style={styles.badges}>
          <Badge label={student.className} tone="primary" />
          <Badge label={`Age ${student.age}`} tone="info" />
          <Badge label={student.bloodGroup} tone="danger" />
        </View>
      </LinearGradient>

      <SectionTitle title="Basic details" />
      <Card style={styles.card}>
        <ListItem icon="calendar" title="Date of birth" subtitle={student.dob} tint={Colors.primary} />
        <View style={styles.divider} />
        <ListItem icon="school" title="Admission" subtitle={student.admissionDate} tint={Colors.primary} />
        <View style={styles.divider} />
        <ListItem icon="map-marker" title="Address" subtitle={student.address} tint={Colors.primary} />
      </Card>

      <SectionTitle title="Guardian" />
      <Card style={styles.card}>
        <ListItem icon="account-heart" title={student.guardian} subtitle={student.guardianPhone} tint={Colors.accent} />
      </Card>

      <SectionTitle title="Attendance summary" />
      <View style={styles.summaryRow}>
        <SummaryBlock value="86%" label="Present" color={Colors.success} />
        <SummaryBlock value="9%" label="Absent" color={Colors.danger} />
        <SummaryBlock value="5%" label="Leave" color={Colors.warning} />
      </View>
    </Screen>
  );
}

function SummaryBlock({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    borderRadius: Radius.lg,
  },
  name: {
    fontSize: 22,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.three,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  card: {
    paddingHorizontal: Spacing.five,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.four,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
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
    marginTop: 2,
  },
});
