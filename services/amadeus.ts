// Amadeus API yapılandırması
const API_BASE_URL = 'https://test.api.amadeus.com/v2';
const API_KEY = 'hbA88CGBbeS07LxblY9MmGkCkARC1aPm';
const API_SECRET = 'clYyWBGx2AlgNaVb';

// Token alma fonksiyonu
async function getAccessToken() {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Token alma hatası: ${errorData.error_description || response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Token alma hatası:', error);
    throw error;
  }
}

// API servis sınıfı
class AmadeusService {
  private token: string | null = null;
  private tokenExpiry: number = 0;

  // Token kontrolü ve yenileme
  private async ensureValidToken() {
    if (!this.token || Date.now() >= this.tokenExpiry) {
      this.token = await getAccessToken();
      this.tokenExpiry = Date.now() + 1800000; // 30 dakika
    }
    return this.token;
  }

  // Uçuş arama
  async searchFlights(params: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
  }) {
    try {
      const token = await this.ensureValidToken();
      const url = `${API_BASE_URL}/shopping/flight-offers?` +
        `originLocationCode=${params.from}&` +
        `destinationLocationCode=${params.to}&` +
        `departureDate=${params.departureDate}&` +
        `adults=1&` +
        `max=10` +
        (params.returnDate ? `&returnDate=${params.returnDate}` : '');

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Uçuş arama hatası: ${errorData.errors?.[0]?.detail || response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Uçuş arama hatası:', error);
      throw error;
    }
  }
}

export const amadeusService = new AmadeusService(); 