import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export default function MyReservationsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const savedReservations = await AsyncStorage.getItem('reservations');
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }
    } catch (error) {
      console.error('Rezervasyonlar yüklenirken hata oluştu:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return colors.text;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'completed':
        return 'Tamamlandı';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Rezervasyonlarım</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {reservations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <IconSymbol name="calendar.badge.clock" size={48} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              Henüz rezervasyonunuz bulunmuyor
            </Text>
          </View>
        ) : (
          reservations.map((reservation) => (
            <View
              key={reservation.id}
              style={[styles.reservationCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.reservationHeader}>
                <View style={styles.reservationInfo}>
                  <Text style={[styles.reservationName, { color: colors.text }]}>
                    {reservation.name}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reservation.status) + '22' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(reservation.status) }]}>
                      {getStatusText(reservation.status)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.reservationDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="calendar" size={16} color={colors.secondary} />
                  <Text style={[styles.detailText, { color: colors.text }]}>{reservation.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="airplane" size={16} color={colors.secondary} />
                  <Text style={[styles.detailText, { color: colors.text }]}>{reservation.terminal}</Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="creditcard.fill" size={16} color={colors.secondary} />
                  <Text style={[styles.detailText, { color: colors.primary }]}>{reservation.price}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.detailButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push({
                  pathname: '/screens/reservation-detail',
                  params: { reservation: JSON.stringify(reservation) }
                })}
              >
                <Text style={[styles.detailButtonText, { color: '#FFFFFF' }]}>Detayları Gör</Text>
              </TouchableOpacity>
            </View>
          ))
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  reservationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reservationInfo: {
    flex: 1,
  },
  reservationName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reservationDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  detailButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 