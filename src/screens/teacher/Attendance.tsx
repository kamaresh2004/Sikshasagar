import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Skeleton, SkeletonRow } from '@/components/ui/Skeleton';
import { toast } from '@/components/ui/Toast';
import { CelebrationBurst } from '@/components/ui/motion/CelebrationBurst';
import { notify } from '@/services/notifications';
import { useDelayedReady } from '@/hooks/useDelayedReady';
import { useRefreshing } from '@/hooks/useRefreshing';
import { AttStatus, Colors, FontFamily, Motion, Radius, Spacing } from '@/constants/theme';
import { ATTENDANCE_TODAY } from '@/constants/mock';
import { AttStatusKey } from '@/constants/theme';

export default function TeacherAttendanceScreen() {
  const [records, setRecords] = useState(
    ATTENDANCE_TODAY.map((a) => ({ id: a.id, name: a.studentName, status: a.status as AttStatusKey })),
  );
  const [saved, setSaved] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const celebrateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ready = useDelayedReady(600);
  const { refreshing, onRefresh } = useRefreshing();

  useEffect(() => () => {
    if (celebrateTimer.current) clearTimeout(celebrateTimer.current);
  }, []);

  const setStatus = (id: string, status: AttStatusKey) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSaved(false);
  };

  const present = records.filter((r) => r.status === 'PRESENT').length;
  const absent = records.filter((r) => r.status === 'ABSENT').length;
  const leave = records.filter((r) => r.status === 'LEAVE').length;
  const allPresent = records.length > 0 && present === records.length;

  const save = () => {
    setSaved(true);
    toast('Attendance saved — parents notified', 'success');
    notify('Attendance saved', 'Today\'s attendance was recorded and parents have been notified.');
    if (allPresent) {
      setCelebrate(true);
      if (celebrateTimer.current) clearTimeout(celebrateTimer.current);
      celebrateTimer.current = setTimeout(() => setCelebrate(false), 1600);
    }
  };

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header
        title="Mark attendance"
        subtitle="Nursery A • Fri, 07 Aug 2026"
        right={<MaterialCommunityIcons name="clipboard-check-outline" size={22} color={Colors.primary} />}
      />

      {!ready ? (
        <>
          <View style={styles.summaryRow}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} style={{ flex: 1, height: 88 }} radius={Radius.lg} />
            ))}
          </View>
          <View style={styles.list}>
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </View>
          <Skeleton style={{ height: 52, width: '100%', marginTop: Spacing.six }} radius={Radius.md} />
        </>
      ) : (
        <>
          <View style={styles.summaryRow}>
            <Summary value={present} label="Present" color={Colors.success} />
            <Summary value={absent} label="Absent" color={Colors.danger} />
            <Summary value={leave} label="Leave" color={Colors.warning} />
          </View>

          <View style={styles.list}>
            {records.map((r, i) => (
              <View key={r.id}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.row}>
                  <Text style={styles.avatar}>{r.name.charAt(0)}</Text>
                  <Text style={styles.name}>{r.name}</Text>
                  <View style={styles.statusGroup}>
                    {(Object.keys(AttStatus) as AttStatusKey[]).map((k) => (
                      <StatusBtn
                        key={k}
                        icon={AttStatus[k].icon}
                        color={AttStatus[k].color}
                        active={r.status === k}
                        onPress={() => setStatus(r.id, k)}
                      />
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <Button
            title={saved ? 'Saved ✓' : 'Save attendance'}
            onPress={save}
            icon={saved ? 'check' : 'content-save-outline'}
            style={styles.save}
            variant={saved ? 'soft' : 'primary'}
          />
          {celebrate ? <CelebrationBurst /> : null}
          {saved ? <Text style={styles.savedHint}>Parents of absent children will be notified automatically.</Text> : null}
        </>
      )}
    </Screen>
  );
}

function StatusBtn({
  icon,
  color,
  active,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  const [press] = useState(() => new Animated.Value(1));
  const [activePop] = useState(() => new Animated.Value(1));
  const prevActive = useRef(active);

  useEffect(() => {
    if (active && !prevActive.current) {
      Animated.spring(activePop, {
        toValue: 1.12,
        ...Motion.springBounce,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.spring(activePop, {
          toValue: 1,
          ...Motion.springBounce,
          useNativeDriver: true,
        }).start();
      }, 180);
    }
    prevActive.current = active;
  }, [active, activePop]);

  const style = {
    transform: [{ scale: Animated.multiply(press, activePop) }],
  };

  const onPressIn = () => {
    press.setValue(0.82);
  };

  const onPressOut = () => {
    Animated.spring(press, {
      toValue: 1,
      ...Motion.springBounce,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={style}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.statusBtn, active && { backgroundColor: color, borderColor: color }]}
      >
        <MaterialCommunityIcons name={icon} size={18} color={active ? Colors.white : color} />
      </Pressable>
    </Animated.View>
  );
}

function Summary({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <Card style={styles.summaryCard}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  summaryCard: {
    flex: 1,
    padding: Spacing.four,
    alignItems: 'center',
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
  list: {
    marginTop: Spacing.four,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primarySoft,
    textAlign: 'center',
    lineHeight: 36,
    fontSize: 16,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.primaryDark,
    overflow: 'hidden',
  },
  name: {
    flex: 1,
    fontSize: 14.5,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.text,
  },
  statusGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  statusBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  save: {
    marginTop: Spacing.six,
  },
  savedHint: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.success,
    marginTop: Spacing.three,
  },
});
