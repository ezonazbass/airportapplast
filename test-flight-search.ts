import { apiService } from './services/api';

async function testFlightSearch() {
  try {
    // Örnek bir uçuş araması
    const searchParams = {
      from: 'İstanbul',
      to: 'Ankara',
      departureDate: '2025-05-15',
      isRoundTrip: true,
      returnDate: '2025-05-20'
    };

    console.log('Uçuşlar aranıyor...');
    const flights = await apiService.searchFlights(searchParams);
    console.log('Bulunan uçuşlar:', JSON.stringify(flights, null, 2));

    // Şehirleri test et
    console.log('\nŞehirler alınıyor...');
    const cities = await apiService.getCities();
    console.log('Bulunan şehirler:', cities);

    // Havayollarını test et
    console.log('\nHavayolları alınıyor...');
    const airlines = await apiService.getAirlines();
    console.log('Bulunan havayolları:', airlines);

  } catch (error) {
    console.error('Test sırasında hata oluştu:', error);
  }
}

testFlightSearch(); 