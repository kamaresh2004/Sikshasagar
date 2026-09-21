import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, Shadow } from '@/constants/theme';
import { Motion, roleTheme } from '@/constants/theme';
import { MainTabsParamList } from '@/navigation/types';
import ManagementDashboardScreen from '@/screens/management/Dashboard';
import ManagementMoreScreen from '@/screens/management/More';
import StudentsScreen from '@/screens/management/Students';
import TeachersScreen from '@/screens/management/Teachers';
import ParentCalendarScreen from '@/screens/parent/Calendar';
import ParentGalleryScreen from '@/screens/parent/Gallery';
import ParentHomeScreen from '@/screens/parent/Home';
import ParentMoreScreen from '@/screens/parent/More';
import TeacherActivitiesScreen from '@/screens/teacher/Activities';
import TeacherAttendanceScreen from '@/screens/teacher/Attendance';
import TeacherHomeScreen from '@/screens/teacher/Home';
import TeacherMoreScreen from '@/screens/teacher/More';
import { useAuthStore } from '@/store/auth';

const Tab = createBottomTabNavigator<MainTabsParamList>();

interface TabDef {
  name: keyof MainTabsParamList;
  component: React.ComponentType;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconActive: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const MANAGEMENT_TABS: TabDef[] = [
  { name: 'Dashboard', component: ManagementDashboardScreen, label: 'Dashboard', icon: 'view-dashboard-outline', iconActive: 'view-dashboard' },
  { name: 'Students', component: StudentsScreen, label: 'Students', icon: 'account-child-outline', iconActive: 'account-child' },
  { name: 'Teachers', component: TeachersScreen, label: 'Teachers', icon: 'account-tie-outline', iconActive: 'account-tie' },
  { name: 'More', component: ManagementMoreScreen, label: 'More', icon: 'dots-horizontal-circle-outline', iconActive: 'dots-horizontal-circle' },
];

const TEACHER_TABS: TabDef[] = [
  { name: 'Home', component: TeacherHomeScreen, label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'Attendance', component: TeacherAttendanceScreen, label: 'Attendance', icon: 'clipboard-check-outline', iconActive: 'clipboard-check' },
  { name: 'Activities', component: TeacherActivitiesScreen, label: 'Activities', icon: 'pencil-ruler', iconActive: 'pencil-ruler' },
  { name: 'More', component: TeacherMoreScreen, label: 'More', icon: 'dots-horizontal-circle-outline', iconActive: 'dots-horizontal-circle' },
];

const PARENT_TABS: TabDef[] = [
  { name: 'Home', component: ParentHomeScreen, label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'Gallery', component: ParentGalleryScreen, label: 'Gallery', icon: 'image-multiple-outline', iconActive: 'image-multiple' },
  { name: 'Calendar', component: ParentCalendarScreen, label: 'Calendar', icon: 'calendar-month-outline', iconActive: 'calendar-month' },
  { name: 'More', component: ParentMoreScreen, label: 'More', icon: 'dots-horizontal-circle-outline', iconActive: 'dots-horizontal-circle' },
];

function tabDefsForRole(role: string): TabDef[] {
  if (role === 'teacher') return TEACHER_TABS;
  if (role === 'parent') return PARENT_TABS;
  return MANAGEMENT_TABS;
}

/**
 * Floating pill tab bar: tabs sit on a rounded floating bar; a soft-tinted
 * pill slides to the focused tab on the UI thread.
 */
function PillTabBar({
  state,
  navigation,
  accent,
}: {
  state: any;
  navigation: any;
  accent: { color: string; soft: string };
}) {
  const insets = useSafeAreaInsets();
  const count = state.routes.length;
  const [progress] = useState(() => new Animated.Value(state.index));
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    Animated.spring(progress, {
      toValue: state.index,
      ...Motion.springBounce,
      useNativeDriver: true,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }).start();
  }, [state.index, progress]);

  const onBarLayout = (e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  };

  const tabW = barWidth / count;
  const pillStyle = {
    width: tabW - 8,
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: Array.from({ length: count }, (_, i) => i),
          outputRange: Array.from({ length: count }, (_, i) => i * tabW),
        }),
      },
    ],
  };

  return (
    <View style={[styles.outer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.bar} onLayout={onBarLayout}>
        <Animated.View
          style={[styles.pill, styles.nonInteractive, { backgroundColor: accent.soft }, pillStyle]}
        />
        {state.routes.map((route: any, index: number) => {
          const tabDef = defsForRoute(route.name);
          if (!tabDef) return null;
          const focused = state.index === index;
          return (
            <TabButton
              key={route.key}
              tabDef={tabDef}
              focused={focused}
              tint={accent.color}
              onPress={() => {
                if (!focused) navigation.navigate(route.name);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

function defsForRoute(name: string): TabDef | null {
  return (
    MANAGEMENT_TABS.find((t) => t.name === name) ??
    TEACHER_TABS.find((t) => t.name === name) ??
    PARENT_TABS.find((t) => t.name === name) ??
    null
  );
}

function TabButton({
  tabDef,
  focused,
  tint,
  onPress,
}: {
  tabDef: TabDef;
  focused: boolean;
  tint: string;
  onPress: () => void;
}) {
  const color = focused ? tint : Colors.textMuted;
  return (
    <Pressable
      style={[styles.tabsPressable, { transform: [{ scale: focused ? 1.06 : 1 }] }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={tabDef.label}
      accessibilityState={{ selected: focused }}
    >
        <MaterialCommunityIcons
          name={focused ? tabDef.iconActive : tabDef.icon}
          size={focused ? 23 : 22}
          color={color}
        />
        <Text style={[styles.label, { color, fontWeight: focused ? '700' : '600' }]}>
          {tabDef.label}
        </Text>
    </Pressable>
  );
}

export default function MainTabsRoot() {
  const role = useAuthStore((s) => s.user?.role) ?? 'management';
  const accent = roleTheme(role);
  const tabs = tabDefsForRole(role);

  return (
    <Tab.Navigator
      tabBar={(props) => <PillTabBar state={props.state} navigation={props.navigation} accent={accent} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        tabBarHideOnKeyboard: true,
        lazy: false,
      }}
    >
      {tabs.map((t) => (
        <Tab.Screen key={t.name} name={t.name} component={t.component} options={{ title: t.label }} />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    zIndex: 20,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 24,
    height: 62,
    paddingHorizontal: 6,
    alignItems: 'center',
    ...Shadow.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pill: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 20,
  },
  nonInteractive: {
    pointerEvents: 'none',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 54,
  },
  tabsPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: 54,
  },
  label: {
    fontSize: 10,
    fontFamily: FontFamily.display,
  },
});
