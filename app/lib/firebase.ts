import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyD6pYGpeEvPaXwJg9PSj_G0UOtjb6XNuXA",
  authDomain: "airportapp-43a7d.firebaseapp.com",
  projectId: "airportapp-43a7d",
  storageBucket: "airportapp-43a7d.firebasestorage.app",
  messagingSenderId: "1064221655965",
  appId: "1:1064221655965:web:49c61f69222b6e171e6574"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisini al
export const auth = getAuth(app);

export default app; 