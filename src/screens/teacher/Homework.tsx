import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { HOMEWORK } from '@/constants/mock';

export default function TeacherHomeworkScreen() {
  return (
    <Screen scroll>
      <Header title="Homework & notes" subtitle="Shared with parents" />

      {HOMEWORK.map((h) => (
        <Card key={h.id} style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.emojiWrap, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.emoji}>{h.emoji}</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{h.title}</Text>
              <Text style={styles.meta}>
                {h.subject} • {h.className}
              </Text>
            </View>
          </View>
          <Text style={styles.body}>{h.description}</Text>
          <View style={styles.footer}>
            <Badge label={`Due ${h.dueDate}`} tone={h.dueDate.includes('10') ? 'warning' : 'neutral'} />
            <View style={styles.attachments}>
              {h.attachments > 0 ? (
                <>
                  <MaterialCommunityIcons name="paperclip" size={13} color={Colors.textMuted} />
                  <Text style={styles.attachmentsText}>
                    {h.attachments} attachment{h.attachments > 1 ? 's' : ''}
                  </Text>
                </>
              ) : (
                <Text style={styles.attachmentsText}>No attachments</Text>
              )}
            </View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  emojiWrap: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
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
  meta: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  body: {
    fontSize: 13.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginTop: Spacing.three,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  attachments: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attachmentsText: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
  },
});
