import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

type ReservationStatus = 'active' | 'completed' | 'cancelled';

interface Reservation {
  id: string;
  loungeName: string;
  terminal: string;
  price: string;
  date: string;
  status: ReservationStatus;
}

interface RouteParams {
  name?: string;
  terminal?: string;
  price?: string;
}

export default function PaymentScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const params = useLocalSearchParams<RouteParams>();

  const handlePayment = async () => {
    try {
      // Mevcut rezervasyonları al
      const existingReservationsJson = await AsyncStorage.getItem('reservations');
      const existingReservations: Reservation[] = existingReservationsJson 
        ? JSON.parse(existingReservationsJson) 
        : [];

      // Yeni rezervasyon oluştur
      const newReservation: Reservation = {
        id: Date.now().toString(),
        loungeName: params.name || 'VIP Lounge',
        terminal: params.terminal || 'Terminal 1',
        price: params.price || '₺750',
        date: new Date().toISOString(),
        status: 'active'
      };

      // Yeni rezervasyonu listeye ekle
      const updatedReservations = [...existingReservations, newReservation];

      // Güncellenmiş listeyi kaydet
      await AsyncStorage.setItem('reservations', JSON.stringify(updatedReservations));

      Alert.alert(
        'Başarılı',
        'Rezervasyonunuz başarıyla tamamlandı.',
        [
          {
            text: 'Tamam',
            onPress: () => {
              router.push('/(tabs)/account');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Rezervasyon kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Rezervasyon kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Ödeme</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Rezervasyon Özeti</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.text }]}>Lounge</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>{params.name || 'VIP Lounge'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.text }]}>Terminal</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>{params.terminal || 'Terminal 1'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.text }]}>Tutar</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>{params.price || '₺750'}</Text>
          </View>
        </View>

        <View style={[styles.paymentCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ödeme Yöntemi</Text>
          <TouchableOpacity
            style={[styles.cardItem, { borderColor: colors.primary }]}
            onPress={() => router.push('/screens/payment-methods')}
          >
            <View style={styles.cardInfo}>
              <IconSymbol name="creditcard.fill" size={24} color={colors.primary} />
              <View style={styles.cardDetails}>
                <Text style={[styles.cardNumber, { color: colors.text }]}>
                  **** **** **** 1234
                </Text>
                <Text style={[styles.cardName, { color: colors.text }]}>JOHN DOE</Text>
              </View>
            </View>
            <View style={[styles.defaultBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.defaultBadgeText}>Varsayılan</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addCardButton, { borderColor: colors.primary }]}
            onPress={() => router.push('/screens/payment-methods')}
          >
            <IconSymbol name="plus.circle.fill" size={24} color={colors.primary} />
            <Text style={[styles.addCardText, { color: colors.primary }]}>Yeni Kart Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          onPress={handlePayment}
        >
          <Text style={[styles.payButtonText, { color: '#FFFFFF' }]}>Ödemeyi Tamamla</Text>
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
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 12,

  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardName: {
    fontSize: 14,
    marginTop: 4,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  payButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 