import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';

interface FieldProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  rightIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onRightIconPress?: () => void;
  hint?: string;
}

export function Field({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  hint,
  style,
  ...rest
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const showError = Boolean(error);

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.box, focused && styles.boxFocused, showError && styles.boxError]}>
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={showError ? Colors.danger : focused ? Colors.primary : Colors.textMuted}
            style={styles.icon}
          />
        ) : null}
        <TextInput
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, style]}
          {...rest}
        />
        {rightIcon ? (
          <MaterialCommunityIcons
            name={rightIcon}
            size={22}
            color={Colors.textMuted}
            onPress={onRightIconPress}
          />
        ) : null}
      </View>
      {hint && !showError ? <Text style={styles.hint}>{hint}</Text> : null}
      {showError ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: Spacing.four,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.two,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.four,
  },
  boxFocused: {
    borderColor: Colors.primary,
  },
  boxError: {
    borderColor: Colors.danger,
  },
  icon: {
    marginRight: Spacing.three,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    fontFamily: FontFamily.body,
    color: Colors.text,
  },
  hint: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.textMuted,
    marginTop: Spacing.two,
  },
  error: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.danger,
    marginTop: Spacing.two,
  },
});
