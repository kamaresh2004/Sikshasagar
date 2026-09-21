import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { LeaveCard } from '@/components/shared/LeaveCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { FadeInView } from '@/components/ui/Reveal';
import { Screen } from '@/components/ui/Screen';
import { useRefreshing } from '@/hooks/useRefreshing';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { ParentNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';
import { useLeaveStore } from '@/store/leave';

export default function ParentLeaveScreen() {
  const navigation = useNavigation<NavigationProp<ParentNavParamList>>();
  const user = useAuthStore((s) => s.user);
  const requests = useLeaveStore((s) => s.requests);
  const { refreshing, onRefresh } = useRefreshing();
  const childIds = user?.linkedStudentIds ?? ['s-1', 's-2'];
  const mine = requests.filter((r) => childIds.includes(r.studentId));

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header
        title="Leave applications"
        subtitle="Request & track leave for your child"
        right={
          <Button title="New" variant="soft" icon="plus" onPress={() => navigation.navigate('RequestLeave')} style={styles.newBtn} fullWidth={false} />
        }
      />

      {mine.length === 0 ? (
        <EmptyState
          icon="calendar-remove-outline"
          title="No leave requests yet"
          message="Request leave for your child and track approval here."
        />
      ) : (
        <>
          {mine.map((r, i) => (
            <FadeInView key={r.id} delay={i * 40}>
              <LeaveCard request={r} />
            </FadeInView>
          ))}
        </>
      )}

      <Text style={styles.hint}>Leave marked as pending counts as an authorised absence until reviewed.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  newBtn: {
    height: 40,
    paddingHorizontal: 14,
  },
  hint: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    marginTop: Spacing.four,
  },
});