import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { ParentNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';
import { roleTheme } from '@/constants/theme';

export default function ParentMoreScreen() {
  const navigation = useNavigation<NavigationProp<ParentNavParamList>>();
  const accent = roleTheme(useAuthStore((s) => s.user?.role));

  return (
    <Screen scroll>
      <Header title="More" subtitle="Everything for your family" back={false} />

      <Card style={styles.card}>
        <Text style={styles.group}>My child</Text>
        <ListItem icon="account-child-outline" title="Child profile" subtitle="Details & class information" tint={Colors.primary} onPress={() => navigation.navigate('ChildProfile')} />
        <View style={styles.divider} />
        <ListItem icon="calendar-check-outline" title="Attendance history" subtitle="View daily attendance" tint={Colors.success} onPress={() => navigation.navigate('AttendanceHistory', { studentId: 's-1' })} />
        <View style={styles.divider} />
        <ListItem icon="calendar-remove-outline" title="Leave applications" subtitle="Request & track leave" tint={Colors.warning} onPress={() => navigation.navigate('ParentLeave')} />
        <View style={styles.divider} />
        <ListItem icon="star-circle-outline" title="Performance updates" subtitle="Teacher notes & milestones" tint="#7C3AED" onPress={() => navigation.navigate('ParentPerformance', { studentId: 's-1' })} />
        <View style={styles.divider} />
        <ListItem icon="clipboard-text-clock-outline" title="Daily activities" subtitle="What happened in class" tint={Colors.coral} onPress={() => navigation.navigate('ParentActivities')} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.group}>Connect</Text>
        <ListItem icon="robot-outline" title="AI assistant" subtitle="Ask anything about the school" tint={Colors.primary} onPress={() => navigation.navigate('Chatbot')} />
        <View style={styles.divider} />
        <ListItem icon="phone-outline" title="Contact school" subtitle="Call, WhatsApp or email" tint={Colors.accent} onPress={() => navigation.navigate('Contact')} />
        <View style={styles.divider} />
        <ListItem icon="bell-outline" title="Notifications" tint={Colors.primary} onPress={() => navigation.navigate('Notifications')} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.group}>Account</Text>
        <ListItem icon="account-circle-outline" title="Profile & settings" tint={Colors.primary} onPress={() => navigation.navigate('Profile')} />
      </Card>

      <View style={[styles.rewardCard, { backgroundColor: accent.soft }]}>
        <View style={[styles.rewardIconWrap, { backgroundColor: Colors.surface }]}>
          <MaterialCommunityIcons name="trophy-outline" size={24} color={accent.color} />
        </View>
        <View style={styles.rewardText}>
          <Text style={[styles.rewardTitle, { color: accent.dark }]}>Parent rewards</Text>
          <Text style={[styles.rewardSub, { color: accent.dark }]}>
            You've earned <Text style={styles.rewardBold}>120 points</Text> for attendance & event participation.
          </Text>
        </View>
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
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 16,
    padding: Spacing.four,
  },
  rewardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardText: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '800',
  },
  rewardSub: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    lineHeight: 17,
    marginTop: 2,
  },
  rewardBold: {
    fontWeight: '800',
  },
});
