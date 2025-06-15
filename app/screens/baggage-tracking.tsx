import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function BaggageTrackingScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const baggageItems = [
    {
      id: 'TK123456',
      flightNumber: 'TK123',
      status: 'Bagaj Teslim Edildi',
      location: 'Bagaj Teslim Alanı 3',
      lastUpdate: '10:30',
      color: '#4CAF50',
    },
    {
      id: 'TK789012',
      flightNumber: 'TK456',
      status: 'Bagaj İşlemde',
      location: 'Terminal 1',
      lastUpdate: '09:45',
      color: '#FFA000',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Bagaj Teslim Edildi':
        return 'checkmark.circle.fill';
      case 'Bagaj İşlemde':
        return 'clock.fill';
      default:
        return 'questionmark.circle.fill';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bagaj Takip</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.secondary} />
          <Text style={[styles.searchPlaceholder, { color: colors.secondary }]}>
            Bagaj numarası veya uçuş numarası ile arayın
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Son Bagajlarım</Text>

        {baggageItems.map((item) => (
          <View
            key={item.id}
            style={[styles.baggageCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.baggageHeader}>
              <View>
                <Text style={[styles.baggageId, { color: colors.text }]}>{item.id}</Text>
                <Text style={[styles.flightNumber, { color: colors.secondary }]}>
                  Uçuş: {item.flightNumber}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.color + '22' }]}>
                <IconSymbol name={getStatusIcon(item.status)} size={16} color={item.color} />
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.baggageInfo}>
              <View style={styles.infoRow}>
                <IconSymbol name="location.fill" size={16} color={colors.secondary} />
                <Text style={[styles.infoText, { color: colors.text }]}>{item.location}</Text>
              </View>
              <View style={styles.infoRow}>
                <IconSymbol name="clock.fill" size={16} color={colors.secondary} />
                <Text style={[styles.infoText, { color: colors.text }]}>
                  Son Güncelleme: {item.lastUpdate}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.detailsButton, { borderColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.detailsButtonText, { color: colors.primary }]}>Detayları Gör</Text>
              <IconSymbol name="chevron.right" size={16} color={colors.primary} />
            </TouchableOpacity>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  baggageCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  baggageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  baggageId: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  flightNumber: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  baggageInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
