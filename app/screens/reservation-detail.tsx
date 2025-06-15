import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

interface Reservation {
  id: string;
  type: 'lounge';
  name: string;
  terminal: string;
  date: string;
  price: string;
  status: 'active' | 'completed' | 'cancelled';
}

export default function ReservationDetailScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const params = useLocalSearchParams();
  const reservation = JSON.parse(params.reservation as string);

  const handleCancel = async () => {
    Alert.alert(
      'Rezervasyon İptali',
      'Rezervasyonunuzu iptal etmek istediğinize emin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel'
        },
        {
          text: 'İptal Et',
          style: 'destructive',
          onPress: async () => {
            try {
              // Rezervasyonu sil
              const savedReservations = await AsyncStorage.getItem('reservations');
              if (savedReservations) {
                const reservations = JSON.parse(savedReservations);
                const updatedReservations = reservations.filter((r: Reservation) => r.id !== reservation.id);
                await AsyncStorage.setItem('reservations', JSON.stringify(updatedReservations));

                Alert.alert(
                  'İptal Başarılı',
                  'Rezervasyonunuz iptal edildi. Paranız 1-3 iş günü içerisinde hesabınıza geri gönderilecektir.',
                  [
                    {
                      text: 'Tamam',
                      onPress: () => router.push('/(tabs)/account')
                    }
                  ]
                );
              }
            } catch (error) {
              Alert.alert('Hata', 'Rezervasyon iptal edilirken bir hata oluştu.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Rezervasyon Detayları</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statusBadge, { backgroundColor: colors.primary + '22' }]}>
            <Text style={[styles.statusText, { color: colors.primary }]}>
              {reservation.status === 'active' ? 'Aktif' : 
               reservation.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
            </Text>
          </View>
        </View>

        <View style={[styles.detailsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Rezervasyon Bilgileri</Text>
          
          <View style={styles.detailRow}>
            <IconSymbol name="building.2.fill" size={20} color={colors.secondary} />
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.secondary }]}>Lounge</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{reservation.name}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="airplane" size={20} color={colors.secondary} />
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.secondary }]}>Terminal</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{reservation.terminal}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="calendar" size={20} color={colors.secondary} />
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.secondary }]}>Rezervasyon Tarihi</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{reservation.date}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="creditcard.fill" size={20} color={colors.secondary} />
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.secondary }]}>Ödenen Tutar</Text>
              <Text style={[styles.detailValue, { color: colors.primary }]}>{reservation.price}</Text>
            </View>
          </View>
        </View>

        {reservation.status === 'active' && (
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: '#F44336' }]}
            onPress={handleCancel}
          >
            <Text style={[styles.cancelButtonText, { color: '#FFFFFF' }]}>Rezervasyonu İptal Et</Text>
          </TouchableOpacity>
        )}
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
  statusCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailInfo: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 