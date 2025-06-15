import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function FlightHistoryScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const flightHistory = [
    {
      id: 'TK789',
      from: 'İstanbul',
      fromCode: 'IST',
      to: 'Paris',
      toCode: 'CDG',
      date: '1 Mart 2024',
      time: '10:15',
      status: 'Tamamlandı',
      ticketNo: 'TK789-123456',
      passenger: 'Ahmet Yılmaz',
      seat: '15A',
      baggage: '23 kg'
    },
    {
      id: 'TK456',
      from: 'Paris',
      fromCode: 'CDG',
      to: 'İstanbul',
      toCode: 'IST',
      date: '8 Mart 2024',
      time: '13:30',
      status: 'Tamamlandı',
      ticketNo: 'TK456-789012',
      passenger: 'Ahmet Yılmaz',
      seat: '22B',
      baggage: '20 kg'
    },
    {
      id: 'TK123',
      from: 'İstanbul',
      fromCode: 'IST',
      to: 'Roma',
      toCode: 'FCO',
      date: '15 Şubat 2024',
      time: '09:45',
      status: 'Tamamlandı',
      ticketNo: 'TK123-345678',
      passenger: 'Ahmet Yılmaz',
      seat: '08C',
      baggage: '25 kg'
    },
  ];

  const handleFlightDetail = (flight: any) => {
    router.push({
      pathname: '/screens/flight-detail',
      params: flight
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Geçmiş Uçuşlar</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.historyContainer}>
        {flightHistory.map((flight) => (
          <View
            key={flight.id}
            style={[styles.flightCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.flightHeader}>
              <View style={styles.flightInfo}>
                <Text style={[styles.flightNumber, { color: colors.primary }]}>{flight.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.primary + '22' }]}>
                  <Text style={[styles.statusText, { color: colors.primary }]}>{flight.status}</Text>
                </View>
              </View>
              <Text style={[styles.dateText, { color: colors.secondary }]}>{flight.date}</Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeInfo}>
                <Text style={[styles.cityCode, { color: colors.primary }]}>{flight.fromCode}</Text>
                <Text style={[styles.cityName, { color: colors.text }]}>{flight.from}</Text>
              </View>

              <View style={styles.routeLine}>
                <View style={[styles.line, { backgroundColor: colors.primary }]} />
                <IconSymbol name="airplane" size={20} color={colors.primary} />
              </View>

              <View style={styles.routeInfo}>
                <Text style={[styles.cityCode, { color: colors.primary }]}>{flight.toCode}</Text>
                <Text style={[styles.cityName, { color: colors.text }]}>{flight.to}</Text>
              </View>
            </View>

            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { color: colors.text }]}>Kalkış: {flight.time}</Text>
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={() => handleFlightDetail(flight)}
            >
              <Text style={[styles.viewDetailsText, { color: colors.primary }]}>Uçuş Detayları</Text>
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
  historyContainer: {
    padding: 16,
  },
  flightCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  flightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeInfo: {
    alignItems: 'center',
  },
  cityCode: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cityName: {
    fontSize: 14,
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 2,
    marginRight: 8,
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeText: {
    fontSize: 14,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
}); 
 