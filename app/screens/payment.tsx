import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const params = useLocalSearchParams();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    try {
      // Yeni bilet oluştur
      const newTicket = {
        id: params.flightId as string,
        airline: params.airline as string,
        from: params.from as string,
        to: params.to as string,
        date: params.date as string,
        time: params.time as string,
        status: 'Onaylandı',
        gate: 'A' + Math.floor(Math.random() * 10),
        price: params.price as string,
        currency: params.currency as string,
        purchaseDate: new Date().toISOString()
      };

      // Mevcut biletleri al
      const existingTicketsJson = await AsyncStorage.getItem('tickets');
      const existingTickets = existingTicketsJson ? JSON.parse(existingTicketsJson) : [];
      
      // Yeni bileti ekle
      const updatedTickets = [...existingTickets, newTicket];
      
      // Biletleri kaydet
      await AsyncStorage.setItem('tickets', JSON.stringify(updatedTickets));

      // Biletlerim sayfasına yönlendir
      router.push('/screens/my-tickets');
    } catch (error) {
      console.error('Bilet kaydedilirken hata oluştu:', error);
      // Hata durumunda da yönlendirme yap
      router.push('/screens/my-tickets');
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
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Kart Bilgileri</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Kart Numarası</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colors.secondary}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Kart Sahibi</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Ad Soyad"
              placeholderTextColor={colors.secondary}
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.label, { color: colors.text }]}>Son Kullanma Tarihi</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                placeholder="MM/YY"
                placeholderTextColor={colors.secondary}
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.label, { color: colors.text }]}>CVV</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                placeholder="123"
                placeholderTextColor={colors.secondary}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>Ödeme Özeti</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.text }]}>Toplam Tutar</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>{params.price} {params.currency}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
        </TouchableOpacity>
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
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  summaryCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  payButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 