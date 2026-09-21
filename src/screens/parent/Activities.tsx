import React from 'react';
import { View } from 'react-native';

import { ActivityCard } from '@/components/shared/ActivityCard';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { ACTIVITIES } from '@/constants/mock';

export default function ParentActivitiesScreen() {
  return (
    <Screen scroll>
      <Header title="Daily activities" subtitle="What happened in class" />
      <View>
        {ACTIVITIES.map((a) => (
          <ActivityCard key={a.id} item={a} onPress={() => {}} />
        ))}
      </View>
    </Screen>
  );
}
