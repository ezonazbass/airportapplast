import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <IconSymbol name="house" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Uçuşlar',
          tabBarIcon: ({ color }) => <IconSymbol name="airplane" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Hesabım',
          tabBarIcon: ({ color }) => <IconSymbol name="person.fill" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
