import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function TicketsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const tickets = [
    {
      id: 'TK789',
      from: 'İstanbul (IST)',
      to: 'Paris (CDG)',
      date: '1 Mart 2024',
      time: '10:15',
      status: 'Aktif',
    },
    {
      id: 'TK456',
      from: 'Paris (CDG)',
      to: 'İstanbul (IST)',
      date: '8 Mart 2024',
      time: '13:30',
      status: 'Aktif',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Biletlerim</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.ticketsContainer}>
        {tickets.map((ticket) => (
          <View
            key={ticket.id}
            style={[styles.ticketCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.ticketHeader}>
              <View style={styles.ticketInfo}>
                <Text style={[styles.ticketNumber, { color: colors.primary }]}>{ticket.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.primary + '22' }]}>
                  <Text style={[styles.statusText, { color: colors.primary }]}>{ticket.status}</Text>
                </View>
              </View>
              <Text style={[styles.dateText, { color: colors.secondary }]}>{ticket.date}</Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeInfo}>
                <Text style={[styles.timeText, { color: colors.text }]}>{ticket.time}</Text>
                <Text style={[styles.airportText, { color: colors.text }]}>{ticket.from}</Text>
              </View>

              <View style={styles.routeLine}>
                <View style={[styles.line, { backgroundColor: colors.primary }]} />
                <IconSymbol name="airplane" size={20} color={colors.primary} />
              </View>

              <View style={styles.routeInfo}>
                <Text style={[styles.timeText, { color: colors.text }]}>{ticket.time}</Text>
                <Text style={[styles.airportText, { color: colors.text }]}>{ticket.to}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={[styles.viewDetailsText, { color: colors.primary }]}>Bilet Detayları</Text>
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
  ticketsContainer: {
    padding: 16,
  },
  ticketCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketNumber: {
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
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  airportText: {
    fontSize: 14,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  line: {
    height: 2,
    width: 60,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 