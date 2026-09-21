import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Field } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { PERFORMANCE, STUDENTS } from '@/constants/mock';

const CATEGORIES = ['Milestone', 'Academic', 'Social', 'Behavior'] as const;

const CATEGORY_META: Record<(typeof CATEGORIES)[number], { icon: 'party-popper' | 'school-outline' | 'account-group-outline' | 'bell-outline'; tint: string; soft: string }> = {
  Milestone: { icon: 'party-popper', tint: '#D97706', soft: '#FDF1E3' },
  Academic: { icon: 'school-outline', tint: '#2563EB', soft: '#E7EEFC' },
  Social: { icon: 'account-group-outline', tint: '#7C6BF0', soft: '#EFEDFD' },
  Behavior: { icon: 'bell-outline', tint: '#F973A5', soft: '#FEE8F0' },
};

export default function TeacherPerformanceScreen() {
  const [studentId, setStudentId] = useState('s-1');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Milestone');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(PERFORMANCE.filter((p) => p.studentId === 's-1'));

  const student = STUDENTS.find((s) => s.id === studentId);

  const submit = () => {
    if (!note.trim()) return;
    setNotes((prev) => [
      {
        id: `p-new-${Date.now()}`,
        studentId,
        studentName: student?.name ?? '',
        teacherId: 'u-teach-1',
        category,
        note,
        date: '07 Aug 2026',
        rating: 4,
        emoji: category === 'Milestone' ? '🎉' : category === 'Academic' ? '⭐' : category === 'Social' ? '🤝' : '🔔',
      },
      ...prev,
    ]);
    setNote('');
  };

  return (
    <Screen scroll>
      <Header title="Performance notes" subtitle="Track milestones & progress" />

      <Text style={styles.label}>Student</Text>
      <View style={styles.chipRow}>
        {STUDENTS.filter((s) => s.className === 'Nursery A').map((s) => (
          <Chip
            key={s.id}
            label={s.name.split(' ')[0]}
            active={studentId === s.id}
            onPress={() => {
              setStudentId(s.id);
              setNotes(PERFORMANCE.filter((p) => p.studentId === s.id));
            }}
          />
        ))}
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.chipRow}>
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
        ))}
      </View>

      <Field
        label="Add a note"
        icon="pencil-outline"
        value={note}
        onChangeText={setNote}
        placeholder={`e.g. ${student?.name.split(' ')[0]} recognised all letters today…`}
        multiline
        style={styles.textArea}
      />
      <Button title="Add note" icon="plus-circle-outline" onPress={submit} variant="soft" />

      <Card style={styles.list}>
        {notes.length === 0 ? (
          <EmptyState icon="pencil-outline" title="No notes yet" message="Add a note to record a milestone or progress for this student." />
        ) : (
          notes.map((n, i) => {
            const meta = CATEGORY_META[n.category] ?? CATEGORY_META.Academic;
            return (
              <View key={n.id}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.noteRow}>
                  <View style={[styles.noteIcon, { backgroundColor: meta.soft }]}>
                    <MaterialCommunityIcons name={meta.icon} size={20} color={meta.tint} />
                  </View>
                  <View style={styles.noteText}>
                    <View style={styles.noteTop}>
                      <Text style={styles.noteTitle}>{n.category}</Text>
                      <Badge label={n.date} tone="neutral" />
                    </View>
                    <Text style={styles.noteBody}>{n.note}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </Card>
    </Screen>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: Spacing.three,
  },
  list: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  noteRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  noteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteText: {
    flex: 1,
  },
  noteTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTitle: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
  },
  noteBody: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: Spacing.one,
  },
});
