import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { ManagementNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';
import { roleTheme } from '@/constants/theme';

export default function ManagementMoreScreen() {
  const navigation = useNavigation<NavigationProp<ManagementNavParamList>>();
  const accent = roleTheme(useAuthStore((s) => s.user?.role));

  return (
    <Screen scroll>
      <Header title="More" subtitle="Management tools" back={false} />

      <Card style={styles.card}>
        <Text style={styles.group}>Operations</Text>
        <ListItem icon="email-open-outline" title="Enquiries" subtitle="Admissions & AI auto-replies" tint={Colors.accent} onPress={() => navigation.navigate('Enquiries')} />
        <View style={styles.divider} />
        <ListItem icon="bullhorn-outline" title="Announcements" subtitle="Create school-wide notices" tint={Colors.primary} onPress={() => navigation.navigate('Announcements')} />
        <View style={styles.divider} />
        <ListItem icon="image-check-outline" title="Gallery approvals" subtitle={`${'2'} photos pending review`} tint={Colors.coral} onPress={() => navigation.navigate('Approvals')} />
        <View style={styles.divider} />
        <ListItem icon="chart-bar" title="Attendance reports" subtitle="By class & date range" tint="#7C3AED" onPress={() => navigation.navigate('AttendanceReports')} />
        <View style={styles.divider} />
        <ListItem icon="calendar-check-outline" title="Leave requests" subtitle="All classes & statuses" tint={Colors.warning} onPress={() => navigation.navigate('ManagementLeaveRequests')} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.group}>Finance</Text>
        <ListItem icon="currency-inr" title="Fee overview" subtitle="Collections & dues" tint={Colors.success} onPress={() => navigation.navigate('Fees')} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.group}>Account</Text>
        <ListItem icon="bell-outline" title="Notifications" subtitle="All school alerts" tint={Colors.primary} onPress={() => navigation.navigate('Notifications')} />
        <View style={styles.divider} />
        <ListItem icon="account-circle-outline" title="Profile & settings" tint={Colors.primary} onPress={() => navigation.navigate('Profile')} />
      </Card>

      <View style={[styles.aiCard, { backgroundColor: accent.soft }]}>
        <View style={[styles.aiIconWrap, { backgroundColor: Colors.surface }]}>
          <MaterialCommunityIcons name="robot-outline" size={22} color={accent.color} />
        </View>
        <Text style={[styles.aiText, { color: accent.dark }]}>AI enquiry auto-responses are being drafted live on the Enquiries screen.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.four,
    paddingHorizontal: Spacing.five,
  },
  group: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 16,
    padding: Spacing.four,
  },
  aiIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FontFamily.body,
    lineHeight: 18,
  },
});
