import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function VipLoungeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const lounges = [
    {
      id: '1',
      name: 'Turkish Airlines Lounge',
      location: 'İstanbul Havalimanı',
      terminal: 'Terminal 1',
      status: 'Aktif',
      price: '₺750',
      features: ['Açık Büfe', 'İş Odası', 'Duş Odası', 'Çocuk Oyun Alanı']
    },
    {
      id: '2',
      name: 'Turkish Airlines Lounge',
      location: 'İstanbul Havalimanı',
      terminal: 'Terminal 2',
      status: 'Aktif',
      price: '₺850',
      features: ['Premium Bar', 'Masaj Odası', 'Uyku Odası', 'Spa Hizmeti']
    },
    {
      id: '3',
      name: 'Turkish Airlines Lounge',
      location: 'İstanbul Havalimanı',
      terminal: 'Terminal 3',
      status: 'Aktif',
      price: '₺950',
      features: ['Gourmet Restoran', 'Sinema Odası', 'Fitness Merkezi', 'Özel Toplantı Odaları']
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>VIP Lounge</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {lounges.map((lounge) => (
          <View
            key={lounge.id}
            style={[styles.loungeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.loungeHeader}>
              <View style={styles.loungeInfo}>
                <Text style={[styles.loungeName, { color: colors.text }]}>{lounge.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.primary + '22' }]}>
                  <Text style={[styles.statusText, { color: colors.primary }]}>{lounge.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.loungeDetails}>
              <View style={styles.detailRow}>
                <IconSymbol name="location.fill" size={20} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.text }]}>{lounge.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <IconSymbol name="airplane" size={20} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.text }]}>{lounge.terminal}</Text>
              </View>
              <View style={styles.detailRow}>
                <IconSymbol name="creditcard.fill" size={20} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.text }]}>{lounge.price}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={() => router.push({
                pathname: '/screens/vip-lounge-detail',
                params: { lounge: JSON.stringify(lounge) }
              })}
            >
              <Text style={[styles.viewDetailsText, { color: colors.primary }]}>Detayları Gör</Text>
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
  content: {
    padding: 16,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  loungeInfo: {
    flex: 1,
  },
  loungeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loungeDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
    marginTop: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
  }
}); 