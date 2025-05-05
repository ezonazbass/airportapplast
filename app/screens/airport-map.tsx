import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function AirportMapScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  const locations = [
    {
      id: 'checkin',
      name: 'Check-in Kontuarları',
      description: 'Tüm havayolları check-in işlemleri burada yapılmaktadır.',
      type: 'checkin',
      position: { x: width * 0.3, y: height * 0.2 },
    },
    {
      id: 'security',
      name: 'Güvenlik Kontrolü',
      description: 'Yolcu ve bagaj güvenlik kontrolleri.',
      type: 'security',
      position: { x: width * 0.5, y: height * 0.3 },
    },
    {
      id: 'gates',
      name: 'Uçuş Kapıları',
      description: 'A1-A20 kapıları.',
      type: 'gate',
      position: { x: width * 0.7, y: height * 0.4 },
    },
    {
      id: 'lounge',
      name: 'VIP Lounge',
      description: 'Business ve First Class yolcular için özel lounge.',
      type: 'lounge',
      position: { x: width * 0.4, y: height * 0.5 },
    },
    {
      id: 'shops',
      name: 'Alışveriş Alanı',
      description: 'Duty-free ve diğer mağazalar.',
      type: 'shop',
      position: { x: width * 0.6, y: height * 0.6 },
    },
    {
      id: 'restaurant',
      name: 'Restoranlar',
      description: 'Kafeler ve restoranlar.',
      type: 'restaurant',
      position: { x: width * 0.25, y: height * 0.45 },
    },
    {
      id: 'parking',
      name: 'Otopark',
      description: 'Araçlar için otopark alanı.',
      type: 'parking',
      position: { x: width * 0.1, y: height * 0.7 },
    },
    {
      id: 'toilet',
      name: 'Tuvaletler',
      description: 'Bay/Bayan/Engelli tuvaletleri.',
      type: 'toilet',
      position: { x: width * 0.8, y: height * 0.2 },
    },
    {
      id: 'info',
      name: 'Bilgi Noktası',
      description: 'Yardım ve danışma noktası.',
      type: 'info',
      position: { x: width * 0.55, y: height * 0.15 },
    },
    {
      id: 'atm',
      name: 'ATM / Banka',
      description: 'Banka ve ATM hizmetleri.',
      type: 'atm',
      position: { x: width * 0.15, y: height * 0.35 },
    },
    {
      id: 'wifi',
      name: 'Wi-Fi Noktası',
      description: 'Ücretsiz Wi-Fi erişim noktası.',
      type: 'wifi',
      position: { x: width * 0.85, y: height * 0.55 },
    },
    {
      id: 'taxi',
      name: 'Taksi / Ulaşım',
      description: 'Taksi ve toplu taşıma noktası.',
      type: 'taxi',
      position: { x: width * 0.9, y: height * 0.75 },
    },
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'checkin':
        return 'person.badge.key.fill';
      case 'security':
        return 'shield.fill';
      case 'gate':
        return 'airplane';
      case 'lounge':
        return 'crown.fill';
      case 'shop':
        return 'bag.fill';
      case 'restaurant':
        return 'fork.knife';
      case 'parking':
        return 'car.fill';
      case 'toilet':
        return 'figure.stand.line.dotted.figure.stand';
      case 'info':
        return 'info.circle.fill';
      case 'atm':
        return 'creditcard.fill';
      case 'wifi':
        return 'wifi';
      case 'taxi':
        return 'car.fill';
      default:
        return 'mappin.circle.fill';
    }
  };

  React.useEffect(() => {
    navigation.setOptions?.({ title: 'Havalimanı Haritası' });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.mapContainer}>
          <View style={[styles.map, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.locationMarker,
                  {
                    left: location.position.x,
                    top: location.position.y,
                    backgroundColor: colors.primary + '20',
                  },
                ]}
                onPress={() => setSelectedLocation(location)}
              >
                <IconSymbol
                  name={getLocationIcon(location.type)}
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.legendContainer}>
          <Text style={[styles.legendTitle, { color: colors.primary }]}>Harita Göstergeleri</Text>
          <View style={styles.legendItems}>
            {locations.map((location) => (
              <View key={location.id} style={styles.legendItem}>
                <View style={[styles.legendIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol
                    name={getLocationIcon(location.type)}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.legendText, { color: colors.text }]}>{location.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedLocation}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedLocation(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.modalIcon, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol
                name={selectedLocation ? getLocationIcon(selectedLocation.type) : 'mappin.circle.fill'}
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.modalTitle, { color: colors.primary }]}>
              {selectedLocation?.name}
            </Text>
            <Text style={[styles.modalDescription, { color: colors.text }]}>
              {selectedLocation?.description}
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => setSelectedLocation(null)}
            >
              <Text style={styles.modalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    padding: 16,
  },
  map: {
    width: '100%',
    height: 500,
    borderRadius: 20,
    borderWidth: 1,
    position: 'relative',
  },
  locationMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  legendContainer: {
    padding: 16,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 