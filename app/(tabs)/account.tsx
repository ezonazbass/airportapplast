import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function AccountScreen() {
  const { theme, setTheme, transition, setTransition } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const [sliderPosition] = useState(new Animated.Value(theme === 'light' ? 0 : 1));
  const sliderWidth = useRef(0);
  const lastPosition = useRef(theme === 'light' ? 0 : 1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(0, Math.min(1, lastPosition.current + gestureState.dx / sliderWidth.current));
        sliderPosition.setValue(newPosition);
        setTransition(newPosition);
        
        // Kademeli tema değişimi
        if (newPosition < 0.5) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newPosition = Math.max(0, Math.min(1, lastPosition.current + gestureState.dx / sliderWidth.current));
        sliderPosition.setValue(newPosition);
        setTransition(newPosition);
        lastPosition.current = newPosition;
        
        // Kullanıcının bıraktığı noktada kalması için
        if (newPosition < 0.5) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      },
    })
  ).current;

  const sections = [
    {
      title: 'Hesap',
      data: [
        {
          id: '1',
          label: 'Profil Bilgileri',
          icon: 'person.fill',
          route: '/screens/profile-info',
        },
        {
          id: '2',
          label: 'Biletlerim',
          icon: 'ticket.fill',
          route: '/screens/my-tickets',
        },
        {
          id: '3',
          label: 'Rezervasyonlarım',
          icon: 'calendar',
          route: '/screens/my-reservations',
        },
        {
          id: '4',
          label: 'Geçmiş Uçuşlar',
          icon: 'clock.fill',
          route: '/screens/flight-history',
        },
        {
          id: '5',
          label: 'Ödeme Yöntemleri',
          icon: 'creditcard.fill',
          route: '/screens/payment-methods',
        },
      ],
    },
    {
      title: 'Havalimanı Hizmetleri',
      data: [
        {
          id: '6',
          label: 'VIP Lounge',
          icon: 'star.fill',
          route: '/screens/vip-lounge',
        },
        {
          id: '7',
          label: 'Park Yeri Rezervasyonu',
          icon: 'car.fill',
          route: '/screens/parking',
        },
        {
          id: '8',
          label: 'Bagaj Takip',
          icon: 'suitcase.fill',
          route: '/screens/baggage-tracking',
        },
      ],
    },
    {
      title: 'Ayarlar',
      data: [
        {
          id: '9',
          label: 'Bildirimler',
          icon: 'bell.fill',
          route: '/screens/notifications',
        },
        {
          id: '10',
          label: 'Dil',
          icon: 'globe',
          route: '/screens/language',
        },
        {
          id: '11',
          label: 'Gizlilik',
          icon: 'lock.fill',
          route: '/screens/privacy',
        },
        {
          id: '12',
          label: 'Yardım ve Destek',
          icon: 'questionmark.circle.fill',
          route: '/screens/help',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: theme === 'light' 
        ? Colors.light.background 
        : Colors.dark.background,
      opacity: 1 - transition * 0.5 // Kademeli geçiş için opacity
    }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Hesabım</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sections}>
          <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.profileInfo}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + '22' }]}>
                <IconSymbol name="person.fill" size={32} color={colors.primary} />
              </View>
              <View style={styles.profileText}>
                <Text style={[styles.profileName, { color: colors.text }]}>Ahmet Yılmaz</Text>
                <Text style={[styles.profileEmail, { color: colors.secondary }]}>
                  ahmet.yilmaz@example.com
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.themeSelector, { 
            backgroundColor: theme === 'light' 
              ? Colors.light.card 
              : Colors.dark.card,
            borderColor: theme === 'light' 
              ? Colors.light.border 
              : Colors.dark.border,
            opacity: 1 - transition * 0.5 // Kademeli geçiş için opacity
          }]}>
            <Text style={[styles.themeTitle, { 
              color: theme === 'light' 
                ? Colors.light.text 
                : Colors.dark.text,
              opacity: 1 - transition * 0.5 // Kademeli geçiş için opacity
            }]}>Tema</Text>
            <View 
              style={styles.themeSliderContainer}
              onLayout={(event) => {
                sliderWidth.current = event.nativeEvent.layout.width;
              }}
            >
              <View style={styles.themeSliderTrack}>
                <IconSymbol 
                  name="sun.max.fill" 
                  size={24} 
                  color={theme === 'light' ? Colors.light.text : Colors.dark.text} 
                  style={[styles.themeIcon, { opacity: 1 - transition * 0.5 }]} 
                />
                <View style={styles.themeSliderLine} />
                <IconSymbol 
                  name="moon.fill" 
                  size={24} 
                  color={theme === 'light' ? Colors.light.text : Colors.dark.text} 
                  style={[styles.themeIcon, { opacity: 1 - transition * 0.5 }]} 
                />
              </View>
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.themeSliderThumb,
                  {
                    transform: [
                      {
                        translateX: sliderPosition.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, sliderWidth.current - 40],
                        }),
                      },
                    ],
                    backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary,
                  },
                ]}
              />
            </View>
          </View>

          {sections.map((section) => (
            <View key={section.title} style={styles.sectionWrapper}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
              <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {section.data.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => router.push(item.route as any)}
                  >
                    <View style={styles.menuItemLeft}>
                      <IconSymbol name={item.icon as any} size={24} color={colors.primary} />
                      <Text style={[styles.menuItemLabel, { color: colors.text }]}>{item.label}</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.secondary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  sections: {
    padding: 16,
  },
  profileCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  themeSelector: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  themeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  themeSliderContainer: {
    height: 40,
    position: 'relative',
  },
  themeSliderTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 8,
  },
  themeSliderLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  themeIcon: {
    width: 24,
    height: 24,
  },
  themeSliderThumb: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 0,
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionWrapper: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionContent: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 