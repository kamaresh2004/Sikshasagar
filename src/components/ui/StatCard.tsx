import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { FadeInUp, PopIn } from '@/components/ui/motion/Entrance';
import { Colors, FontFamily, Gradients, Radius, Spacing, Type } from '@/constants/theme';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  accent?: 'primary' | 'accent' | 'success' | 'coral' | 'purple';
  sub?: string;
  delay?: number;
}

const ACCENTS: Record<NonNullable<StatCardProps['accent']>, readonly [string, string]> = {
  primary: Gradients.statPrimary,
  accent: Gradients.statAccent,
  success: Gradients.statSuccess,
  coral: Gradients.statCoral,
  purple: Gradients.statPurple,
};

export function StatCard({ label, value, icon, accent = 'primary', sub, delay = 0 }: StatCardProps) {
  const colors = ACCENTS[accent];
  return (
    <FadeInUp delay={delay} distance={16}>
      <LinearGradient
        colors={[colors[0], colors[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <PopIn delay={delay + 60}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={icon} size={20} color={Colors.white} />
          </View>
        </PopIn>
        <PopIn delay={delay + 100}>
          <Text style={styles.value}>{value}</Text>
        </PopIn>
        <Text style={styles.label}>{label}</Text>
        {sub ? <Text style={styles.sub}>{sub}</Text> : null}
      </LinearGradient>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    minHeight: 132,
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: Type.display,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.white,
    marginTop: Spacing.two,
  },
  label: {
    fontSize: Type.bodySmall,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  sub: {
    fontSize: Type.caption,
    fontFamily: FontFamily.body,
    color: 'rgba(255,255,255,0.7)',
  },
});
