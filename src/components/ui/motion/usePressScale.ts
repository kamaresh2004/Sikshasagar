import { useState } from 'react';
import { Animated } from 'react-native';

import { Motion } from '@/constants/theme';

export interface PressScaleHandlers {
  onPressIn: () => void;
  onPressOut: () => void;
}

/**
 * Press feedback (RN core Animated — works on web + native). Scale down on
 * press-in, spring back on press-out. Returns an animated value + handlers.
 */
export function usePressScale(scaleTo: number = Motion.scalePressed) {
  const [scale] = useState(() => new Animated.Value(1));

  return {
    scale,
    handlers: {
      onPressIn: () => {
        Animated.spring(scale, {
          toValue: scaleTo,
          ...Motion.spring,
          useNativeDriver: true,
        }).start();
      },
      onPressOut: () => {
        Animated.spring(scale, {
          toValue: 1,
          ...Motion.spring,
          useNativeDriver: true,
        }).start();
      },
    } satisfies PressScaleHandlers,
  };
}