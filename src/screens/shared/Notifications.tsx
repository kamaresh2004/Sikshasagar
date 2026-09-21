import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { NotificationItem } from '@/constants/types';
import { useNotificationsStore } from '@/store/notifications';

const TYPE_ICON: Record<NotificationItem['type'], { icon: keyof typeof MaterialCommunityIcons.glyphMap; tint: string; soft: string }> = {
  attendance: { icon: 'calendar-check', tint: '#0E9F6E', soft: '#E6F6F0' },
  activity: { icon: 'lightbulb-on-outline', tint: '#D97706', soft: '#FDF1E3' },
  gallery: { icon: 'image-multiple-outline', tint: '#7C6BF0', soft: '#EFEDFD' },
  announcement: { icon: 'bullhorn-outline', tint: '#0E9F6E', soft: '#E6F6F0' },
  event: { icon: 'party-popper', tint: '#F973A5', soft: '#FEE8F0' },
  performance: { icon: 'star-outline', tint: '#D97706', soft: '#FDF1E3' },
  fee: { icon: 'credit-card-outline', tint: '#2563EB', soft: '#E7EEFC' },
  homework: { icon: 'pencil-ruler', tint: '#7C6BF0', soft: '#EFEDFD' },
  leave: { icon: 'calendar-remove-outline', tint: '#D97706', soft: '#FDF1E3' },
};

export default function NotificationsScreen() {
  const items = useNotificationsStore((s) => s.items);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);
  const toggleRead = useNotificationsStore((s) => s.toggleRead);
  const unread = items.filter((n) => !n.read).length;

  return (
    <Screen scroll>
      <Header
        title="Notifications"
        subtitle={unread > 0 ? `${unread} unread update${unread > 1 ? 's' : ''}` : 'You are all caught up'}
        right={
          unread > 0 ? (
            <Pressable onPress={markAllRead} hitSlop={8}>
              <Text style={styles.markAll}>Mark all read</Text>
            </Pressable>
          ) : undefined
        }
      />
      {items.length === 0 ? (
        <EmptyState icon="bell-off-outline" title="No notifications yet" message="Updates about your child's day will appear here." />
      ) : (
        <View style={styles.list}>
          {items.map((n, i) => {
            const meta = TYPE_ICON[n.type] ?? { icon: 'bell-outline' as const, tint: Colors.primary, soft: Colors.primarySoft };
            return (
              <Pressable key={n.id} onPress={() => toggleRead(n.id)}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={[styles.row, !n.read && styles.unreadBg]}>
                  <View style={[styles.emojiWrap, { backgroundColor: meta.soft }]}>
                    <MaterialCommunityIcons name={meta.icon} size={20} color={meta.tint} />
                    {!n.read ? <View style={styles.unreadDot} /> : null}
                  </View>
                  <View style={styles.textWrap}>
                    <Text style={[styles.title, !n.read && styles.bold]}>{n.title}</Text>
                    <Text style={styles.body} numberOfLines={2}>
                      {n.message}
                    </Text>
                    <Text style={styles.time}>{n.createdAt}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  markAll: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.primary,
  },
  list: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  unreadBg: {
    backgroundColor: '#F4FBFD',
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14.5,
    fontFamily: FontFamily.body,
    color: Colors.text,
  },
  bold: {
    fontWeight: '700',
  },
  body: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  time: {
    fontSize: 11.5,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 56,
  },
});
