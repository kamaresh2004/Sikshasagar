import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { ENQUIRIES } from '@/constants/mock';
import { Enquiry } from '@/constants/types';

const STATUS: Record<Enquiry['status'], { label: string; tone: 'danger' | 'warning' | 'success' }> = {
  new: { label: 'New', tone: 'danger' },
  followup: { label: 'Follow-up', tone: 'warning' },
  closed: { label: 'Closed', tone: 'success' },
};

export default function EnquiriesScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Screen scroll>
      <Header
        title="Enquiries"
        subtitle={`${ENQUIRIES.length} total • ${ENQUIRIES.filter((e) => e.status === 'new').length} new`}
        right={
          <View style={styles.aiBadge}>
            <MaterialCommunityIcons name="robot-outline" size={16} color={Colors.primary} />
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        }
      />

      {ENQUIRIES.map((e) => {
        const st = STATUS[e.status];
        const open = expanded === e.id;
        return (
          <Card
            key={e.id}
            onPress={() => setExpanded(open ? null : e.id)}
            style={[styles.card, open && styles.cardOpen]}
          >
            <View style={styles.row}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account-question-outline" size={20} color={Colors.accent} />
              </View>
              <View style={styles.textWrap}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{e.name}</Text>
                  <Badge label={st.label} tone={st.tone} />
                </View>
                <Text style={styles.meta}>
                  {e.program} • {e.contact} • {e.date}
                </Text>
                <Text style={styles.message} numberOfLines={open ? undefined : 2}>
                  {e.message}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-down" size={20} color={Colors.textMuted} style={[styles.chev, open && styles.chevOpen]} />
            </View>

            {open ? (
              <View style={styles.aiBox}>
                <View style={styles.aiHeader}>
                  <MaterialCommunityIcons name="robot-outline" size={18} color={Colors.primary} />
                  <Text style={styles.aiTitle}>AI suggested reply</Text>
                </View>
                <Text style={styles.aiBody}>{e.aiDraftReply}</Text>
                <View style={styles.actions}>
                  <Pressable style={styles.actionBtn}>
                    <Text style={styles.actionText}>Copy</Text>
                  </Pressable>
                  <Pressable style={[styles.actionBtn, styles.actionPrimary]}>
                    <Text style={styles.actionTextPrimary}>Mark replied</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primarySoft,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  card: {
    padding: Spacing.four,
    marginBottom: Spacing.three,
  },
  cardOpen: {
    borderColor: Colors.primary,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  name: {
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
  message: {
    fontSize: 13.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: Spacing.two,
    lineHeight: 19,
  },
  chev: {
    alignSelf: 'flex-start',
  },
  chevOpen: {
    transform: [{ rotate: '180deg' }],
  },
  aiBox: {
    marginTop: Spacing.three,
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.md,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#C7E5F8',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  aiTitle: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  aiBody: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.text,
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionText: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionPrimary: {
    backgroundColor: Colors.primary,
  },
  actionTextPrimary: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.white,
  },
});
