import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { DemoAccounts } from '@/components/brand/DemoAccounts';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { FadeInUp } from '@/components/ui/motion/Entrance';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { DEMO_PASSWORD, DEMO_USERS } from '@/constants/mock';
import { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/auth';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError(null);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) setError(res.error ?? 'Login failed.');
  };

  const fill = (em: string) => {
    setEmail(em);
    setPassword(DEMO_PASSWORD);
    setError(null);
  };

  return (
    <Screen scroll padded keyboard noAnimate>
      <FadeInUp distance={16}>
        <LinearGradient
          colors={['#DCEFF5', Colors.background]}
          style={[styles.hero, styles.nonInteractive]}
        >
          <View style={styles.heroInner}>
            <Logo />
            <Text style={styles.welcome}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your {''}child's happy day.</Text>
          </View>
        </LinearGradient>
      </FadeInUp>

      <FadeInUp delay={120} distance={16}>
        <Field
          label="Email address"
          icon="email-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <Field
          label="Password"
          icon="lock-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!showPw}
          rightIcon={showPw ? 'eye-off-outline' : 'eye-outline'}
          onRightIconPress={() => setShowPw((v) => !v)}
          onSubmitEditing={handleLogin}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </FadeInUp>

      <FadeInUp delay={200} distance={16}>
        <Button title="Sign in" onPress={handleLogin} loading={loading} icon="login" />

        <Text
          style={styles.forgot}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot password?
        </Text>
      </FadeInUp>

      <FadeInUp delay={280} distance={16}>
        <DemoAccounts
          accounts={DEMO_USERS.map((u) => {
            const meta =
              u.role === 'management'
                ? { icon: 'briefcase-outline' as const, tint: '#0E6F8C', soft: '#E8F3F6' }
                : u.role === 'teacher'
                  ? { icon: 'school-outline' as const, tint: '#0A9C5F', soft: '#E3F6EC' }
                  : { icon: 'account-heart-outline' as const, tint: '#F06A52', soft: '#FEECE6' };
            return {
              label: u.role.charAt(0).toUpperCase() + u.role.slice(1),
              email: u.email,
              icon: meta.icon,
              tint: meta.tint,
              soft: meta.soft,
            };
          })}
          onSelect={fill}
        />
      </FadeInUp>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: -20,
    marginTop: -8,
    marginBottom: Spacing.six,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  nonInteractive: {
    pointerEvents: 'none',
  },
  heroInner: {
    alignItems: 'center',
    paddingTop: Spacing.six,
    paddingBottom: Spacing.five,
  },
  welcome: {
    fontSize: 22,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
    marginTop: Spacing.five,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  error: {
    color: Colors.danger,
    fontSize: 13,
    fontFamily: FontFamily.body,
    marginBottom: Spacing.three,
  },
  forgot: {
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    marginTop: Spacing.four,
    marginBottom: Spacing.six,
  },
});
