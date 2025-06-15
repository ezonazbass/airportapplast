import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function VipLoungeDetailScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>VIP Lounge Detayları</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <View style={styles.infoRow}>
            <IconSymbol name="mappin.fill" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Konum</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>Terminal 1</Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="clock.fill" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Çalışma Saatleri</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>24 Saat</Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="creditcard.fill" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Giriş Ücreti</Text>
            <Text style={[styles.infoValue, { color: colors.primary }]}>₺750</Text>
          </View>
        </View>

        <View style={[styles.descriptionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Hakkında</Text>
          <Text style={[styles.description, { color: colors.secondary }]}>
            Lüks ve konforlu bir ortamda seyahatinizi beklerken dinlenin. Özel servis, lezzetli yiyecekler ve içecekler, ücretsiz Wi-Fi ve daha fazlası.
          </Text>
        </View>

        <View style={[styles.amenitiesCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Özellikler</Text>
          <View style={styles.amenitiesGrid}>
            <View style={styles.amenityItem}>
              <IconSymbol name="wifi" size={24} color={colors.primary} />
              <Text style={[styles.amenityText, { color: colors.text }]}>Ücretsiz Wi-Fi</Text>
            </View>
            <View style={styles.amenityItem}>
              <IconSymbol name="fork.knife" size={24} color={colors.primary} />
              <Text style={[styles.amenityText, { color: colors.text }]}>Açık Büfe</Text>
            </View>
            <View style={styles.amenityItem}>
              <IconSymbol name="cup.and.saucer.fill" size={24} color={colors.primary} />
              <Text style={[styles.amenityText, { color: colors.text }]}>İçecek Servisi</Text>
            </View>
            <View style={styles.amenityItem}>
              <IconSymbol name="newspaper.fill" size={24} color={colors.primary} />
              <Text style={[styles.amenityText, { color: colors.text }]}>Gazete & Dergi</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/screens/payment')}
        >
          <Text style={[styles.bookButtonText, { color: colors.buttonText }]}>Rezervasyon Yap</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  amenitiesCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  amenityItem: {
    width: '50%',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  bookButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 