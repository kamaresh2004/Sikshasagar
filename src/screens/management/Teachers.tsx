import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { CLASSES } from '@/constants/mock';
import { ManagementNavParamList } from '@/navigation/types';

const TEACHERS = CLASSES.map((c) => ({
  id: c.teacherId,
  name: c.teacherName,
  className: c.name,
  email: `${c.teacherName.toLowerCase().replace(/[^a-z]/g, '')}@sikshasagar.in`,
  color: '#0A9C5F',
}));

export default function TeachersScreen() {
  useNavigation<NavigationProp<ManagementNavParamList>>();

  return (
    <Screen scroll>
      <Header
        title="Teachers"
        subtitle={`${TEACHERS.length} active teachers`}
        right={<Button title="Add" variant="soft" icon="plus" onPress={() => {}} style={styles.addBtn} fullWidth={false} />}
      />
      <View style={styles.list}>
        {TEACHERS.map((t, i) => (
          <View key={t.id}>
            {i > 0 ? <View style={styles.divider} /> : null}
            <ListItem
              icon="account-tie"
              title={t.name}
              subtitle={t.className}
              tint={t.color}
              right={<Badge label="Active" tone="success" />}
              onPress={() => {}}
            />
          </View>
        ))}
      </View>
      <View style={styles.info}>
        <MaterialCommunityIcons name="information-outline" size={18} color={Colors.textMuted} />
        <Badge label="Add & edit teachers is enabled when the backend is connected" tone="neutral" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    height: 40,
    paddingHorizontal: Spacing.four,
  },
  list: {
    marginTop: Spacing.four,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
    justifyContent: 'center',
  },
});
