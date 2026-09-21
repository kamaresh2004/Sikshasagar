import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { EVENTS } from '@/constants/mock';
import { EventItem } from '@/constants/types';

const TYPE_TONE: Record<EventItem['type'], { tone: 'danger' | 'info' | 'warning'; label: string }> = {
  event: { tone: 'info', label: 'Event' },
  celebration: { tone: 'warning', label: 'Celebration' },
  holiday: { tone: 'danger', label: 'Holiday' },
};

export default function ParentCalendarScreen() {
  return (
    <Screen scroll>
      <Header title="School calendar" subtitle="Events, celebrations & holidays" />

      <View style={styles.legendRow}>
        {(['event', 'celebration', 'holiday'] as const).map((t) => (
          <Badge key={t} label={TYPE_TONE[t].label} tone={TYPE_TONE[t].tone} />
        ))}
      </View>

      {EVENTS.map((e, i) => {
        const t = TYPE_TONE[e.type];
        return (
          <Card key={e.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.dateBox}>
                <Text style={styles.dateDay}>{e.date.split(' ')[1]}</Text>
                <Text style={styles.dateMonth}>{e.date.split(' ')[0].toUpperCase()}</Text>
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.title}>{e.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {e.description}
                </Text>
              </View>
              <Badge label={t.label} tone={t.tone} />
            </View>
            {i === 0 ? (
              <View style={styles.todayWrap}>
                <Text style={styles.todayText}>Coming up next</Text>
              </View>
            ) : null}
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  card: {
    marginBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  dateBox: {
    width: 52,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    fontSize: 20,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.primaryDark,
    lineHeight: 22,
  },
  dateMonth: {
    fontSize: 10,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  desc: {
    fontSize: 12.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  todayWrap: {
    marginTop: Spacing.three,
  },
  todayText: {
    fontSize: 11,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
