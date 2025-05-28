import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { apiService, Flight, FlightSearchParams } from '../../services/api';

export default function FlightsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [showCityModal, setShowCityModal] = useState(false);
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);
  
  // Şu anki yılı 2025 olarak ayarla ve tarihleri buna göre ayarla
  const currentYear = 2025;
  const defaultDepartureDate = new Date(currentYear, 4, 15); // 15 Mayıs 2025
  const defaultReturnDate = new Date(currentYear, 4, 22); // 22 Mayıs 2025
  
  const [departureDate, setDepartureDate] = useState(defaultDepartureDate);
  const [returnDate, setReturnDate] = useState(defaultReturnDate);
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [citySearchText, setCitySearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Şehirleri yükle
  useEffect(() => {
    loadCities();
  }, []);

  // City search filter
  useEffect(() => {
    if (cities.length > 0) {
      if (citySearchText.trim() === '') {
        setFilteredCities(cities);
      } else {
        const searchTextLower = citySearchText.toLowerCase();
        const filtered = cities.filter(city => 
          city.toLowerCase().startsWith(searchTextLower)
        );
        setFilteredCities(filtered);
      }
    }
  }, [citySearchText, cities]);

  // Başlangıçta demo uçuşları göster
  useEffect(() => {
    loadInitialFlights();
  }, []);

  const loadCities = async () => {
    try {
      const citiesList = await apiService.getCities();
      setCities(citiesList);
      setFilteredCities(citiesList);
    } catch (error) {
      console.error('Şehirler yüklenirken hata oluştu:', error);
    }
  };

  const loadInitialFlights = async () => {
    setLoading(true);
    try {
      // Varsayılan parametrelerle uçuş araması yap
      const params: FlightSearchParams = {
        from: 'İstanbul',
        to: 'Ankara',
        departureDate: formatAPIDate(departureDate),
        isRoundTrip: true,
        returnDate: formatAPIDate(returnDate)
      };
      const allFlights = await apiService.searchFlights(params);
      setFlights(allFlights);
    } catch (error) {
      console.error('Uçuşlar yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: string) => {
    if (activeInput === 'from') {
      setFromCity(city);
    } else if (activeInput === 'to') {
      setToCity(city);
    }
    setShowCityModal(false);
    setCitySearchText(''); // Reset search when closing modal
  };

  const handleDepartureDateChange = (event: any, selectedDate?: Date) => {
    setShowDepartureDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleReturnDateChange = (event: any, selectedDate?: Date) => {
    setShowReturnDatePicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatAPIDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: offsetY, animated: false });
    }
  };

  const searchFlights = async () => {
    if (!fromCity || !toCity) {
      alert('Lütfen nereden ve nereye gideceğinizi seçin');
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    try {
      const params: FlightSearchParams = {
        from: fromCity,
        to: toCity,
        departureDate: formatAPIDate(departureDate),
        isRoundTrip: isRoundTrip
      };

      if (isRoundTrip) {
        params.returnDate = formatAPIDate(returnDate);
      }

      const results = await apiService.searchFlights(params);
      setFlights(results);
      
      if (results.length === 0) {
        alert('Aradığınız kriterlere uygun uçuş bulunamadı');
      }
    } catch (error) {
      console.error('Uçuş arama hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // When opening city modal, reset search
  const openCityModal = (inputType: 'from' | 'to') => {
    setActiveInput(inputType);
    setCitySearchText('');
    setShowCityModal(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Uçuşlarım</Text>
        
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Uçuş ara..."
            placeholderTextColor={colors.text + '80'}
          />
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.tripTypeButton, 
                { backgroundColor: colors.card },
                !isRoundTrip && { backgroundColor: colors.primary + '22' }
              ]}
              onPress={() => setIsRoundTrip(false)}
            >
              <Text style={[
                styles.tripTypeText, 
                { color: colors.text },
                !isRoundTrip && { color: colors.primary, fontWeight: '600' }
              ]}>Tek Yön</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tripTypeButton, 
                { backgroundColor: colors.card },
                isRoundTrip && { backgroundColor: colors.primary + '22' }
              ]}
              onPress={() => setIsRoundTrip(true)}
            >
              <Text style={[
                styles.tripTypeText, 
                { color: colors.text },
                isRoundTrip && { color: colors.primary, fontWeight: '600' }
              ]}>Gidiş-Dönüş</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={[styles.filterInput, { backgroundColor: colors.card }]}
              onPress={() => openCityModal('from')}
            >
              <IconSymbol name="airplane.departure" size={14} color={colors.text} />
              <Text style={[styles.filterTextInput, { color: colors.text }]}>
                {fromCity || 'Nereden'}
              </Text>
            </TouchableOpacity>
            <IconSymbol name="arrow.triangle.2.circlepath" size={14} color={colors.text} style={styles.arrowIcon} />
            <TouchableOpacity 
              style={[styles.filterInput, { backgroundColor: colors.card }]}
              onPress={() => openCityModal('to')}
            >
              <IconSymbol name="airplane.arrival" size={14} color={colors.text} />
              <Text style={[styles.filterTextInput, { color: colors.text }]}>
                {toCity || 'Nereye'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateButtonsContainer}>
            <TouchableOpacity 
              style={[styles.dateButton, { backgroundColor: colors.card }]}
              onPress={() => setShowDepartureDatePicker(true)}
            >
              <IconSymbol name="calendar" size={14} color={colors.text} />
              <Text style={[styles.dateButtonText, { color: colors.text }]}>
                Gidiş: {formatDate(departureDate)}
              </Text>
            </TouchableOpacity>

            {isRoundTrip && (
              <TouchableOpacity 
                style={[styles.dateButton, { backgroundColor: colors.card }]}
                onPress={() => setShowReturnDatePicker(true)}
              >
                <IconSymbol name="calendar" size={14} color={colors.text} />
                <Text style={[styles.dateButtonText, { color: colors.text }]}>
                  Dönüş: {formatDate(returnDate)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: colors.primary }]}
            onPress={searchFlights}
          >
            <Text style={styles.searchButtonText}>Uçuş Ara</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.text }]}>Uçuşlar aranıyor...</Text>
          </View>
        ) : flights.length === 0 && searchPerformed ? (
          <View style={styles.emptyResultsContainer}>
            <IconSymbol name="airplane.circle" size={64} color={colors.text + '50'} />
            <Text style={[styles.emptyResultsText, { color: colors.text }]}>Aradığınız kriterlere uygun uçuş bulunamadı</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={flights}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.flightCard, { backgroundColor: colors.card }]}>
                <View style={styles.flightHeader}>
                  <Text style={[styles.flightNo, { color: colors.text }]}>{item.id}</Text>
                  <Text style={[styles.airline, { color: colors.text }]}>{item.airline}</Text>
                </View>
                <View style={styles.flightRoute}>
                  <View style={styles.routeItem}>
                    <Text style={[styles.routeTime, { color: colors.text }]}>{item.departureTime}</Text>
                    <Text style={[styles.routeCity, { color: colors.text }]}>{item.from}</Text>
                  </View>
                  <View style={styles.routeLine}>
                    <IconSymbol name="airplane" size={20} color={colors.text} />
                    <Text style={[styles.flightDuration, { color: colors.text + '80' }]}>{item.duration}</Text>
                  </View>
                  <View style={styles.routeItem}>
                    <Text style={[styles.routeTime, { color: colors.text }]}>{item.departureTime}</Text>
                    <Text style={[styles.routeCity, { color: colors.text }]}>{item.to}</Text>
                  </View>
                </View>
                <View style={styles.flightFooter}>
                  <Text style={[styles.flightDate, { color: colors.text }]}>{item.departureDate}</Text>
                  <Text style={[styles.flightPrice, { color: colors.primary }]}>{item.price} {item.currency}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.flightList}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListEmptyComponent={() => (
              <View style={styles.emptyResultsContainer}>
                <Text style={[styles.emptyResultsText, { color: colors.text }]}>Uçuş bulunamadı</Text>
              </View>
            )}
          />
        )}
      </View>

      {showDepartureDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={handleDepartureDateChange}
          minimumDate={new Date(currentYear, 0, 1)}
        />
      )}

      {showReturnDatePicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={handleReturnDateChange}
          minimumDate={departureDate}
        />
      )}

      <Modal
        visible={showCityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background + '99' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {activeInput === 'from' ? 'Nereden' : 'Nereye'}
              </Text>
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={[styles.citySearchContainer, { backgroundColor: colors.background }]}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.text} />
              <TextInput
                style={[styles.citySearchInput, { color: colors.text }]}
                placeholder="Şehir ara..."
                placeholderTextColor={colors.text + '80'}
                value={citySearchText}
                onChangeText={setCitySearchText}
                autoFocus={true}
                clearButtonMode="while-editing"
              />
            </View>
            <ScrollView style={styles.cityList}>
              {filteredCities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={styles.cityItem}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text style={[styles.cityText, { color: colors.text }]}>{city}</Text>
                </TouchableOpacity>
              ))}
              {filteredCities.length === 0 && (
                <View style={styles.noCitiesContainer}>
                  <Text style={[styles.noCitiesText, { color: colors.text }]}>
                    Aradığınız şehir bulunamadı
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  listContainer: {
    flex: 1,
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    height: 36,
  },
  filterContainer: {
    marginBottom: 12,
  },
  flightList: {
    padding: 16,
    paddingBottom: 70,
  },
  flightCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  flightNo: {
    fontSize: 14,
    fontWeight: '500',
  },
  airline: {
    fontSize: 14,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  routeItem: {
    flex: 1,
  },
  routeTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  routeCity: {
    fontSize: 14,
  },
  routeLine: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  flightDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  dateButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateButtonText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
    marginRight: 8,
  },
  filterTextInput: {
    marginLeft: 8,
    fontSize: 14,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cityList: {
    maxHeight: '80%',
  },
  cityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  searchButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  flightDuration: {
    fontSize: 12,
    marginTop: 4,
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  citySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  citySearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 8,
  },
  noCitiesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noCitiesText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 