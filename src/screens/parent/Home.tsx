import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActivityCard } from '@/components/shared/ActivityCard';
import { AnnouncementCard } from '@/components/shared/AnnouncementCard';
import { GreetingHeader } from '@/components/shared/GreetingHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ACTIVITIES, ANNOUNCEMENTS, CHILDREN_BY_USER } from '@/constants/mock';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { ParentNavParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';

export default function ParentHomeScreen() {
  const navigation = useNavigation<NavigationProp<ParentNavParamList>>();
  const user = useAuthStore(s => s.user);
  const children =
    (user ? CHILDREN_BY_USER[user.id] : undefined) ??
    CHILDREN_BY_USER['u-parent-1'];

  return (
    <Screen scroll padded={false}>
      <GreetingHeader
        subtitle={`Keeping up with ${children
          .map(c => c.name.split(' ')[0])
          .join(' & ')}`}
      />

      <View style={styles.content}>
        {children.length > 0 ? (
          <>
            <SectionTitle title="Your children" />
            <View style={styles.kidsRow}>
              {children.map(c => (
                <Card
                  key={c.id}
                  style={styles.kidCard}
                  onPress={() => navigation.navigate('ChildProfile')}
                >
                  <Avatar name={c.name} emoji={c.emoji} size={56} />
                  <Text style={styles.kidName} numberOfLines={1}>
                    {c.name.split(' ')[0]}
                  </Text>
                  <Badge label={c.className} tone="info" />
                </Card>
              ))}
            </View>
          </>
        ) : null}

        <SectionTitle title="Today at school" />
        {ACTIVITIES.slice(0, 3).map(a => (
          <ActivityCard
            key={a.id}
            item={a}
            onPress={() => navigation.navigate('ParentActivities')}
          />
        ))}

        <SectionTitle title="Announcements" />
        {ANNOUNCEMENTS.slice(0, 2).map(a => (
          <AnnouncementCard key={a.id} item={a} />
        ))}

        <SectionTitle title="Chat with us" />
        <View style={styles.assistRow}>
          <PressableAI
            icon="robot-happy-outline"
            tone={Colors.secondary}
            toneSoft={Colors.secondarySoft}
            label="Ask the AI assistant"
            sub="Admissions & school FAQs"
            onPress={() => navigation.navigate('Chatbot')}
          />
          <PressableAI
            icon="phone-outline"
            tone={Colors.primary}
            toneSoft={Colors.primarySoft}
            label="Contact school"
            sub="Office, teacher & WhatsApp"
            onPress={() => navigation.navigate('Contact')}
          />
        </View>
      </View>
    </Screen>
  );
}

function PressableAI({
  icon,
  tone,
  toneSoft,
  label,
  sub,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tone: string;
  toneSoft: string;
  label: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <Card style={styles.assistCard} onPress={onPress}>
      <View style={[styles.assistIconWrap, { backgroundColor: toneSoft }]}>
        <MaterialCommunityIcons name={icon} size={24} color={tone} />
      </View>
      <Text style={styles.assistLabel}>{label}</Text>
      <Text style={styles.assistSub}>{sub}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  kidsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  kidCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  kidName: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  assistRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  assistCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
  assistIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistLabel: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
  assistSub: {
    fontSize: 11,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});
