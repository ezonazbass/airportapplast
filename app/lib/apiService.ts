import { Alert } from 'react-native';
import { amadeusService } from './amadeus';

// Şehir kodları ve isimleri
const cityCodes: { [key: string]: string } = {
  'İstanbul': 'IST',
  'Ankara': 'ESB',
  'İzmir': 'ADB',
  'Antalya': 'AYT',
  'Paris': 'CDG',
  'Londra': 'LHR',
  'Roma': 'FCO',
  'Amsterdam': 'AMS',
  'Berlin': 'BER',
  'Madrid': 'MAD'
};

// Havayolu kodları ve isimleri
const airlineCodes: { [key: string]: string } = {
  'TK': 'Türk Hava Yolları',
  'PC': 'Pegasus',
  'AJ': 'AnadoluJet',
  'XQ': 'SunExpress',
  'AF': 'Air France',
  'BA': 'British Airways',
  'LH': 'Lufthansa',
  'KL': 'KLM'
};

export interface Flight {
  id: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  departureTime: string;
  returnTime: string;
  airline: string;
  price: number;
  currency: string;
  duration: string;
  available: boolean;
}

export interface FlightSearchParams {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  isRoundTrip: boolean;
}

class ApiService {
  // Tüm şehirleri getir
  async getCities(): Promise<string[]> {
    try {
      return Object.keys(cityCodes);
    } catch (error) {
      console.error('Şehirler alınırken hata oluştu:', error);
      Alert.alert('Hata', 'Şehir listesi alınırken bir hata oluştu.');
      return [];
    }
  }

  // Tüm havayollarını getir
  async getAirlines(): Promise<string[]> {
    try {
      return Object.values(airlineCodes);
    } catch (error) {
      console.error('Havayolları alınırken hata oluştu:', error);
      Alert.alert('Hata', 'Havayolu listesi alınırken bir hata oluştu.');
      return [];
    }
  }

  // Amadeus API yanıtını uygulama formatına dönüştür
  private transformFlightData(amadeusFlight: any): Flight {
    try {
      const segment = amadeusFlight.itineraries[0].segments[0];
      const airlineCode = amadeusFlight.validatingAirlineCodes[0];
      
      return {
        id: segment.number,
        from: segment.departure.iataCode,
        to: segment.arrival.iataCode,
        departureDate: segment.departure.at.split('T')[0],
        returnDate: '', // Dönüş uçuşu varsa doldurulacak
        departureTime: segment.departure.at.split('T')[1].substring(0, 5),
        returnTime: segment.arrival.at.split('T')[1].substring(0, 5),
        airline: airlineCodes[airlineCode] || airlineCode,
        price: parseFloat(amadeusFlight.price.total),
        currency: amadeusFlight.price.currency,
        duration: segment.duration,
        available: true
      };
    } catch (error) {
      console.error('Uçuş verisi dönüştürülürken hata oluştu:', error);
      throw new Error('Uçuş verisi dönüştürülemedi');
    }
  }

  // Uçuşları arama
  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    try {
      if (!params.from || !params.to || !params.departureDate) {
        throw new Error('Gerekli parametreler eksik');
      }

      // Şehir isimlerini havaalanı kodlarına dönüştür
      const fromCode = cityCodes[params.from] || params.from;
      const toCode = cityCodes[params.to] || params.to;

      // Amadeus API'sini çağır
      const amadeusFlights = await amadeusService.searchFlights({
        from: fromCode,
        to: toCode,
        departureDate: params.departureDate,
        returnDate: params.returnDate
      });

      if (!amadeusFlights || amadeusFlights.length === 0) {
        Alert.alert('Bilgi', 'Aradığınız kriterlere uygun uçuş bulunamadı.');
        return [];
      }

      // API yanıtını uygulama formatına dönüştür
      const flights = amadeusFlights.map((flight: any) => this.transformFlightData(flight));

      return flights;
    } catch (error) {
      console.error('Uçuşlar aranırken hata oluştu:', error);
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      } else {
        Alert.alert('Hata', 'Uçuşlar aranırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
      return [];
    }
  }

  // Tek bir uçuş detayını getir
  async getFlightDetails(flightId: string): Promise<Flight | null> {
    try {
      if (!flightId) {
        throw new Error('Uçuş ID\'si gerekli');
      }

      // Amadeus API'sinde tek uçuş detayı endpoint'i yok
      // Bu yüzden arama yapıp ID'ye göre filtreleme yapıyoruz
      const flights = await this.searchFlights({
        from: '',
        to: '',
        departureDate: '',
        isRoundTrip: false
      });

      const flight = flights.find(f => f.id === flightId);
      if (!flight) {
        Alert.alert('Bilgi', 'Uçuş detayları bulunamadı.');
      }
      return flight || null;
    } catch (error) {
      console.error('Uçuş detayları alınırken hata oluştu:', error);
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      } else {
        Alert.alert('Hata', 'Uçuş detayları alınırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
      return null;
    }
  }
}

export const apiService = new ApiService(); 