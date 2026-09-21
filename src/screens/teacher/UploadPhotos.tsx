import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

const PRESET_EMOJIS = ['🎨', '🌧️', '🧩', '🐟', '🎵', '🏃', '✂️', '🌻'];

export default function TeacherUploadPhotosScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [picked, setPicked] = useState(false);

  const toggle = (e: string) =>
    setSelected((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));

  if (picked) {
    return (
      <Screen scroll>
        <Header title="Review photos" subtitle={`${selected.length} photo${selected.length !== 1 ? 's' : ''} selected`} />
        <View style={styles.thumbGrid}>
          {selected.map((e, i) => (
            <LinearGradient
              key={`${e}-${i}`}
              colors={['#2A4A5A', '#0E6F8C']}
              style={styles.thumb}
            >
              <Text style={styles.thumbEmoji}>{e}</Text>
            </LinearGradient>
          ))}
        </View>
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="tag-text-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            AI will auto-tag these photos by class & date. They'll go to the management approval queue
            before parents can see them.
          </Text>
        </View>
        <Button title="Send for approval" icon="send-check-outline" onPress={() => {}} />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Header title="Upload photos" subtitle="Nursery A • add to the class gallery" />

      <Pressable onPress={() => setPicked(true)} style={styles.uploadBox}>
        <View style={styles.uploadInner}>
          <MaterialCommunityIcons name="camera-plus-outline" size={40} color={Colors.primary} />
          <Text style={styles.uploadTitle}>Take or choose photos</Text>
          <Text style={styles.uploadSub}>JPG or PNG • compressed automatically</Text>
        </View>
      </Pressable>

      <Text style={styles.label}>Quick tag (optional)</Text>
      <View style={styles.emojiGrid}>
        {PRESET_EMOJIS.map((e) => {
          const active = selected.includes(e);
          return (
            <Pressable
              key={e}
              onPress={() => toggle(e)}
              style={[styles.emojiCell, active && styles.emojiCellActive]}
            >
              <Text style={styles.emoji}>{e}</Text>
              {active ? (
                <View style={styles.checkBadge}>
                  <MaterialCommunityIcons name="check" size={10} color={Colors.white} />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.infoBox}>
        <MaterialCommunityIcons name="shield-check-outline" size={20} color={Colors.success} />
        <Text style={styles.infoText}>
          Photos are private to {''}your class and are only visible to parents after management approval.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  uploadBox: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    padding: Spacing.eight,
    alignItems: 'center',
  },
  uploadInner: {
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginTop: Spacing.three,
  },
  uploadSub: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.five,
    marginBottom: Spacing.three,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  emojiCell: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emojiCellActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  emoji: {
    fontSize: 26,
  },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.four,
    marginTop: Spacing.five,
    marginBottom: Spacing.five,
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  thumbGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: {
    fontSize: 36,
  },
});
