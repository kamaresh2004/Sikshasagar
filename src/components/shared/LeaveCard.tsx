import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { LeaveRequest } from '@/constants/types';

const STATUS_META: Record<LeaveRequest['status'], { label: string; tone: 'warning' | 'success' | 'danger'; icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }> = {
  pending: { label: 'Pending', tone: 'warning', icon: 'clock-outline' },
  approved: { label: 'Approved', tone: 'success', icon: 'check-circle' },
  declined: { label: 'Declined', tone: 'danger', icon: 'close-circle' },
};

interface LeaveCardProps {
  request: LeaveRequest;
  onApprove?: () => void;
  onDecline?: () => void;
}

export function LeaveCard({ request, onApprove, onDecline }: LeaveCardProps) {
  const meta = STATUS_META[request.status];
  const decided =
    request.decidedBy && request.decidedAt ? `Reviewed by ${request.decidedBy} on ${request.decidedAt}` : null;
  const showActions = onApprove && onDecline && request.status === 'pending';

  return (
    <Card style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.childRow}>
          <Text style={styles.studentName}>{request.studentName}</Text>
          <Text style={styles.className}>{request.className}</Text>
        </View>
        <Badge label={meta.label} tone={meta.tone} icon={meta.icon} />
      </View>

      <View style={styles.datesRow}>
        <View style={styles.dateBlock}>
          <Text style={styles.dateLabel}>From</Text>
          <Text style={styles.dateValue}>{request.fromDate}</Text>
        </View>
        <View style={styles.dateArrow}>
          <Text style={styles.dateArrowText}>→</Text>
        </View>
        <View style={styles.dateBlock}>
          <Text style={styles.dateLabel}>To</Text>
          <Text style={styles.dateValue}>{request.toDate}</Text>
        </View>
      </View>

      <Text style={styles.metaLabel}>Reason</Text>
      <Text style={styles.reason}>{request.reason}</Text>

      {decided ? <Text style={styles.decided}>{decided}</Text> : null}
      <Text style={styles.created}>
        {request.parentName} • requested {request.createdAt}
      </Text>

      {showActions ? (
        <View style={styles.actions}>
          <Button title="Decline" variant="danger" onPress={onDecline} fullWidth={false} style={styles.actionBtn} />
          <Button title="Approve" variant="primary" onPress={onApprove} fullWidth={false} style={styles.actionBtn} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  childRow: {
    gap: 2,
  },
  studentName: {
    fontSize: 16,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  className: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  dateBlock: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: Spacing.three,
  },
  dateLabel: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  dateValue: {
    fontSize: 15,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  dateArrow: {
    paddingHorizontal: Spacing.three,
  },
  dateArrowText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  metaLabel: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: Spacing.four,
  },
  reason: {
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: Colors.text,
    marginTop: 2,
    lineHeight: 20,
  },
  decided: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: Spacing.three,
  },
  created: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  actionBtn: {
    flex: 1,
    height: 44,
  },
});