import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function FlightDetailScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Uçuş Detayları</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.flightCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.routeHeader}>
            <View style={styles.cityBox}>
              <Text style={[styles.cityCode, { color: colors.primary }]}>{params.fromCode}</Text>
              <Text style={[styles.cityName, { color: colors.text }]}>{params.from}</Text>
            </View>
            <View style={styles.flightLine}>
              <View style={[styles.line, { backgroundColor: colors.primary }]} />
              <IconSymbol name="airplane" size={24} color={colors.primary} />
            </View>
            <View style={styles.cityBox}>
              <Text style={[styles.cityCode, { color: colors.primary }]}>{params.toCode}</Text>
              <Text style={[styles.cityName, { color: colors.text }]}>{params.to}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Uçuş Tarihi:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Kalkış Saati:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Uçuş No:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Bilet No:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.ticketNo}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Yolcu:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.passenger}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Koltuk No:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.seat}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.text }]}>Bagaj:</Text>
              <Text style={[styles.detailValue, { color: colors.secondary }]}>{params.baggage}</Text>
            </View>
          </View>
        </View>
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
  content: {
    padding: 16,
  },
  flightCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cityBox: {
    alignItems: 'center',
  },
  cityCode: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cityName: {
    fontSize: 16,
  },
  flightLine: {
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
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
  },
}); 