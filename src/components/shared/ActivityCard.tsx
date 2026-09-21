import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { ActivityItem } from '@/constants/types';
import { ParentNavParamList } from '@/navigation/types';

interface ActivityCardProps {
  item: ActivityItem;
  onPress?: () => void;
}

export function ActivityCard({ item, onPress }: ActivityCardProps) {
  const navigation = useNavigation<NavigationProp<ParentNavParamList>>();
  const handlePress = onPress ?? (() => navigation.navigate('ParentActivities'));
  return (
    <Card onPress={handlePress} style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.emojiWrap, { backgroundColor: `${item.color}1A` }]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.className} • {item.date}
          </Text>
        </View>
        <Badge label="New" tone="success" />
      </View>
      <Text style={styles.body} numberOfLines={3}>
        {item.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Posted by {item.createdBy}
          {item.mediaIds.length > 0 ? (
            <Text>
              {'  '}
              <MaterialCommunityIcons name="image-multiple-outline" size={14} color={Colors.textMuted} />
              {' '}
              {item.mediaIds.length}
            </Text>
          ) : null}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  emojiWrap: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  headerText: {
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
  body: {
    fontSize: 13.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginTop: Spacing.three,
  },
  footer: {
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
  },
});
