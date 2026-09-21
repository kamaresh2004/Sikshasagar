import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { FadeInView } from '@/components/ui/Reveal';
import { Screen } from '@/components/ui/Screen';
import { useRefreshing } from '@/hooks/useRefreshing';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { GALLERY } from '@/constants/mock';

const CLASS_TINTS: Record<string, [string, string]> = {
  'Playgroup A': ['#12A963', '#0B7747'],
  'Nursery A': ['#1189A8', '#0A5268'],
  'LKG A': ['#F87C5E', '#D95435'],
  'UKG A': ['#8B5CF6', '#6D28D9'],
};

export default function ParentGalleryScreen() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const { refreshing, onRefresh } = useRefreshing();
  const approved = GALLERY.filter((g) => g.status === 'approved');
  const filtered = approved.filter((g) => selectedClass === 'all' || g.className === selectedClass);
  const classes = [...new Set(approved.map((g) => g.className))];

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header title="Gallery" subtitle="Approved moments from your child's class" />

      <View style={styles.chipRow}>
        <Chip label="All" active={selectedClass === 'all'} onPress={() => setSelectedClass('all')} />
        {classes.map((c) => (
          <Chip key={c} label={c} active={selectedClass === c} onPress={() => setSelectedClass(c)} />
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState icon="image-multiple-outline" title="No photos yet" message="New class photos appear here after approval." />
      ) : (
        <View style={styles.grid}>
          {filtered.map((g, i) => {
            const tint = CLASS_TINTS[g.className] ?? ['#1189A8', '#0A5268'];
            return (
              <FadeInView key={g.id} delay={i * 40} style={styles.gridItem}>
                <LinearGradient
                  colors={[tint[0], tint[1]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.card}
                >
                  <View style={styles.cardTop}>
                    <Text style={styles.cardEmoji}>{g.emoji}</Text>
                    <Badge label={g.className} tone="primary" />
                  </View>
                  <View style={styles.cardBottom}>
                    <Text style={styles.caption} numberOfLines={2}>
                      {g.caption}
                    </Text>
                    <Text style={styles.date}>{g.date}</Text>
                  </View>
                  {i % 3 === 0 ? (
                    <View style={styles.heart}>
                      <Text style={styles.heartEmoji}>❤️</Text>
                    </View>
                  ) : null}
                </LinearGradient>
              </FadeInView>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  gridItem: {
    width: '47.5%',
    flexGrow: 1,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    minHeight: 190,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 42,
  },
  cardBottom: {},
  caption: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.white,
  },
  date: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  heart: {
    position: 'absolute',
    bottom: Spacing.four,
    right: Spacing.four,
  },
  heartEmoji: {
    fontSize: 18,
  },
});
