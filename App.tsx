import { Stack } from 'expo-router';
import { PaymentProvider } from './context/PaymentContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PaymentProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="screens/login" />
            <Stack.Screen name="screens/register" />
            <Stack.Screen name="screens/home" />
            <Stack.Screen name="screens/profile" />
            <Stack.Screen name="screens/edit-profile" />
            <Stack.Screen name="screens/payment-methods" />
            <Stack.Screen name="screens/vip-lounge-detail" options={{ headerShown: false }} />
            <Stack.Screen name="screens/my-reservations" options={{ headerShown: false }} />
            <Stack.Screen name="screens/reservation-detail" options={{ headerShown: false }} />
          </Stack>
        </PaymentProvider>
      </UserProvider>
    </ThemeProvider>
  );
} 