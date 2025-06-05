// FlightsScreen.tsx

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiService, Flight } from "../lib/apiService";

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

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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
                  <View style={styles.flightInfo}>
                    <Text
                      style={[styles.flightNumber, { color: colors.primary }]}
                    >
                      {item.airline}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: colors.primary + "22" },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: colors.primary }]}
                      >
                        Planlandı
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.timeText, { color: colors.text }]}>
                    {item.departureTime}
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
            )}
          />
        )}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.primary }]}>Uçuş Detayları</Text>
            {selectedFlight && (
              <>
                <Text style={[styles.modalText, { color: colors.text }]}>Havayolu: {selectedFlight.airline}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>Kalkış: {selectedFlight.from} - {selectedFlight.departureDate} {selectedFlight.departureTime}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>Varış: {selectedFlight.to} - {selectedFlight.returnTime}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>Süre: {selectedFlight.duration.replace('PT', '').toLowerCase()}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>Fiyat: {selectedFlight.price} {selectedFlight.currency}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>Uçuş Kodu: {selectedFlight.id}</Text>
              </>
            )}
            <Pressable style={styles.closeButton} onPress={closeDetails}>
              <Text style={{ color: colors.buttonText, fontWeight: '600' }}>Kapat</Text>
            </Pressable>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  filterButton: {
    padding: 8,
  },
  flightsContainer: {
    padding: 16,
  },
  flightCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  flightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  flightInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  routeInfo: {
    flex: 1,
  },
  airportText: {
    fontSize: 16,
    fontWeight: "500",
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  line: {
    height: 2,
    width: 60,
  },
  flightFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 16,
  },
  gateInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  gateText: {
    fontSize: 14,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'flex-start',
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'stretch',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 16,
    margin: 16,
    marginBottom: 0,
    gap: 12,
  },
  pickerWrapper: {
    marginBottom: 8,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 44,
    marginBottom: 4,
  },
  searchButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 2,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
