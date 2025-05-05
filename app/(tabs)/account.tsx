import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

type MenuItem = {
  label: string;
  icon: 'person.crop.circle' | 'ticket.fill' | 'clock.fill' | 'creditcard.fill' | 'crown.fill' | 'car.fill' | 'suitcase.fill' | 'bell.fill' | 'globe' | 'lock.fill' | 'questionmark.circle.fill';
};

export default function AccountScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const [activeIndex, setActiveIndex] = useState(theme === 'dark' ? 1 : 0);
  const slideAnim = React.useRef(new Animated.Value(activeIndex)).current;

  const handleThemeChange = (index: number) => {
    setActiveIndex(index);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
    }).start();
    if (index === 0 && theme === 'dark') {
      toggleTheme();
    } else if (index === 1 && theme === 'light') {
      toggleTheme();
    }
  };

  const sections = [
    {
      title: 'Hesap',
      data: [
        { label: 'Profil Bilgileri', icon: 'person.crop.circle' as const },
        { label: 'Biletlerim', icon: 'ticket.fill' as const },
        { label: 'Geçmiş Uçuşlar', icon: 'clock.fill' as const },
        { label: 'Ödeme Yöntemleri', icon: 'creditcard.fill' as const },
      ],
    },
    {
      title: 'Havalimanı Hizmetleri',
      data: [
        { label: 'VIP Lounge', icon: 'crown.fill' as const },
        { label: 'Park Yeri Rezervasyonu', icon: 'car.fill' as const },
        { label: 'Bagaj Takip', icon: 'suitcase.fill' as const },
      ],
    },
    {
      title: 'Ayarlar',
      data: [
        { label: 'Bildirimler', icon: 'bell.fill' as const },
        { label: 'Dil Seçimi', icon: 'globe' as const },
        { label: 'Gizlilik', icon: 'lock.fill' as const },
        { label: 'Yardım', icon: 'questionmark.circle.fill' as const },
      ],
    },
  ];

  useEffect(() => {
    navigation?.setOptions({
      title: 'Hesabım',
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
          <IconSymbol name={theme === 'dark' ? 'sun.max.fill' : 'moon.fill'} size={24} color={Colors[theme as keyof typeof Colors].primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.primary + '20' }]}> 
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarBg, { backgroundColor: colors.primary + '22' }]}> 
              <IconSymbol name="person.crop.circle.fill" size={56} color={colors.primary} />
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.primary }]}>Ahmet Yılmaz</Text>
          <Text style={[styles.userEmail, { color: colors.secondary }]}>ahmet.yilmaz@example.com</Text>
        </View>

        {/* Theme Selector - profile card'ın hemen altında ve daha küçük */}
        <View style={styles.themeSelectorContainerSmall}>
          <View style={[styles.themeSelectorSmall, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.primary + '22', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }]}> 
            <Animated.View 
              style={[
                styles.themeSelectorTrackSmall,
                {
                  backgroundColor: colors.primary + '33',
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.12,
                  shadowRadius: 8,
                  elevation: 2,
                  transform: [{
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, 56],
                    }),
                  }],
                },
              ]}
            />
            <TouchableOpacity
              style={[styles.themeOptionSmall, activeIndex === 0 && styles.activeThemeOptionSmall, activeIndex === 0 && { backgroundColor: colors.primary + '22' }]}
              onPress={() => handleThemeChange(0)}
              activeOpacity={0.8}
            >
              <IconSymbol name="sun.max.fill" size={16} color={activeIndex === 0 ? colors.primary : colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOptionSmall, activeIndex === 1 && styles.activeThemeOptionSmall, activeIndex === 1 && { backgroundColor: colors.primary + '22' }]}
              onPress={() => handleThemeChange(1)}
              activeOpacity={0.8}
            >
              <IconSymbol name="moon.fill" size={16} color={activeIndex === 1 ? colors.primary : colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {sections.map((section, idx) => (
          <View key={idx} style={styles.sectionWrapper}>
            <Text style={[styles.sectionHeader, { color: colors.primary, backgroundColor: colors.background }]}> 
              {section.title}
            </Text>
            <View style={styles.sectionList}>
              {section.data.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.menuItem,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      shadowColor: colors.primary + '10',
                    },
                  ]}
                  activeOpacity={0.8}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: colors.primary + '18' }]}> 
                      <IconSymbol name={item.icon} size={22} color={colors.primary} />
                    </View>
                    <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={16} color={colors.secondary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    padding: 28,
    borderRadius: 28,
    margin: 18,
    borderWidth: 1,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatarBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3E6F5',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  sectionWrapper: {
    marginTop: 24,
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  sectionList: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeSelectorContainerSmall: {
    marginTop: 0,
    marginBottom: 8,
    alignItems: 'center',
  },
  themeSelectorSmall: {
    flexDirection: 'row',
    height: 32,
    width: 64,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  themeSelectorTrackSmall: {
    position: 'absolute',
    width: 28,
    height: 24,
    borderRadius: 12,
    top: 4,
    left: 4,
    zIndex: 1,
  },
  themeOptionSmall: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    zIndex: 2,
  },
  activeThemeOptionSmall: {
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
}); 