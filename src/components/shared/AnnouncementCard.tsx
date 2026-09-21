import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card } from '@/components/ui/Card';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { Announcement } from '@/constants/types';
import { ManagementNavParamList } from '@/navigation/types';

export function AnnouncementCard({ item }: { item: Announcement }) {
  const navigation = useNavigation<NavigationProp<ManagementNavParamList>>();
  return (
    <Card onPress={() => navigation.navigate('Announcements')} style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.audience} • {item.date}
          </Text>
        </View>
        {item.pinned ? (
          <MaterialCommunityIcons name="pin" size={18} color={Colors.coral} />
        ) : item.priority === 'important' ? (
          <View style={styles.dot} />
        ) : null}
      </View>
      <Text style={styles.body} numberOfLines={2}>
        {item.body}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  emoji: {
    fontSize: 26,
  },
  textWrap: {
    flex: 1,
  },
  title: {
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral,
  },
  body: {
    fontSize: 13.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginTop: Spacing.three,
  },
});
