import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { TeacherNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';
import { roleTheme } from '@/constants/theme';

export default function TeacherMoreScreen() {
  const navigation = useNavigation<NavigationProp<TeacherNavParamList>>();
  const accent = roleTheme(useAuthStore((s) => s.user?.role));

  return (
    <Screen scroll>
      <Header title="More" subtitle="Teacher tools" back={false} />

      <Card style={styles.card}>
        <Text style={styles.group}>Teaching</Text>
        <ListItem icon="book-edit-outline" title="Homework & notes" subtitle="Share with parents" tint={Colors.accent} onPress={() => navigation.navigate('Homework')} />
        <View style={styles.divider} />
        <ListItem icon="star-circle-outline" title="Performance notes" subtitle="Track milestones" tint="#7C3AED" onPress={() => navigation.navigate('TeacherPerformance')} />
        <View style={styles.divider} />
        <ListItem icon="calendar-star" title="Events" subtitle="School celebrations & holidays" tint="#DB2777" onPress={() => navigation.navigate('Events')} />
        <View style={styles.divider} />
        <ListItem icon="calendar-check-outline" title="Leave requests" subtitle="Approve or decline" tint={Colors.warning} onPress={() => navigation.navigate('TeacherLeaveRequests')} />
        <View style={styles.divider} />
        <ListItem icon="camera-plus-outline" title="Upload photos" subtitle="Add to class gallery" tint={Colors.coral} onPress={() => navigation.navigate('UploadPhotos')} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.group}>Account</Text>
        <ListItem icon="bell-outline" title="Notifications" tint={Colors.primary} onPress={() => navigation.navigate('Notifications')} />
        <View style={styles.divider} />
        <ListItem icon="account-circle-outline" title="Profile & settings" tint={Colors.primary} onPress={() => navigation.navigate('Profile')} />
      </Card>

      <View style={[styles.aiCard, { backgroundColor: accent.soft }]}>
        <View style={[styles.aiIconWrap, { backgroundColor: Colors.surface }]}>
          <MaterialCommunityIcons name="robot-happy-outline" size={22} color={accent.color} />
        </View>
        <Text style={[styles.aiText, { color: accent.dark }]}>
          Your activity notes help the AI write parents' evening summary. Keep them simple and warm.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.four,
    paddingHorizontal: Spacing.five,
  },
  group: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 16,
    padding: Spacing.four,
  },
  aiIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FontFamily.body,
    lineHeight: 18,
  },
});
