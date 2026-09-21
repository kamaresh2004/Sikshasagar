import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { toast } from '@/components/ui/Toast';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { studentById } from '@/constants/mock';
import { Student } from '@/constants/types';
import { useAuthStore } from '@/store/auth';
import { useLeaveStore } from '@/store/leave';

function parseDate(s: string) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

const QUICK_DATES = ['Tomorrow', 'This weekend'];

function dateSuggestion(label: string): string {
  const now = new Date();
  if (label === 'Tomorrow') {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  const d = new Date(now);
  const day = d.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSat);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ParentRequestLeaveScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((s) => s.user);
  const requestLeave = useLeaveStore((s) => s.requestLeave);
  const children = (user?.linkedStudentIds ?? ['s-1', 's-2'])
    .map((id) => studentById(id))
    .filter((s): s is Student => Boolean(s));

  const [childId, setChildId] = useState(children[0]?.id ?? '');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const child = children.find((c) => c.id === childId);
    if (!child) {
      setError('Please choose a child.');
      return;
    }
    const fromD = parseDate(from.trim());
    const toD = parseDate(to.trim());
    if (!fromD || !toD) {
      setError('Use the format DD MMM YYYY — for example, 12 Aug 2026.');
      return;
    }
    if (toD < fromD) {
      setError('The "To" date must be on or after the "From" date.');
      return;
    }
    if (!reason.trim()) {
      setError('Please add a short reason for the leave.');
      return;
    }
    requestLeave({
      studentId: child.id,
      studentName: child.name,
      className: child.className,
      parentName: user?.name ?? 'Parent',
      fromDate: from.trim(),
      toDate: to.trim(),
      reason: reason.trim(),
    });
    toast('Leave request sent for review', 'success');
    navigation.goBack();
  };

  return (
    <Screen scroll keyboard>
      <Header title="Request leave" subtitle="Your class teacher will review it" />

      <Text style={styles.label}>Child</Text>
      <View style={styles.chipRow}>
        {children.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setChildId(c.id)}
            style={[styles.chip, childId === c.id && styles.chipActive]}
          >
            <Text style={[styles.chipText, childId === c.id && styles.chipTextActive]}>{c.name.split(' ')[0]}</Text>
            <Text style={[styles.chipSub, childId === c.id && styles.chipTextActive]}>{c.className}</Text>
          </Pressable>
        ))}
      </View>

      <Field
        label="From date"
        icon="calendar-start"
        value={from}
        onChangeText={setFrom}
        placeholder="e.g. 12 Aug 2026"
        autoCapitalize="words"
      />
      <Field
        label="To date"
        icon="calendar-end"
        value={to}
        onChangeText={setTo}
        placeholder="e.g. 13 Aug 2026"
        autoCapitalize="words"
      />

      <View style={styles.quickRow}>
        {QUICK_DATES.map((q) => (
          <Pressable key={q} style={styles.quickChip} onPress={() => setFrom(dateSuggestion(q))}>
            <Text style={styles.quickText}>{q} → {dateSuggestion(q)}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Reason</Text>
      <View style={styles.reasonBox}>
        <TextInput
          style={styles.reasonInput}
          value={reason}
          onChangeText={setReason}
          placeholder="e.g. Family function out of town"
          placeholderTextColor={Colors.textMuted}
          multiline
          maxLength={200}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Submit request" onPress={submit} icon="send" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  chip: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 120,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  chipSub: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  chipTextActive: {
    color: Colors.white,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  quickChip: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickText: {
    fontSize: 12,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  reasonBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    marginBottom: Spacing.four,
  },
  reasonInput: {
    minHeight: 96,
    fontSize: 15,
    fontFamily: FontFamily.body,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.danger,
    marginBottom: Spacing.three,
  },
});