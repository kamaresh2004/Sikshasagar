import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { Skeleton, SkeletonRow, SkeletonStat } from '@/components/ui/Skeleton';
import { StatCard } from '@/components/ui/StatCard';
import { useDelayedReady } from '@/hooks/useDelayedReady';
import { useRefreshing } from '@/hooks/useRefreshing';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { FEES } from '@/constants/mock';

export default function FeesScreen() {
  const totalCollected = FEES.reduce((s, f) => s + f.paid, 0);
  const totalDue = FEES.reduce((s, f) => s + (f.amount - f.paid), 0);
  const totalBill = totalCollected + totalDue;
  const collectedPct = totalBill > 0 ? totalCollected / totalBill : 0;
  const paidCount = FEES.filter((f) => f.status === 'paid').length;
  const ready = useDelayedReady(600);
  const { refreshing, onRefresh } = useRefreshing();

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header title="Fee overview" subtitle="Collections for 2026-27" />

      {!ready ? (
        <View>
          <View style={styles.statsRow}>
            <View style={styles.statHalf}><SkeletonStat /></View>
            <View style={styles.statHalf}><SkeletonStat /></View>
          </View>
          <Skeleton style={{ height: 92, width: '100%', marginTop: Spacing.four }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </View>
      ) : (
        <>
          <View style={styles.statsRow}>
            <View style={styles.statHalf}>
              <StatCard label="Collected" value={`₹${(totalCollected / 1000).toFixed(0)}k`} icon="cash-multiple" accent="success" delay={40} />
            </View>
            <View style={styles.statHalf}>
              <StatCard label="Outstanding" value={`₹${(totalDue / 1000).toFixed(0)}k`} icon="clock-alert-outline" accent="coral" delay={100} />
            </View>
          </View>

          <Card style={styles.progressCard}>
            <View style={styles.progressHead}>
              <Text style={styles.progressTitle}>Collection progress</Text>
              <Text style={styles.progressPct}>{Math.round(collectedPct * 100)}%</Text>
            </View>
            <ProgressBar progress={collectedPct} height={10} />
            <Text style={styles.progressHint}>
              ₹{totalCollected.toLocaleString('en-IN')} of ₹{totalBill.toLocaleString('en-IN')} collected
            </Text>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{FEES.length}</Text>
              <Text style={styles.summaryLabel}>Records</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{paidCount}</Text>
              <Text style={styles.summaryLabel}>Paid</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{FEES.length - paidCount}</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>
          </Card>

          <Card style={styles.list}>
            {FEES.map((f, i) => (
              <View key={f.id}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <ListItem
                  icon={f.status === 'paid' ? 'check-decagram' : f.status === 'partial' ? 'clock-outline' : 'alert-circle-outline'}
                  title={f.studentName}
                  subtitle={`${f.className} • Due ${f.dueDate}`}
                  tint={f.status === 'paid' ? Colors.success : f.status === 'partial' ? Colors.warning : Colors.danger}
                  right={
                    <View style={styles.feeRight}>
                      <Text style={styles.feeAmount}>
                        ₹{f.paid.toLocaleString('en-IN')}
                        {f.status !== 'paid' ? <Text style={styles.feeDue}> / ₹{f.amount.toLocaleString('en-IN')}</Text> : null}
                      </Text>
                      <Badge label={f.status.toUpperCase()} tone={f.status === 'paid' ? 'success' : f.status === 'partial' ? 'warning' : 'danger'} />
                    </View>
                  }
                />
              </View>
            ))}
          </Card>

          <View style={styles.note}>
            <MaterialCommunityIcons name="information-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.noteText}>Fee payments can be recorded when the backend is connected.</Text>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statHalf: {
    flex: 1,
  },
  progressCard: {
    marginTop: Spacing.four,
    paddingVertical: Spacing.four,
  },
  progressHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },
  progressTitle: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  progressPct: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.success,
  },
  progressHint: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: Spacing.two,
  },
  summaryCard: {
    flexDirection: 'row',
    paddingVertical: Spacing.four,
    marginTop: Spacing.four,
    marginBottom: Spacing.four,
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
    color: Colors.text,
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
  feeRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  feeAmount: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  feeDue: {
    color: Colors.textMuted,
    fontWeight: '500',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    justifyContent: 'center',
    marginTop: Spacing.four,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
