import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SFSymbols6_0 } from 'sf-symbols-typescript';

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const quickActions = [
    { title: 'Online Check-in', icon: 'ticket.fill' as SFSymbols6_0, color: '#E91E63', onPress: () => router.push('/screens/checkin') },
    { title: 'Uçuş Durumu', icon: 'airplane' as SFSymbols6_0, color: colors.primary, onPress: () => router.push('/screens/flight-status') },
    { title: 'Bagaj Takip', icon: 'suitcase.fill' as SFSymbols6_0, color: colors.secondary, onPress: () => router.push('/screens/baggage-tracking') },
    { title: 'Harita', icon: 'globe' as SFSymbols6_0, color: '#1976D2', onPress: () => router.push('/screens/airport-map') },
  ];

  const flightStatus = {
    flightNumber: 'TK123',
    destination: 'İstanbul (IST)',
    status: 'Zamanında',
    gate: 'A12',
    time: '14:30',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Dummy airport image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80' }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.header, { backgroundColor: colors.card }]}> 
          <View style={styles.headerContent}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>Hoş Geldiniz</Text>
            <TouchableOpacity 
              onPress={() => router.push('/screens/auth')}
              style={styles.profileButton}
            >
              <IconSymbol name="person.fill" size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { backgroundColor: colors.card, shadowColor: action.color + '33' }]}
              activeOpacity={0.85}
              onPress={action.onPress}
            >
              <View style={[styles.quickActionIconCircle, { backgroundColor: action.color + '22' }]}> 
                <IconSymbol name={action.icon} size={32} color={action.color} />
              </View>
              <Text style={[styles.quickActionText, { color: colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Flight Status */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Uçuş Durumu</Text>
          <View style={styles.statusCardContent}>
            <View style={styles.statusHeader}>
              <Text style={[styles.flightNumber, { color: colors.primary }]}>{flightStatus.flightNumber}</Text>
              <Text style={[styles.status, { color: '#4CAF50' }]}>{flightStatus.status}</Text>
            </View>
            <Text style={[styles.destination, { color: colors.text }]}>{flightStatus.destination}</Text>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <IconSymbol name="clock.fill" size={16} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.secondary }]}>{flightStatus.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <IconSymbol name="door.right.hand.open" size={16} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.secondary }]}>Kapı {flightStatus.gate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Airport Services */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Havalimanı Hizmetleri</Text>
          <View style={styles.servicesGridSquare}>
            <TouchableOpacity style={[styles.serviceCardSquare, { backgroundColor: colors.card, borderColor: colors.primary + '22' }]}
              activeOpacity={0.85}>
              <View style={[styles.serviceIconCircleSquare, { backgroundColor: colors.primary + '18' }]}> 
                <IconSymbol name="fork.knife" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTextSquare, { color: colors.text }]}>Restoranlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.serviceCardSquare, { backgroundColor: colors.card, borderColor: colors.primary + '22' }]}
              activeOpacity={0.85}>
              <View style={[styles.serviceIconCircleSquare, { backgroundColor: colors.primary + '18' }]}> 
                <IconSymbol name="cart.fill" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTextSquare, { color: colors.text }]}>Alışveriş</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.serviceCardSquare, { backgroundColor: colors.card, borderColor: colors.primary + '22' }]}
              activeOpacity={0.85}>
              <View style={[styles.serviceIconCircleSquare, { backgroundColor: colors.primary + '18' }]}> 
                <IconSymbol name="bed.double.fill" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTextSquare, { color: colors.text }]}>Otel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.serviceCardSquare, { backgroundColor: colors.card, borderColor: colors.primary + '22' }]}
              activeOpacity={0.85}>
              <View style={[styles.serviceIconCircleSquare, { backgroundColor: colors.primary + '18' }]}> 
                <IconSymbol name="wifi" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTextSquare, { color: colors.text }]}>Wi-Fi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#E3E6F5',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: -32,
    shadowColor: '#1A237E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginHorizontal: 16,
    marginBottom: 18,
  },
  quickActionCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 28,
    borderRadius: 22,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  quickActionIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A237E',
  },
  sectionCard: {
    borderRadius: 22,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#1A237E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  statusCardContent: {
    gap: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  destination: {
    fontSize: 16,
    marginTop: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  servicesGridSquare: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    marginTop: 8,
    marginHorizontal: 2,
  },
  serviceCardSquare: {
    width: '47%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1.5,
    marginBottom: 12,
    shadowColor: '#1A237E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  serviceIconCircleSquare: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#E3E6F5',
  },
  serviceTextSquare: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  profileButton: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
  },
}); 