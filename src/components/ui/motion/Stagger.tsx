import React from 'react';

import { FadeInUp } from '@/components/ui/motion/Entrance';

/**
 * Assembles a list of children one after another with a quick stagger.
 * Pass `index` per item; children fade + rise (RN core Animated,
 * reliable on web + native).
 */
export function StaggerItem({
  children,
  index,
  distance = 12,
  duration = 220,
}: {
  children: React.ReactNode;
  index: number;
  distance?: number;
  duration?: number;
}) {
  return (
    <FadeInUp delay={Math.min(index * 40, 400)} distance={distance} duration={duration}>
      {children}
    </FadeInUp>
  );
}