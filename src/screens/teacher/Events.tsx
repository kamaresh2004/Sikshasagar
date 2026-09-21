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

export default function TeacherEventsScreen() {
  return (
    <Screen scroll>
      <Header title="Events & calendar" subtitle="Share upcoming days with parents" />

      {EVENTS.map((e) => {
        const t = TYPE_TONE[e.type];
        return (
          <Card key={e.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.emoji}>{e.emoji}</Text>
              <View style={styles.textWrap}>
                <Text style={styles.title}>{e.title}</Text>
                <Text style={styles.date}>{e.date}</Text>
              </View>
              <Badge label={t.label} tone={t.tone} />
            </View>
            <Text style={styles.body}>{e.description}</Text>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  emoji: {
    fontSize: 28,
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
  date: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  body: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: Spacing.three,
  },
});
