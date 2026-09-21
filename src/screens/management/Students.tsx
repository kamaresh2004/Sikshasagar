import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { ListItem } from '@/components/ui/ListItem';
import { Screen } from '@/components/ui/Screen';
import { SearchBar } from '@/components/ui/SearchBar';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { STUDENTS } from '@/constants/mock';
import { ManagementNavParamList } from '@/navigation/types';

export default function StudentsScreen() {
  const navigation = useNavigation<NavigationProp<ManagementNavParamList>>();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => STUDENTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.className.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <Screen scroll>
      <Header title="Students" subtitle={`${STUDENTS.length} enrolled this year`} />
      <SearchBar placeholder="Search by name or class…" onChangeText={setQuery} />

      <View style={styles.list}>
        {filtered.length === 0 ? (
          <EmptyState icon="account-search-outline" title="No students found" message="Try a different search term." />
        ) : (
          filtered.map((s, i) => (
            <View key={s.id}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <ListItem
                emoji={s.emoji}
                title={s.name}
                subtitle={`${s.className} • ${s.age} yrs`}
                tint={s.avatarColor}
                onPress={() => navigation.navigate('StudentDetail', { studentId: s.id })}
                right={<Badge label={s.className} tone="info" />}
              />
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
});
