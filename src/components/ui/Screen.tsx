import React from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth, Motion } from '@/constants/theme';
import { FadeInUp } from '@/components/ui/motion/Entrance';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  keyboard?: boolean;
  /** Disable the fade+rise entrance animation (e.g. data that loads later). */
  noAnimate?: boolean;
  /** Show a branded pull-to-refresh spinner (pass refreshing + onRefresh). */
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function Screen({ children, scroll = true, padded = true, style, contentStyle, keyboard = false, noAnimate = true, refreshing = false, onRefresh }: ScreenProps) {
  const inner = (
    <View style={[padded && styles.padded, contentStyle, styles.maxWidth]}>{children}</View>
  );

  const body = scroll ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            progressBackgroundColor={Colors.surface}
          />
        ) : undefined
      }
    >
      {inner}
    </ScrollView>
  ) : (
    <View style={[styles.body, styles.maxWidth]}>{inner}</View>
  );

  const content = keyboard ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {body}
    </KeyboardAvoidingView>
  ) : (
    body
  );

  return (
    <SafeAreaView style={[styles.safe, style]} edges={['top']}>
      {noAnimate ? content : <FadeInUp distance={Motion.rise} duration={240}>{content}</FadeInUp>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  padded: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  maxWidth: {
    maxWidth: MaxContentWidth,
  },
});
