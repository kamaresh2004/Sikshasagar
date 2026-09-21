import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ActivityCard } from '@/components/shared/ActivityCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Field } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Spacing } from '@/constants/theme';
import { ACTIVITIES } from '@/constants/mock';
import { TeacherNavParamList } from '@/navigation/types';

export default function TeacherActivitiesScreen() {
  const navigation = useNavigation<NavigationProp<TeacherNavParamList>>();
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    setCreating(false);
    setTitle('');
    setDescription('');
  };

  if (creating) {
    return (
      <Screen scroll>
        <Header title="Log activity" subtitle="Share what your class did today" />
        <Field label="Activity title" icon="pencil-outline" value={title} onChangeText={setTitle} placeholder="e.g. Rainy day craft" />
        <Field
          label="Description"
          icon="text-box-outline"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the activity and what children learned…"
          multiline
          style={styles.textArea}
        />
        <Field label="Class" icon="school-outline" value="Nursery A" editable={false} />
        <Button title="Post to parents" icon="send-outline" onPress={submit} />
        <Button title="Cancel" variant="ghost" onPress={() => setCreating(false)} style={styles.cancel} fullWidth />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Header
        title="Daily activities"
        subtitle="What your class did today"
        right={<Button title="New" variant="soft" icon="plus" onPress={() => setCreating(true)} style={styles.newBtn} fullWidth={false} />}
      />
      {ACTIVITIES.length === 0 ? (
        <EmptyState icon="weather-sunny" title="No activities yet" message="Log your class's first activity of the day.">
          <Button title="Log activity" onPress={() => setCreating(true)} style={styles.emptyBtn} />
        </EmptyState>
      ) : (
        <View>
          {ACTIVITIES.map((a) => (
            <ActivityCard key={a.id} item={a} onPress={() => navigation.navigate('Activities')} />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  newBtn: {
    height: 40,
    paddingHorizontal: 14,
  },
  cancel: {
    marginTop: Spacing.three,
  },
  emptyBtn: {
    marginTop: Spacing.four,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: Spacing.three,
  },
});
