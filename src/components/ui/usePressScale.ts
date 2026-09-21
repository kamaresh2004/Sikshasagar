import { useState } from 'react';
import { Animated } from 'react-native';

import { Motion } from '@/constants/theme';

/**
 * Smooth scale-down press feedback for pressables.
 * Returns an animated scale value + the handlers to spread on a Pressable.
 */
export function usePressScale(scaleTo: number = Motion.scalePressed) {
  const [scale] = useState(() => new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: scaleTo,
      speed: 40,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 24,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  return {
    scale,
    handlers: { onPressIn, onPressOut },
  };
}