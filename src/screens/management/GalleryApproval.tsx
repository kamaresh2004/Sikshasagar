import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { toast } from '@/components/ui/Toast';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { GALLERY } from '@/constants/mock';

export default function GalleryApprovalScreen() {
  const [pending, setPending] = useState(GALLERY.filter((g) => g.status === 'pending'));

  const decide = (id: string, action: 'approve' | 'reject') => {
    setPending((prev) => prev.filter((g) => g.id !== id));
    toast(action === 'approve' ? 'Photo approved — now visible to parents' : 'Photo rejected', action === 'approve' ? 'success' : 'info');
  };

  return (
    <Screen scroll>
      <Header
        title="Gallery approvals"
        subtitle={`${pending.length} photo${pending.length !== 1 ? 's' : ''} waiting for review`}
        right={<Badge label={`${pending.length}`} tone="coral" />}
      />

      {pending.map((g) => (
        <LinearGradient
          key={g.id}
          colors={['#1E3344', '#0E6F8C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.photoCard}
        >
          <View style={styles.photoTop}>
            <View style={styles.photoIcon}>
              <MaterialCommunityIcons name="image-multiple-outline" size={28} color={Colors.white} />
            </View>
            <Badge label={g.className} tone="primary" />
          </View>
          <Text style={styles.caption}>{g.caption}</Text>
          <Text style={styles.meta}>
            Uploaded by {g.uploadedBy} • {g.date}
          </Text>
          <View style={styles.tags}>
            {g.aiTags.map((t) => (
              <View key={t} style={styles.tag}>
                <MaterialCommunityIcons name="tag-outline" size={12} color="#A8D5E8" />
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <Pressable onPress={() => decide(g.id, 'reject')} style={[styles.btn, styles.reject]}>
              <MaterialCommunityIcons name="close" size={18} color={Colors.danger} />
              <Text style={[styles.btnText, { color: Colors.danger }]}>Reject</Text>
            </Pressable>
            <Pressable onPress={() => decide(g.id, 'approve')} style={[styles.btn, styles.approve]}>
              <MaterialCommunityIcons name="check" size={18} color={Colors.white} />
              <Text style={[styles.btnText, { color: Colors.white }]}>Approve</Text>
            </Pressable>
          </View>
        </LinearGradient>
      ))}

      {pending.length === 0 ? (
        <EmptyState
          icon="check-decagram"
          title="All caught up!"
          message="New teacher uploads will appear here for review."
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoCard: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    marginBottom: Spacing.three,
  },
  photoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 18,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.white,
    marginTop: Spacing.three,
  },
  meta: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: '#D9EFF8',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },
  reject: {
    backgroundColor: Colors.white,
  },
  approve: {
    backgroundColor: Colors.success,
  },
  btnText: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
  },
});
