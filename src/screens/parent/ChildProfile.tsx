import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { CHILDREN_BY_USER } from '@/constants/mock';
import { ParentNavParamList } from '@/navigation/types';

export default function ChildProfileScreen() {
  const navigation = useNavigation<NavigationProp<ParentNavParamList>>();
  const children = CHILDREN_BY_USER['u-parent-1'];
  const [selectedId, setSelectedId] = useState(children[0].id);
  const child = children.find((c) => c.id === selectedId) ?? children[0];

  return (
    <Screen scroll padded={false}>
      <Header title="Child profile" subtitle="Details & class information" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.switcher}
        contentContainerStyle={styles.switcherContent}
      >
        {children.map((c) => {
          const active = c.id === selectedId;
          return (
            <Pressable
              key={c.id}
              onPress={() => setSelectedId(c.id)}
              style={[styles.childChip, active && styles.childChipActive]}
            >
              <Text style={styles.childEmoji}>{c.emoji}</Text>
              <Text style={[styles.childName, active && styles.childNameActive]}>{c.name.split(' ')[0]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.hero}>
          <Avatar name={child.name} emoji={child.emoji} size={84} />
          <Text style={styles.name}>{child.name}</Text>
          <Text style={styles.className}>{child.className}</Text>
          <View style={styles.badges}>
            <Badge label={`Age ${child.age}`} tone="info" />
            <Badge label={child.bloodGroup} tone="danger" />
          </View>
        </View>

        <SectionTitle title="Details" />
        <Card style={styles.card}>
          <ListItem icon="cake-variant-outline" title="Date of birth" subtitle={child.dob} tint={Colors.primary} />
          <View style={styles.divider} />
          <ListItem icon="school-outline" title="Admitted on" subtitle={child.admissionDate} tint={Colors.primary} />
          <View style={styles.divider} />
          <ListItem icon="account-heart-outline" title="Guardian" subtitle={child.guardian} tint={Colors.accent} />
          <View style={styles.divider} />
          <ListItem icon="map-marker-outline" title="Address" subtitle={child.address} tint={Colors.primary} />
        </Card>

        <SectionTitle title="Quick view" />
        <View style={styles.quickRow}>
          <QuickBlock icon="calendar-check" tint={Colors.success} tintSoft="#E6F6F0" label="Attendance" value="86%" onPress={() => navigation.navigate('AttendanceHistory', { studentId: child.id })} />
          <QuickBlock icon="star-outline" tint="#D97706" tintSoft="#FDF1E3" label="Updates" value="4" onPress={() => navigation.navigate('ParentPerformance', { studentId: child.id })} />
          <QuickBlock icon="image-multiple-outline" tint="#7C6BF0" tintSoft="#EFEDFD" label="Gallery" value="12" onPress={() => navigation.navigate('Gallery')} />
        </View>
      </View>
    </Screen>
  );
}

function QuickBlock({
  icon,
  tint,
  tintSoft,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tint: string;
  tintSoft: string;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Card style={styles.quickCard} onPress={onPress}>
      <View style={[styles.quickIconWrap, { backgroundColor: tintSoft }]}>
        <MaterialCommunityIcons name={icon} size={22} color={tint} />
      </View>
      <Text style={styles.quickValue}>{value}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  switcher: {
    flexGrow: 0,
    marginBottom: Spacing.four,
  },
  switcherContent: {
    paddingHorizontal: 20,
    gap: Spacing.two,
  },
  childChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  childChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  childEmoji: {
    fontSize: 20,
  },
  childName: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  childNameActive: {
    color: Colors.primaryDark,
  },
  content: {
    paddingHorizontal: 20,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.six,
  },
  name: {
    fontSize: 22,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.three,
  },
  className: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  card: {
    paddingHorizontal: Spacing.five,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  quickCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickValue: {
    fontSize: 18,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.two,
  },
  quickLabel: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
