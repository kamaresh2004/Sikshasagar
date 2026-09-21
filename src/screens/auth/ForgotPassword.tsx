import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Field } from '@/components/ui/Field';
import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import { Colors, FontFamily, Spacing } from '@/constants/theme';
import { AuthStackParamList } from '@/navigation/types';
import { api } from '@/services/api';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await api.resetPassword(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <Screen scroll padded>
      <Header title="Reset password" subtitle="We'll send you a secure reset link" />
      <View style={styles.logoWrap}>
        <Logo size={64} showText={false} />
      </View>
      {sent ? (
        <Card style={styles.sentCard}>
          <View style={styles.sentIcon}>
            <MaterialCommunityIcons name="email-check-outline" size={28} color={Colors.success} />
          </View>
          <Text style={styles.sentTitle}>Check your inbox</Text>
          <Text style={styles.sentBody}>
            If an account exists for <Text style={styles.bold}>{email}</Text>, a reset link has been
            sent. It expires in 30 minutes.
          </Text>
          <Button title="Back to sign in" onPress={() => navigation.goBack()} variant="outline" />
        </Card>
      ) : (
        <>
          <Field
            label="Registered email"
            icon="email-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            hint="Enter the email you used to create your account."
          />
          <Button title="Send reset link" onPress={handleSubmit} loading={loading} icon="email-fast-outline" />
          <Text style={styles.back} onPress={() => navigation.goBack()}>
            ← Back to sign in
          </Text>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  back: {
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    marginTop: Spacing.five,
  },
  sentCard: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  sentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6F6F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  sentTitle: {
    fontSize: 18,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  sentBody: {
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: Colors.text,
  },
});
