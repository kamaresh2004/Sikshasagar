import React from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth';

const ROLE_LABEL: Record<string, string> = {
  management: 'Management',
  teacher: 'Teacher',
  parent: 'Parent',
};

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const confirmLogout = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to sign out?')) logout();
      return;
    }
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  if (!user) return null;

  return (
    <Screen scroll>
      <Header title="Profile" back={false} />
      <Card style={styles.profileCard}>
        <View style={styles.avatarRow}>
          <Avatar name={user.name} color={user.avatarColor} size={72} />
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.badgeRow}>
              <Badge label={ROLE_LABEL[user.role] ?? user.role} tone={user.role === 'parent' ? 'success' : 'primary'} />
              {user.className ? <Badge label={user.className} tone="info" /> : null}
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ListItem icon="email-outline" title={user.email} tint={Colors.primary} />
        <View style={styles.divider} />
        <ListItem icon="phone-outline" title={user.phone} tint={Colors.primary} />
        <View style={styles.divider} />
        <ListItem icon="shield-lock-outline" title="Change password" subtitle="Reset your password securely" tint={Colors.primary} />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <ListItem icon="bell-outline" title="Push notifications" subtitle="Attendance, activities & announcements" tint={Colors.accent} right={<Text style={styles.on}>On</Text>} />
        <View style={styles.divider} />
        <ListItem icon="theme-light-dark" title="Language" subtitle="English" tint={Colors.primary} />
        <View style={styles.divider} />
        <ListItem icon="help-circle-outline" title="Help & support" subtitle="Contact the school office" tint={Colors.primary} />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <ListItem icon="information-outline" title="Siksha Sagar Preschool" subtitle="Version 1.0.0 • Play • Learn • Grow" tint={Colors.primary} />
      </Card>

      <Button title="Sign out" variant="danger" icon="logout" onPress={confirmLogout} style={styles.logout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
  },
  avatarRow: {
    alignItems: 'center',
  },
  nameWrap: {
    alignItems: 'center',
    marginTop: Spacing.three,
    gap: Spacing.two,
  },
  name: {
    fontSize: 20,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  section: {
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.five,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  on: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.success,
  },
  logout: {
    marginTop: Spacing.six,
  },
});
