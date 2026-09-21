import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({ placeholder = 'Search…', value, onChangeText }: SearchBarProps) {
  const [internal, setInternal] = useState('');
  const text = value ?? internal;
  return (
    <View style={styles.wrap}>
      <MaterialCommunityIcons name="magnify" size={20} color={Colors.textMuted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={text}
        onChangeText={(t) => (onChangeText ? onChangeText(t) : setInternal(t))}
      />
      {text.length > 0 ? (
        <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textMuted} onPress={() => (onChangeText ? onChangeText('') : setInternal(''))} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
    height: 48,
    gap: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.body,
    color: Colors.text,
    padding: 0,
  },
});
