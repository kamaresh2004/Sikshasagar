import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { LeaveCard } from '@/components/shared/LeaveCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { FadeInView } from '@/components/ui/Reveal';
import { Screen } from '@/components/ui/Screen';
import { toast } from '@/components/ui/Toast';
import { useRefreshing } from '@/hooks/useRefreshing';
import { notify } from '@/services/notifications';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth';
import { useLeaveStore } from '@/store/leave';

export default function TeacherLeaveRequestsScreen() {
  const user = useAuthStore((s) => s.user);
  const requests = useLeaveStore((s) => s.requests);
  const decide = useLeaveStore((s) => s.decide);
  const { refreshing, onRefresh } = useRefreshing();

  const myClass = user?.className ?? 'Nursery A';
  const mine = requests.filter((r) => r.className === myClass);
  const pending = mine.filter((r) => r.status === 'pending');

  const decideLeave = (id: string, name: string, status: 'approved' | 'declined') => {
    decide(id, status, user?.name ?? 'Class teacher');
    if (status === 'approved') {
      toast(`Leave approved for ${name}`, 'success');
      notify('Leave approved', `${name}'s leave request was approved.`);
    } else {
      toast(`Leave declined for ${name}`, 'info');
      notify('Leave declined', `${name}'s leave request was declined.`);
    }
  };

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header
        title="Leave requests"
        subtitle={myClass}
        right={<Text style={styles.badge}>{pending.length} pending</Text>}
      />

      {mine.length === 0 ? (
        <EmptyState icon="calendar-check-outline" title="No leave requests" message="When parents request leave for your class, it will appear here." />
      ) : (
        <>
          {mine.map((r, i) => (
            <FadeInView key={r.id} delay={i * 40}>
              <LeaveCard
                request={r}
                onApprove={() => decideLeave(r.id, r.studentName, 'approved')}
                onDecline={() => decideLeave(r.id, r.studentName, 'declined')}
              />
            </FadeInView>
          ))}
        </>
      )}

      <Text style={styles.hint}>Approving leave notifies the parent and records it against attendance.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.warning,
  },
  hint: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    marginTop: Spacing.four,
  },
});