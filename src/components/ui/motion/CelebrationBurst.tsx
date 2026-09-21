import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const STARS: { icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string; offset: number }[] = [
  { icon: 'star', color: '#F59E0B', offset: -40 },
  { icon: 'star-four-points', color: '#0E7490', offset: 40 },
  { icon: 'heart', color: '#FF7A59', offset: 0 },
  { icon: 'star', color: '#FFD54F', offset: 90 },
  { icon: 'star-four-points', color: '#8B5CF6', offset: -90 },
];

/**
 * One-off celebratory pop: a brief burst of stars around the content.
 * Used ONLY for full-class attendance complete and reward milestones.
 * Disappears on its own; never repeats automatically.
 */
export function CelebrationBurst() {
  const { width } = useWindowDimensions();
  const centerX = width / 2;

  return (
    <Animated.View style={[styles.wrap, { left: centerX - 60, top: -20, pointerEvents: 'none' }]}>
      {STARS.map((s, i) => (
        <Star key={s.icon} icon={s.icon} color={s.color} offset={s.offset} index={i} />
      ))}
    </Animated.View>
  );
}

function Star({
  icon,
  color,
  offset,
  index,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  offset: number;
  index: number;
}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(0));
  const [rotate] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const anim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 50,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -26,
        duration: 400,
        delay: index * 50,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    const spin = Animated.timing(rotate, {
      toValue: 24,
      duration: 400,
      delay: index * 50,
      useNativeDriver: true,
    });
    anim.start();
    spin.start();
    return () => {
      anim.stop();
      spin.stop();
    };
  }, [opacity, translateY, rotate, index]);

  const rotation = rotate.interpolate({ inputRange: [0, 24], outputRange: ['0deg', '24deg'] });

  return (
    <Animated.View
      style={[
        styles.star,
        { left: offset },
        { opacity, transform: [{ translateY }, { rotate: rotation }] },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: 120,
    height: 80,
    zIndex: 50,
  },
  star: {
    position: 'absolute',
    top: 30,
  },
});
