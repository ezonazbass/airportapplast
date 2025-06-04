import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function VIPLoungeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const lounges = [
    {
      id: '1',
      name: 'Turkish Airlines Lounge',
      location: 'Terminal 1, Kat 3',
      amenities: ['Ücretsiz Wi-Fi', 'Yemek Servisi', 'Bar', 'Duş'],
      price: '€50',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Primeclass Lounge',
      location: 'Terminal 2, Kat 2',
      amenities: ['Ücretsiz Wi-Fi', 'Yemek Servisi', 'Bar', 'Duş', 'Masaj'],
      price: '€45',
      rating: 4.6,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>VIP Lounge</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mevcut Loungeler</Text>
        
        {lounges.map((lounge) => (
          <View
            key={lounge.id}
            style={[styles.loungeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.loungeHeader}>
              <View>
                <Text style={[styles.loungeName, { color: colors.text }]}>{lounge.name}</Text>
                <Text style={[styles.loungeLocation, { color: colors.secondary }]}>{lounge.location}</Text>
              </View>
              <View style={[styles.ratingContainer, { backgroundColor: colors.primary + '22' }]}>
                <IconSymbol name="star.fill" size={16} color={colors.primary} />
                <Text style={[styles.ratingText, { color: colors.primary }]}>{lounge.rating}</Text>
              </View>
            </View>

            <View style={styles.amenitiesContainer}>
              {lounge.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
                  <Text style={[styles.amenityText, { color: colors.text }]}>{amenity}</Text>
                </View>
              ))}
            </View>

            <View style={styles.loungeFooter}>
              <Text style={[styles.priceText, { color: colors.primary }]}>{lounge.price}</Text>
              <TouchableOpacity
                style={[styles.reserveButton, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
              >
                <Text style={[styles.reserveButtonText, { color: colors.buttonText }]}>Rezervasyon Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  loungeCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  loungeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  loungeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  loungeLocation: {
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amenityText: {
    fontSize: 14,
  },
  loungeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
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