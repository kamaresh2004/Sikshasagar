import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParamList } from '@/navigation/types';
import ForgotPasswordScreen from '@/screens/auth/ForgotPassword';
import LoginScreen from '@/screens/auth/Login';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right', gestureEnabled: true }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ animation: 'fade_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
