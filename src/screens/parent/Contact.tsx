import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

const CONTACTS = [
  { icon: 'phone-outline', label: 'School office', value: '+91 98200 11223', tint: Colors.success, action: 'tel:+919820011223' },
  { icon: 'whatsapp', label: 'WhatsApp', value: '+91 98765 43210', tint: '#25D366', action: 'https://wa.me/919876543210' },
  { icon: 'email-outline', label: 'Email', value: 'hello@sikshasagar.in', tint: Colors.primary, action: 'mailto:hello@sikshasagar.in' },
  { icon: 'map-marker-outline', label: 'Address', value: '22, Lake View Colony, Pune', tint: Colors.coral },
];

export default function ParentContactScreen() {
  const open = (action?: string) => {
    if (action) Linking.openURL(action).catch(() => {});
  };

  return (
    <Screen scroll>
      <Header title="Contact school" subtitle="We're happy to help" />

      <Card style={styles.card}>
        {CONTACTS.map((c, i) => (
          <View key={c.label}>
            {i > 0 ? <View style={styles.divider} /> : null}
            <ListItem icon={c.icon as never} title={c.label} subtitle={c.value} tint={c.tint} onPress={() => open(c.action)} />
          </View>
        ))}
      </Card>

      <Card style={styles.hoursCard}>
        <View style={styles.hoursIcon}>
          <MaterialCommunityIcons name="clock-outline" size={22} color={Colors.primary} />
        </View>
        <View style={styles.hoursText}>
          <Text style={styles.hoursTitle}>Office hours</Text>
          <Text style={styles.hoursSub}>Mon – Sat • 8:30 AM – 5:00 PM</Text>
          <Text style={styles.hoursSub}>Closed on Sundays & public holidays</Text>
        </View>
      </Card>

      <View style={styles.note}>
        <Text style={styles.noteText}>
          For day-to-day updates about your child, teachers respond within school hours. Urgent matters —
          call the office directly.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.five,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  hoursCard: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.four,
    marginTop: Spacing.four,
  },
  hoursIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursText: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 15,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  hoursSub: {
    fontSize: 12.5,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  note: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.md,
    padding: Spacing.four,
    marginTop: Spacing.four,
  },
  noteText: {
    fontSize: 12.5,
    fontFamily: FontFamily.body,
    color: Colors.primaryDark,
    lineHeight: 18,
  },
});
