import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

interface PassengerInfo {
  firstName: string;
  lastName: string;
  passportNumber: string;
  seatNumber: string;
  baggageCount: number;
  baggageTags?: string[]; // Bagaj etiket numaraları
}

export default function CheckinScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();
  const params = useLocalSearchParams();
  const [step, setStep] = useState(1); // 1: Yolcu Bilgileri, 2: Koltuk Seçimi, 3: Bagaj Bilgileri, 4: Onay
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    passportNumber: '',
    seatNumber: '',
    baggageCount: 0
  });
  const [checkedIn, setCheckedIn] = useState(false);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        // Bagaj etiket numaralarını oluştur
        const baggageTags = Array.from({ length: passengerInfo.baggageCount }, () => {
          const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          return `${params.airline}${random}`;
        });

        // Check-in bilgisini kaydet
        const checkinInfo = {
          flightId: params.flightId,
          checkinDate: new Date().toISOString(),
          passengerInfo: {
            ...passengerInfo,
            baggageTags
          }
        };
        
        // Mevcut check-in bilgilerini al
        const existingCheckinsJson = await AsyncStorage.getItem('checkins');
        const existingCheckins = existingCheckinsJson ? JSON.parse(existingCheckinsJson) : [];
        
        // Yeni check-in bilgisini ekle
        const updatedCheckins = [...existingCheckins, checkinInfo];
        
        // Check-in bilgilerini kaydet
        await AsyncStorage.setItem('checkins', JSON.stringify(updatedCheckins));

        // Bagaj takip bilgilerini oluştur ve kaydet
        const baggageTrackingInfo = baggageTags.map(tag => ({
          tag,
          flightId: params.flightId,
          airline: params.airline,
          from: params.from,
          to: params.to,
          date: params.date,
          time: params.time,
          passengerName: `${passengerInfo.firstName} ${passengerInfo.lastName}`,
          status: 'Teslim Edildi', // Başlangıç durumu
          lastUpdate: new Date().toISOString()
        }));

        // Mevcut bagaj takip bilgilerini al
        const existingTrackingJson = await AsyncStorage.getItem('baggageTracking');
        const existingTracking = existingTrackingJson ? JSON.parse(existingTrackingJson) : [];
        
        // Yeni bagaj takip bilgilerini ekle
        const updatedTracking = [...existingTracking, ...baggageTrackingInfo];
        
        // Bagaj takip bilgilerini kaydet
        await AsyncStorage.setItem('baggageTracking', JSON.stringify(updatedTracking));
        
        setCheckedIn(true);
      } catch (error) {
        console.error('Bilgiler kaydedilirken hata oluştu:', error);
        setCheckedIn(true);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Yolcu Bilgileri</Text>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Ad</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                value={passengerInfo.firstName}
                onChangeText={(text) => setPassengerInfo({ ...passengerInfo, firstName: text })}
                placeholder="Adınız"
                placeholderTextColor={colors.secondary}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Soyad</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                value={passengerInfo.lastName}
                onChangeText={(text) => setPassengerInfo({ ...passengerInfo, lastName: text })}
                placeholder="Soyadınız"
                placeholderTextColor={colors.secondary}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Pasaport Numarası</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                value={passengerInfo.passportNumber}
                onChangeText={(text) => setPassengerInfo({ ...passengerInfo, passportNumber: text })}
                placeholder="Pasaport Numaranız"
                placeholderTextColor={colors.secondary}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Koltuk Seçimi</Text>
            <View style={styles.seatMap}>
              <View style={styles.seatRow}>
                {['A', 'B', 'C', 'D', 'E', 'F'].map((seat) => (
                  <TouchableOpacity
                    key={seat}
                    style={[
                      styles.seat,
                      { backgroundColor: passengerInfo.seatNumber === seat ? colors.primary : colors.background },
                      { borderColor: colors.border }
                    ]}
                    onPress={() => setPassengerInfo({ ...passengerInfo, seatNumber: seat })}
                  >
                    <Text style={[
                      styles.seatText,
                      { color: passengerInfo.seatNumber === seat ? '#FFFFFF' : colors.text }
                    ]}>{seat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Bagaj Bilgileri</Text>
            <View style={styles.baggageContainer}>
              <TouchableOpacity
                style={[styles.baggageButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                onPress={() => setPassengerInfo({ ...passengerInfo, baggageCount: Math.max(0, passengerInfo.baggageCount - 1) })}
              >
                <IconSymbol name="minus" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[styles.baggageCount, { color: colors.text }]}>{passengerInfo.baggageCount}</Text>
              <TouchableOpacity
                style={[styles.baggageButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                onPress={() => setPassengerInfo({ ...passengerInfo, baggageCount: passengerInfo.baggageCount + 1 })}
              >
                <IconSymbol name="plus" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Onay</Text>
            <View style={[styles.confirmCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.confirmLabel, { color: colors.text }]}>Uçuş Bilgileri</Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Uçuş:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{params.airline} {params.flightId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Rota:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{params.from} → {params.to}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Tarih:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{params.date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Saat:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{params.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Kapı:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{params.gate}</Text>
              </View>
              <View style={styles.divider} />
              <Text style={[styles.confirmLabel, { color: colors.text }]}>Yolcu Bilgileri</Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Ad Soyad:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{passengerInfo.firstName} {passengerInfo.lastName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Koltuk:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{passengerInfo.seatNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.secondary }]}>Bagaj:</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{passengerInfo.baggageCount} adet</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  if (checkedIn) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.boardingPass, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.boardingPassHeader}>
            <Text style={[styles.airlineName, { color: colors.primary }]}>{params.airline}</Text>
            <Text style={[styles.flightNumber, { color: colors.text }]}>{params.flightId}</Text>
          </View>
          <View style={styles.boardingPassContent}>
            <View style={styles.routeInfo}>
              <View style={styles.airportInfo}>
                <Text style={[styles.airportCode, { color: colors.text }]}>{params.from}</Text>
                <Text style={[styles.airportName, { color: colors.secondary }]}>Kalkış</Text>
              </View>
              <View style={styles.flightLine}>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
                <IconSymbol name="airplane" size={24} color={colors.primary} />
              </View>
              <View style={styles.airportInfo}>
                <Text style={[styles.airportCode, { color: colors.text }]}>{params.to}</Text>
                <Text style={[styles.airportName, { color: colors.secondary }]}>Varış</Text>
              </View>
            </View>
            <View style={styles.passengerInfo}>
              <Text style={[styles.passengerName, { color: colors.text }]}>
                {passengerInfo.firstName} {passengerInfo.lastName}
              </Text>
              <Text style={[styles.passengerDetails, { color: colors.secondary }]}>
                Koltuk: {passengerInfo.seatNumber} | Bagaj: {passengerInfo.baggageCount}
              </Text>
            </View>
            <View style={styles.flightDetails}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.secondary }]}>Tarih</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{params.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.secondary }]}>Saat</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{params.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.secondary }]}>Kapı</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{params.gate}</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/screens/my-tickets')}
        >
          <Text style={styles.doneButtonText}>Tamam</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Online Check-in</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? 'Check-in Yap' : 'İleri'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  seatMap: {
    marginTop: 16,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  seat: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontSize: 18,
    fontWeight: '600',
  },
  baggageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 24,
  },
  baggageButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baggageCount: {
    fontSize: 24,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  confirmCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  confirmLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  boardingPass: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  boardingPassHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  airlineName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  flightNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  boardingPassContent: {
    padding: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  airportInfo: {
    alignItems: 'center',
  },
  airportCode: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  airportName: {
    fontSize: 14,
  },
  flightLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
  },
  passengerInfo: {
    marginBottom: 24,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  passengerDetails: {
    fontSize: 14,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    margin: 16,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 