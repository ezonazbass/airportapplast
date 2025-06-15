import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function ParkingScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const parkingLots = [
    {
      id: '1',
      name: 'P1 - Terminal 1',
      availableSpots: 45,
      totalSpots: 100,
      pricePerHour: '₺20',
      distance: '2 dk yürüme',
      features: ['24 Saat', 'Güvenlik', 'Valet'],
    },
    {
      id: '2',
      name: 'P2 - Terminal 2',
      availableSpots: 78,
      totalSpots: 150,
      pricePerHour: '₺25',
      distance: '5 dk yürüme',
      features: ['24 Saat', 'Güvenlik', 'Valet', 'Elektrikli Araç'],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Park Yeri Rezervasyonu</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { minHeight: '100%' }]}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mevcut Park Alanları</Text>

          {parkingLots.map((lot) => (
            <View
              key={lot.id}
              style={[styles.parkingCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.parkingHeader}>
                <View>
                  <Text style={[styles.parkingName, { color: colors.text }]}>{lot.name}</Text>
                  <Text style={[styles.parkingDistance, { color: colors.secondary }]}>{lot.distance}</Text>
                </View>
                <View style={[styles.availabilityContainer, { backgroundColor: colors.primary + '22' }]}>
                  <Text style={[styles.availabilityText, { color: colors.primary }]}>
                    {lot.availableSpots}/{lot.totalSpots}
                  </Text>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {lot.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                    <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.parkingFooter}>
                <View>
                  <Text style={[styles.priceLabel, { color: colors.secondary }]}>Saatlik Ücret</Text>
                  <Text style={[styles.priceText, { color: colors.primary }]}>{lot.pricePerHour}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.reserveButton, { backgroundColor: colors.primary }]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.reserveButtonText, { color: colors.buttonText }]}>Rezervasyon Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  parkingCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  parkingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  parkingDistance: {
    fontSize: 14,
  },
  availabilityContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 14,
  },
  parkingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
  },
  reserveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  reserveButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
