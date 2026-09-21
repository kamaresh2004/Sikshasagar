import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AnnouncementCard } from '@/components/shared/AnnouncementCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { FadeInView } from '@/components/ui/Reveal';
import { Screen } from '@/components/ui/Screen';
import { toast } from '@/components/ui/Toast';
import { useRefreshing } from '@/hooks/useRefreshing';
import { ANNOUNCEMENTS } from '@/constants/mock';
import { ManagementNavParamList } from '@/navigation/types';

export default function AnnouncementsScreen() {
  useNavigation<NavigationProp<ManagementNavParamList>>();
  const { refreshing, onRefresh } = useRefreshing();

  const compose = () => toast('Compose becomes available once the backend is connected.', 'info');

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <Header
        title="Announcements"
        subtitle="Broadcast to classes or the whole school"
        right={<Button title="Compose" variant="soft" icon="plus" onPress={compose} style={styles.compose} fullWidth={false} />}
      />
      {ANNOUNCEMENTS.length === 0 ? (
        <EmptyState icon="bullhorn-outline" title="No announcements yet" message="Create the first notice for your school community." />
      ) : (
        <View>
          {ANNOUNCEMENTS.map((a, i) => (
            <FadeInView key={a.id} delay={i * 40}>
              <AnnouncementCard item={a} />
            </FadeInView>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  compose: {
    height: 40,
    paddingHorizontal: 14,
  },
});
