import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export function Logo({ size = 72, showText = true }: LogoProps) {
  const width = size * (showText ? 3.35 : 2.7);

  return (
    <View style={styles.wrap}>
      <Image
        source={require('../../../assets/sikshasagar-logo.png')}
        style={[styles.image, { width, height: size * 1.55 }]}
        resizeMode="contain"
        accessibilityLabel="Siksha Sagar — Discover. Explore. Grow."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#FFFFFF',
  },
});
