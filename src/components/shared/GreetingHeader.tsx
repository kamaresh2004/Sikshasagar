import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { NOTIFICATIONS } from '@/constants/mock';
import { Colors, FontFamily, Gradients, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth';

interface GreetingHeaderProps {
  greeting?: string;
  subtitle?: string;
}

function greetingForHour() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function GreetingHeader({ greeting, subtitle }: GreetingHeaderProps) {
  const navigation = useNavigation<any>();
  const user = useAuthStore(s => s.user);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <LinearGradient
      colors={Gradients.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrap}
    >
      <View style={styles.topRow}>
        <Pressable
          onPress={() => navigation.navigate('Notifications')}
          hitSlop={8}
          style={styles.bell}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={Colors.white}
          />
          {unread > 0 ? (
            <View style={styles.dot}>
              <Text style={styles.dotText}>{unread}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Avatar
            name={user?.name ?? 'U'}
            color={user?.avatarColor}
            size={40}
          />
        </Pressable>
      </View>
      <View style={styles.greetWrap}>
        <Text style={styles.hello}>{greeting ?? greetingForHour()}</Text>
        <Text style={styles.name}>
          {user?.name?.split(' ')[0] ?? 'there'} 👋
        </Text>
        <Text style={styles.subtitle}>{subtitle ?? today}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.coral,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dotText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: FontFamily.display,
    fontWeight: '800',
  },
  greetWrap: {
    marginTop: Spacing.five,
  },
  hello: {
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: 'rgba(255,255,255,0.8)',
  },
  name: {
    fontSize: 26,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
});
