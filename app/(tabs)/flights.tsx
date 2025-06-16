// FlightsScreen.tsx

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiService, { Flight } from "../lib/apiService";

const cityList = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Antalya',
  'Paris',
  'Londra',
  'Roma',
  'Amsterdam',
  'Berlin',
  'Madrid',
];

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function getTodayISO() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function FlightsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [fromCity, setFromCity] = useState('İstanbul');
  const [toCity, setToCity] = useState('Londra');
  const [searchOpen, setSearchOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    apiService
      .searchFlights({
        from: fromCity,
        to: toCity,
        departureDate: date.toISOString().split('T')[0],
        isRoundTrip: false,
      })
      .then((data) => {
        setFlights(data);
      })
      .finally(() => setLoading(false));
    setSearchOpen(false);
  };

  // İlk açılışta otomatik arama
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDetails = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedFlight(null);
  };

  const handlePurchase = () => {
    setModalVisible(false);
    setPurchaseModalVisible(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalVisible(false);
    setSelectedFlight(null);
  };

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchOpen((prev) => !prev);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Uçuşlar
        </Text>
        <TouchableOpacity style={styles.filterButton} onPress={toggleSearch}>
          <IconSymbol
            name={searchOpen ? "chevron.up" : "chevron.down"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleSearch} activeOpacity={0.8}>
        <Text style={[styles.accordionTitle, { color: colors.primary }]}>Uçuş Ara / Filtreler</Text>
        <IconSymbol name={searchOpen ? "chevron.up" : "chevron.down"} size={20} color={colors.primary} />
      </TouchableOpacity>
      {searchOpen && (
        <View style={styles.searchContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={[styles.pickerLabel, { color: colors.text }]}>Nereden</Text>
            <Picker
              selectedValue={fromCity}
              onValueChange={setFromCity}
              style={styles.picker}
              dropdownIconColor={colors.primary}
            >
              {cityList.map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={[styles.pickerLabel, { color: colors.text }]}>Nereye</Text>
            <Picker
              selectedValue={toCity}
              onValueChange={setToCity}
              style={styles.picker}
              dropdownIconColor={colors.primary}
            >
              {cityList.map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={[styles.pickerLabel, { color: colors.text }]}>Tarih</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.8}
            >
              <IconSymbol name="calendar" size={18} color={colors.primary} />
              <Text style={[styles.dateButtonText, { color: colors.text }]}> {date.toLocaleDateString('tr-TR')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                minimumDate={new Date()}
              />
            )}
          </View>
          <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.primary }]} onPress={handleSearch}>
            <Text style={[styles.searchButtonText, { color: colors.buttonText }]}>Ara</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.flightsContainer}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : flights.length === 0 ? (
          <View style={styles.centered}>
            <Text style={{ color: colors.text }}>Uçuş bulunamadı.</Text>
          </View>
        ) : (
          <FlatList
            data={flights}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.flightCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.flightHeader}>
                  <View style={styles.airlineContainer}>
                    <Text style={[styles.airline, { color: colors.text }]}>
                      {item.airline}
                    </Text>
                    <Text style={[styles.flightNumber, { color: colors.text }]}>
                      {item.id}
                    </Text>
                  </View>
                  <View style={styles.routeContainer}>
                    <View style={styles.routeInfo}>
                      <Text style={[styles.airportText, { color: colors.text }]}>
                        {item.from}
                      </Text>
                    </View>
                    <View style={styles.routeLine}>
                      <View
                        style={[styles.line, { backgroundColor: colors.primary }]}
                      />
                      <IconSymbol
                        name="airplane"
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <View style={styles.routeInfo}>
                      <Text style={[styles.airportText, { color: colors.text }]}>
                        {item.to}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.flightFooter}>
                    <View style={styles.gateInfo}>
                      <IconSymbol
                        name="door.right.hand.open"
                        size={16}
                        color={colors.secondary}
                      />
                      <Text
                        style={[styles.gateText, { color: colors.secondary }]}
                      >
                        Fiyat: {item.price} {item.currency}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => openDetails(item)}>
                      <Text
                        style={[styles.detailsText, { color: colors.primary }]}
                      >
                        Detaylar
                      </Text>
                      <IconSymbol
                        name="chevron.right"
                        size={16}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {selectedFlight && (
              <>
                <View style={styles.modalHeader}>
                  <Text
                    style={[styles.modalTitle, { color: colors.text }]}
                  >
                    Uçuş Detayları
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeDetails}
                  >
                    <IconSymbol
                      name="xmark"
                      size={24}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Uçuş:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.airline} {selectedFlight.id}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Rota:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.from} - {selectedFlight.to}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Tarih:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.departureDate}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Saat:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.departureTime}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Kapı:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.id}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.text }]}>
                      Fiyat:
                    </Text>
                    <Text
                      style={[styles.detailValue, { color: colors.text }]}
                    >
                      {selectedFlight.price} {selectedFlight.currency}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[
                      styles.purchaseButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={handlePurchase}
                  >
                    <Text style={styles.purchaseButtonText}>
                      Bilet Satın Al
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={purchaseModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closePurchaseModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {selectedFlight && (
              <>
                <View style={styles.modalHeader}>
                  <Text
                    style={[styles.modalTitle, { color: colors.text }]}
                  >
                    Bilet Satın Al
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closePurchaseModal}
                  >
                    <IconSymbol
                      name="xmark"
                      size={24}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Text
                    style={[styles.purchaseText, { color: colors.text }]}
                  >
                    {selectedFlight.airline} {selectedFlight.id} uçuşu için bilet satın almak üzeresiniz.
                  </Text>
                  <Text
                    style={[styles.purchaseText, { color: colors.text }]}
                  >
                    Fiyat: {selectedFlight.price} {selectedFlight.currency}
                  </Text>
                </View>

                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[
                      styles.purchaseButton,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => {
                      closePurchaseModal();
                      router.push({
                        pathname: '/screens/payment',
                        params: {
                          flightId: selectedFlight.id,
                          airline: selectedFlight.airline,
                          from: selectedFlight.from,
                          to: selectedFlight.to,
                          date: selectedFlight.departureDate,
                          time: selectedFlight.departureTime,
                          gate: selectedFlight.id,
                          price: selectedFlight.price,
                          currency: selectedFlight.currency
                        }
                      });
                    }}
                  >
                    <Text style={styles.purchaseButtonText}>
                      Ödemeye Geç
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerWrapper: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  dateButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  searchButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  flightsContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flightCard: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  flightHeader: {
    padding: 16,
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  flightNumber: {
    fontSize: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeLine: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  line: {
    flex: 1,
    height: 2,
  },
  airportText: {
    fontSize: 16,
    fontWeight: '600',
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gateText: {
    marginLeft: 4,
    fontSize: 14,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  purchaseButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  purchaseText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
