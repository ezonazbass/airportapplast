import { amadeusService } from '../services/amadeus';

// Test parametreleri
const testParams = {
  from: 'IST',  // İstanbul
  to: 'CDG',    // Paris
  departureDate: '2024-03-29'  // Yarın
};

// Test fonksiyonu
async function testFlightSearch() {
  try {
    console.log('Uçuş araması başlatılıyor...');
    console.log('Arama parametreleri:', testParams);
    
    const flights = await amadeusService.searchFlights(testParams);
    
    console.log('\nAPI Yanıtı:');
    console.log('----------------');
    console.log(JSON.stringify(flights, null, 2));
    
    if (flights && flights.length > 0) {
      flights.forEach((flight: any, index: number) => {
        console.log(`\nUçuş ${index + 1}:`);
        console.log('Havayolu:', flight.validatingAirlineCodes[0]);
        console.log('Uçuş Numarası:', flight.itineraries[0].segments[0].number);
        console.log('Kalkış:', flight.itineraries[0].segments[0].departure.iataCode);
        console.log('Varış:', flight.itineraries[0].segments[0].arrival.iataCode);
        console.log('Fiyat:', flight.price.total, flight.price.currency);
      });
    } else {
      console.log('Hiç uçuş bulunamadı.');
    }
  } catch (error) {
    console.error('Test sırasında hata:', error);
    if (error instanceof Error) {
      console.error('Hata detayı:', error.message);
    }
  }
}

// Testi çalıştır
testFlightSearch(); 