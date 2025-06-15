import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function HelpScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const helpSections = [
    {
      id: '1',
      title: 'Sık Sorulan Sorular',
      description: 'En çok sorulan sorular ve cevapları',
      icon: 'questionmark.circle.fill',
      route: '/faq',
    },
    {
      id: '2',
      title: 'İletişim',
      description: 'Bize ulaşın ve destek alın',
      icon: 'envelope.fill',
      route: '/contact',
    },
    {
      id: '3',
      title: 'Kullanım Kılavuzu',
      description: 'Uygulama kullanımı hakkında detaylı bilgi',
      icon: 'book.fill',
      route: '/guide',
    },
    {
      id: '4',
      title: 'Geri Bildirim',
      description: 'Görüş ve önerilerinizi paylaşın',
      icon: 'message.fill',
      route: '/feedback',
    },
  ];

  const contactInfo = [
    {
      id: '1',
      title: 'Müşteri Hizmetleri',
      phone: '0850 123 45 67',
      hours: '7/24',
    },
    {
      id: '2',
      title: 'Teknik Destek',
      phone: '0850 123 45 68',
      hours: '09:00 - 18:00',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Yardım ve Destek</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Yardım Merkezi</Text>
        
        {helpSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[styles.helpCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(section.route)}
          >
            <View style={styles.helpHeader}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary + '22' }]}>
                <IconSymbol name={section.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.helpInfo}>
                <Text style={[styles.helpTitle, { color: colors.text }]}>{section.title}</Text>
                <Text style={[styles.helpDescription, { color: colors.secondary }]}>
                  {section.description}
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.secondary} />
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
          İletişim Bilgileri
        </Text>

        {contactInfo.map((info) => (
          <View
            key={info.id}
            style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.contactTitle, { color: colors.text }]}>{info.title}</Text>
            <Text style={[styles.contactPhone, { color: colors.primary }]}>{info.phone}</Text>
            <Text style={[styles.contactHours, { color: colors.secondary }]}>
              Çalışma Saatleri: {info.hours}
            </Text>
          </View>
        ))}

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Size daha iyi hizmet verebilmek için geri bildirimlerinizi bekliyoruz. Sorun yaşadığınızda veya önerileriniz olduğunda bizimle iletişime geçebilirsiniz.
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
  },
  contactCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactPhone: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  contactHours: {
    fontSize: 14,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
}); 