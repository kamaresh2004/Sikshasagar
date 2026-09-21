import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors, FontFamily, Spacing, Type } from '@/constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  eyebrow?: string;
}

export function Header({ title, subtitle, back = true, right, eyebrow }: HeaderProps) {
  const navigation = useNavigation();
  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {back && (
          <Pressable
            onPress={goBack}
            hitSlop={10}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </Pressable>
        )}
        <View style={styles.textWrap}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  textWrap: {
    flex: 1,
  },
  eyebrow: {
    fontSize: Type.caption,
    fontFamily: FontFamily.body,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  title: {
    fontSize: Type.title,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: Type.bodySmall,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
