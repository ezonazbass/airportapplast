import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BaggageInfo {
  tag: string;
  flightId: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengerName: string;
  status: string;
  lastUpdate: string;
}

export default function BaggageTrackingScreen() {
  const { colors } = useTheme();
  const [baggages, setBaggages] = useState<BaggageInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBaggages();
  }, []);

  const loadBaggages = async () => {
    try {
      const baggageJson = await AsyncStorage.getItem('baggageTracking');
      if (baggageJson) {
        const baggageData = JSON.parse(baggageJson);
        // Tüm bagajların durumunu "Teslim Edildi" olarak ayarla
        const updatedBaggageData = baggageData.map((baggage: BaggageInfo) => ({
          ...baggage,
          status: 'Teslim Edildi'
        }));
        setBaggages(updatedBaggageData);
      }
    } catch (error) {
      console.error('Bagaj bilgileri yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Bagaj bilgileri yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (baggages.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Ionicons name="airplane-outline" size={64} color={colors.text} />
          <Text style={[styles.emptyText, { color: colors.text }]}>Henüz bagajınız bulunmuyor</Text>
          <Text style={[styles.emptySubText, { color: colors.text }]}>
            Check-in yaptığınızda bagajlarınız burada görünecektir
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Bagaj Takip</Text>
        </View>

        {baggages.map((baggage, index) => (
          <View key={index} style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <View style={styles.airlineContainer}>
                <Text style={[styles.airline, { color: colors.text }]}>{baggage.airline}</Text>
                <Text style={[styles.flightNumber, { color: colors.text }]}>{baggage.flightId}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={[styles.status, { color: colors.text }]}>Teslim Edildi</Text>
              </View>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.route}>
                <Text style={[styles.city, { color: colors.text }]}>{baggage.from}</Text>
                <View style={styles.routeLine}>
                  <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
                  <View style={[styles.routeLineInner, { backgroundColor: colors.primary }]} />
                  <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
                </View>
                <Text style={[styles.city, { color: colors.text }]}>{baggage.to}</Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Yolcu:</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{baggage.passengerName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Bagaj Etiketi:</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{baggage.tag}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Tarih:</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{baggage.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Saat:</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{baggage.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.text }]}>Son Güncelleme:</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {new Date(baggage.lastUpdate).toLocaleString('tr-TR')}
                </Text>
              </View>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  flightNumber: {
    fontSize: 16,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  routeContainer: {
    marginBottom: 16,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 16,
    fontWeight: '600',
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeLineInner: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
});
