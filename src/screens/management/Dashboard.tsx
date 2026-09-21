import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AnnouncementCard } from '@/components/shared/AnnouncementCard';
import { GreetingHeader } from '@/components/shared/GreetingHeader';
import { QuickActions } from '@/components/shared/QuickActions';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Screen } from '@/components/ui/Screen';
import { Skeleton, SkeletonNotice, SkeletonRow, SkeletonTitle } from '@/components/ui/Skeleton';
import { StatCard } from '@/components/ui/StatCard';
import { CircularProgress } from '@/components/ui/motion/CircularProgress';
import { Stagger } from '@/components/ui/Reveal';
import { useDelayedReady } from '@/hooks/useDelayedReady';
import { useRefreshing } from '@/hooks/useRefreshing';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { ANNOUNCEMENTS, ATTENDANCE_TODAY, ENQUIRIES, GALLERY, STUDENTS, attendanceRate } from '@/constants/mock';
import { ManagementNavParamList } from '@/navigation/types';

export default function ManagementDashboardScreen() {
  const navigation = useNavigation<NavigationProp<ManagementNavParamList>>();
  const newEnquiries = ENQUIRIES.filter((e) => e.status === 'new').length;
  const pendingApprovals = GALLERY.filter((g) => g.status === 'pending').length;
  const attendance = attendanceRate();
  const ready = useDelayedReady(650);
  const { refreshing, onRefresh } = useRefreshing();

  return (
    <Screen scroll padded={false} noAnimate refreshing={refreshing} onRefresh={onRefresh}>
      {!ready ? (
        <View style={styles.content}>
          <Skeleton style={{ height: 84, width: '100%', marginBottom: Spacing.three }} />
          <View style={styles.bentoGrid}>
            <Skeleton height={150} radius={Radius.lg} />
            <Skeleton height={150} radius={Radius.lg} />
            <Skeleton height={150} radius={Radius.lg} />
            <Skeleton height={150} radius={Radius.lg} />
          </View>
          <SkeletonTitle />
          <SkeletonNotice />
          <SkeletonNotice />
          <SkeletonTitle />
          <SkeletonRow />
        </View>
      ) : (
        <Stagger>
          <GreetingHeader subtitle="Here's how the school is doing today" />

          <View style={styles.content}>
            <View style={styles.bentoGrid}>
              <View style={styles.bentoWide}>
                <View style={styles.bentoHeaderRow}>
                  <View style={styles.bentoIconWrap}>
                    <MaterialCommunityIcons name="clipboard-check-outline" size={18} color={Colors.success} />
                  </View>
                  <Text style={styles.bentoTitle}>Attendance today</Text>
                </View>
                <View style={styles.bentoBody}>
                  <CircularProgress value={attendance} color={Colors.success} size={92} strokeWidth={8} label={`${attendance}%`} />
                  <View style={styles.bentoBodyText}>
                    <Text style={styles.bentoValue}>{ATTENDANCE_TODAY.length}</Text>
                    <Text style={styles.bentoSub}>students recorded</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bentoCell}>
                <View style={styles.bentoIconWrap}>
                  <MaterialCommunityIcons name="email-fast-outline" size={18} color={Colors.accent} />
                </View>
                <Text style={styles.bentoCellValue}>{newEnquiries}</Text>
                <Text style={styles.bentoCellLabel}>New enquiries</Text>
                <Text style={styles.bentoCellSub}>awaiting follow-up</Text>
              </View>

              <View style={styles.bentoCell}>
                <View style={styles.bentoIconWrap}>
                  <MaterialCommunityIcons name="image-check-outline" size={18} color={Colors.coral} />
                </View>
                <Text style={styles.bentoCellValue}>{pendingApprovals}</Text>
                <Text style={styles.bentoCellLabel}>Pending approvals</Text>
                <Text style={styles.bentoCellSub}>gallery photos</Text>
              </View>

              <View style={styles.bentoStatCard}>
                <StatCard label="Total students" value={`${STUDENTS.length}`} icon="account-child-outline" accent="primary" sub="across all classes" delay={120} />
              </View>
            </View>

            <SectionTitle title="Quick actions" />
            <QuickActions
              actions={[
                { key: 'announce', label: 'Announcements', icon: 'bullhorn-outline', tint: Colors.primary, onPress: () => navigation.navigate('Announcements') },
                { key: 'approve', label: 'Approve gallery', icon: 'image-check-outline', tint: Colors.coral, onPress: () => navigation.navigate('Approvals') },
                { key: 'enq', label: 'Enquiries', icon: 'email-open-outline', tint: Colors.accent, onPress: () => navigation.navigate('Enquiries') },
                { key: 'fees', label: 'Fees', icon: 'currency-inr', tint: Colors.success, onPress: () => navigation.navigate('Fees') },
                { key: 'leave', label: 'Leave requests', icon: 'calendar-check-outline', tint: Colors.warning, onPress: () => navigation.navigate('ManagementLeaveRequests') },
                { key: 'reports', label: 'Reports', icon: 'chart-bar', tint: Colors.secondary, onPress: () => navigation.navigate('AttendanceReports') },
                { key: 'teachers', label: 'Teachers', icon: 'account-group-outline', tint: Colors.coralDark, onPress: () => navigation.navigate('Teachers') },
                { key: 'students', label: 'Students', icon: 'account-child-outline', tint: Colors.warning, onPress: () => navigation.navigate('Students') },
                { key: 'more', label: 'More', icon: 'dots-horizontal-circle-outline', tint: Colors.textSecondary, onPress: () => navigation.navigate('More') },
              ]}
            />

            <SectionTitle title="Announcements" />
            {ANNOUNCEMENTS.slice(0, 2).map((a) => (
              <AnnouncementCard key={a.id} item={a} />
            ))}

            <SectionTitle title="Latest enquiries" />
            <Card style={styles.enqCard}>
              {ENQUIRIES.slice(0, 3).map((e, i) => (
                <View key={e.id}>
                  {i > 0 ? <View style={styles.divider} /> : null}
                  <View style={styles.enqRow}>
                    <View style={styles.enqText}>
                      <Text style={styles.enqName}>
                        {e.name} <Text style={styles.enqStatus}>{e.status === 'new' ? '• New' : e.status === 'followup' ? '• Follow-up' : '• Closed'}</Text>
                      </Text>
                      <Text style={styles.enqMsg} numberOfLines={1}>
                        {e.message}
                      </Text>
                    </View>
                    <Text style={styles.enqDate}>{e.date.split(' ')[0]}</Text>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        </Stagger>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  bentoWide: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.four,
  },
  bentoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bentoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoTitle: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  bentoBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.five,
    marginTop: Spacing.four,
  },
  bentoBodyText: {
    flex: 1,
  },
  bentoValue: {
    fontSize: 30,
    fontFamily: FontFamily.displayBold,
    fontWeight: '800',
    color: Colors.text,
  },
  bentoSub: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bentoCell: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.four,
  },
  bentoCellValue: {
    fontSize: 26,
    fontFamily: FontFamily.displayBold,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.three,
  },
  bentoCellLabel: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  bentoCellSub: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  bentoStatCard: {
    width: '100%',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.three,
  },
  enqCard: {
    paddingHorizontal: Spacing.four,
  },
  enqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  enqText: {
    flex: 1,
  },
  enqName: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  enqStatus: {
    color: Colors.textMuted,
    fontWeight: '500',
  },
  enqMsg: {
    fontSize: 12.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  enqDate: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
