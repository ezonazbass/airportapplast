import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function AccountScreen() {
  const { theme, setTheme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

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
          label: 'Geçmiş Uçuşlar',
          icon: 'clock.fill',
          route: '/screens/flight-history',
        },
        {
          id: '4',
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
          id: '5',
          label: 'VIP Lounge',
          icon: 'star.fill',
          route: '/screens/vip-lounge',
        },
        {
          id: '6',
          label: 'Park Yeri Rezervasyonu',
          icon: 'car.fill',
          route: '/screens/parking',
        },
        {
          id: '7',
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
          id: '8',
          label: 'Bildirimler',
          icon: 'bell.fill',
          route: '/screens/notifications',
        },
        {
          id: '9',
          label: 'Dil',
          icon: 'globe',
          route: '/screens/language',
        },
        {
          id: '10',
          label: 'Gizlilik',
          icon: 'lock.fill',
          route: '/screens/privacy',
        },
        {
          id: '11',
          label: 'Yardım ve Destek',
          icon: 'questionmark.circle.fill',
          route: '/screens/help',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Hesabım</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/screens/profile-info')}
            >
              <Text style={styles.editButtonText}>Profili Düzenle</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.themeSelector, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.themeTitle, { color: colors.text }]}>Tema</Text>
            <View style={styles.themeButtons}>
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  theme === 'light' && { backgroundColor: colors.primary },
                ]}
                onPress={() => setTheme('light')}
              >
                <IconSymbol name="sun.max.fill" size={24} color={theme === 'light' ? '#FFFFFF' : colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  theme === 'dark' && { backgroundColor: colors.primary },
                ]}
                onPress={() => setTheme('dark')}
              >
                <IconSymbol name="moon.fill" size={24} color={theme === 'dark' ? '#FFFFFF' : colors.text} />
              </TouchableOpacity>
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
                    onPress={() => router.push(item.route)}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  editButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  themeSelector: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
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