import { Platform } from 'react-native';

export const Colors = {
  primary: '#0E7490',
  primaryDark: '#0A5670',
  primaryLight: '#D6E8ED',
  primarySoft: '#E4F0F4',
  accent: '#F59E0B',
  accentDark: '#D97706',
  accentSoft: '#FDF3E0',
  coral: '#FF7A59',
  coralDark: '#E85B3A',
  coralSoft: '#FDEAE4',
  background: '#F2F4F8',
  surface: '#FFFFFF',
  ink: '#0F1B2D',
  text: '#1F2D40',
  textSecondary: '#5C6B7F',
  textMuted: '#93A1B3',
  border: '#E7EBF1',
  neutralSoft: '#E9EDF2',
  success: '#0E9F5F',
  successDark: '#0B7747',
  successSoft: '#E4F6EC',
  warning: '#D97706',
  warningDark: '#B45309',
  warningSoft: '#FDF1E3',
  danger: '#DC2626',
  dangerSoft: '#FDE8E8',
  info: '#0E7490',
  infoSoft: '#E4F0F4',
  secondary: '#8B5CF6',
  secondaryDark: '#6D28D9',
  secondarySoft: '#F1EBFD',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15, 23, 42, 0.55)',
} as const;

export type ThemeColor = keyof typeof Colors;

export const Gradients = {
  header: ['#1089A5', '#0A5670'],
  statPrimary: ['#1089A5', '#0A5670'],
  statAccent: ['#FBBF24', '#D97706'],
  statSuccess: ['#10B981', '#087F4E'],
  statCoral: ['#FF8A68', '#E85B3A'],
  statPurple: ['#A78BFA', '#6D28D9'],
  heroTeal: ['#0B6E8C', '#084B5F'],
  heroCoral: ['#FF6B4A', '#D95435'],
  heroAmber: ['#F59E0B', '#B45309'],
  glass: ['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.05)'],
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    rounded: 'ui-rounded',
    serif: 'ui-serif',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    rounded: 'normal',
    serif: 'serif',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    rounded: 'var(--font-rounded)',
    serif: 'var(--font-serif)',
    mono: 'var(--font-mono)',
  },
}) ?? {
  sans: 'normal',
  rounded: 'normal',
  serif: 'serif',
  mono: 'monospace',
};

export const FontFamily = {
  display: 'Fredoka_600SemiBold',
  displayBold: 'Fredoka_700Bold',
  displayRegular: 'Fredoka_400Regular',
  body: Fonts.sans,
  mono: Fonts.mono,
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 40,
  nine: 48,
  ten: 56,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/**
 * Typographic scale — single source of truth for font sizes.
 * Apply via `fontSize: Type.title` etc. instead of one-off numbers.
 *  - display   : hero / big numbers (StatCard values)
 *  - title     : screen headers (Header.title)
 *  - heading   : page-level heroes (hero names, welcome)
 *  - subheading: section titles / card titles
 *  - body      : primary reading text
 *  - bodySmall : secondary / descriptions
 *  - caption   : meta lines, badges, timestamps
 *  - micro     : eyebrow labels, tiny labels
 */
export const Type = {
  display: 28,
  title: 24,
  heading: 20,
  subheading: 17,
  body: 15,
  bodySmall: 13,
  caption: 12,
  micro: 10,
} as const;

export type TypeKey = keyof typeof Type;

/**
 * Role-based accent themes. Management/Teacher/Parent share the same
 * brand language but get a subtle accent treatment so each app feels
 * distinct: teal = management (data), emerald = teacher (care),
 * coral = parent (warmth).
 *
 * Studio colour hints: use `color` for icons/text on tinted `soft`
 * surfaces, `dark` for pressed/emphasis, and `gradient` for hero fills.
 */
export const RoleThemes = {
  management: {
    color: Colors.primary,
    dark: Colors.primaryDark,
    soft: Colors.primarySoft,
    gradient: ['#1089A5', '#0A5670'] as const,
    hero: ['#0B6E8C', '#084B5F'] as const,
    textOn: Colors.white,
  },
  teacher: {
    color: '#0E9C6E',
    dark: '#0B7A55',
    soft: '#E3F6EC',
    gradient: ['#14B584', '#0B7A55'] as const,
    hero: ['#0F9D6F', '#0A6B4B'] as const,
    textOn: Colors.white,
  },
  parent: {
    color: '#FF7A59',
    dark: '#E85B3A',
    soft: '#FDEAE4',
    gradient: ['#FF8A68', '#E85B3A'] as const,
    hero: ['#FF6B4A', '#D95435'] as const,
    textOn: Colors.white,
  },
} as const;

export type RoleKey = keyof typeof RoleThemes;

export function roleTheme(role?: string | null) {
  if (role === 'teacher') return RoleThemes.teacher;
  if (role === 'parent') return RoleThemes.parent;
  return RoleThemes.management;
}

export const Shadow = {
  sm: {
    shadowColor: '#14324A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#14324A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F1B2D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

/** Animation presets shared by entrance / press animations. */
export const Motion = {
  fast: 160,
  normal: 260,
  slow: 400,
  rise: 12,
  scalePressed: 0.97,
  spring: { damping: 16, stiffness: 240, mass: 0.9 },
  springBounce: { damping: 9, stiffness: 200, mass: 0.8 },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 700;

export const AttStatus = {
  PRESENT: { label: 'Present', color: Colors.success, soft: Colors.successSoft, icon: 'check-circle' as const },
  ABSENT: { label: 'Absent', color: Colors.danger, soft: Colors.dangerSoft, icon: 'close-circle' as const },
  LEAVE: { label: 'Leave', color: Colors.warning, soft: Colors.warningSoft, icon: 'clock-outline' as const },
} as const;

export type AttStatusKey = keyof typeof AttStatus;
