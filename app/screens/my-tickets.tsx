import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

interface Ticket {
  id: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  status: string;
  gate: string;
  price: string;
  currency: string;
  purchaseDate: string;
}

interface CheckinInfo {
  flightId: string;
  checkinDate: string;
  passengerInfo: {
    firstName: string;
    lastName: string;
    passportNumber: string;
    seatNumber: string;
    baggageCount: number;
  };
}

export default function MyTicketsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [checkins, setCheckins] = useState<CheckinInfo[]>([]);

  useEffect(() => {
    loadTickets();
    loadCheckins();
  }, []);

  const loadTickets = async () => {
    try {
      const ticketsJson = await AsyncStorage.getItem('tickets');
      if (ticketsJson) {
        const loadedTickets = JSON.parse(ticketsJson);
        setTickets(loadedTickets);
      }
    } catch (error) {
      console.error('Biletler yüklenirken hata oluştu:', error);
    }
  };

  const loadCheckins = async () => {
    try {
      const checkinsJson = await AsyncStorage.getItem('checkins');
      if (checkinsJson) {
        const loadedCheckins = JSON.parse(checkinsJson);
        setCheckins(loadedCheckins);
      }
    } catch (error) {
      console.error('Check-in bilgileri yüklenirken hata oluştu:', error);
    }
  };

  const isCheckedIn = (ticketId: string) => {
    return checkins.some(checkin => checkin.flightId === ticketId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Biletlerim</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {tickets.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="ticket" size={48} color={colors.secondary} />
            <Text style={[styles.emptyStateText, { color: colors.secondary }]}>
              Henüz biletiniz bulunmuyor
            </Text>
          </View>
        ) : (
          tickets.map((ticket) => (
            <View
              key={ticket.id}
              style={[styles.ticketCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.ticketHeader}>
                <View style={styles.flightInfo}>
                  <Text style={[styles.flightNumber, { color: colors.primary }]}>{ticket.airline} {ticket.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.primary + '22' }]}>
                    <Text style={[styles.statusText, { color: colors.primary }]}>{ticket.status}</Text>
                  </View>
                </View>
                <Text style={[styles.gateText, { color: colors.text }]}>Kapı {ticket.gate}</Text>
              </View>

              <View style={styles.routeInfo}>
                <View style={styles.routeItem}>
                  <Text style={[styles.timeText, { color: colors.text }]}>{ticket.time}</Text>
                  <Text style={[styles.airportText, { color: colors.text }]}>{ticket.from}</Text>
                </View>

                <View style={styles.routeLine}>
                  <View style={[styles.line, { backgroundColor: colors.border }]} />
                  <IconSymbol name="airplane" size={20} color={colors.primary} />
                </View>

                <View style={styles.routeItem}>
                  <Text style={[styles.timeText, { color: colors.text }]}>{ticket.time}</Text>
                  <Text style={[styles.airportText, { color: colors.text }]}>{ticket.to}</Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.ticketFooter}>
                <Text style={[styles.dateText, { color: colors.secondary }]}>{ticket.date}</Text>
                <Text style={[styles.priceText, { color: colors.primary }]}>
                  {ticket.price} {ticket.currency}
                </Text>
              </View>

              {isCheckedIn(ticket.id) ? (
                <View style={[styles.checkinStatus, { backgroundColor: colors.primary + '22' }]}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                  <Text style={[styles.checkinStatusText, { color: colors.primary }]}>Check-in Yapıldı</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[styles.checkInButton, { backgroundColor: colors.primary }]}
                  onPress={() => router.push({
                    pathname: '/screens/checkin',
                    params: {
                      flightId: ticket.id,
                      airline: ticket.airline,
                      from: ticket.from,
                      to: ticket.to,
                      date: ticket.date,
                      time: ticket.time,
                      gate: ticket.gate
                    }
                  })}
                >
                  <Text style={styles.checkInButtonText}>Online Check-in</Text>
                </TouchableOpacity>
              )}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
    minHeight: '100%',
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
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeItem: {
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
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 16,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  checkInButton: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  checkInButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  checkinStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  checkinStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
