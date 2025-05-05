import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function CheckinScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const [checkedIn, setCheckedIn] = useState(false);
  const [pnr, setPnr] = useState('');
  const navigation = useNavigation();

  // Dummy flight info
  const flightInfo = {
    flightNumber: 'TK123',
    gate: 'A12',
    time: '14:30',
    destination: 'İstanbul (IST)',
  };

  React.useEffect(() => {
    navigation.setOptions?.({ title: 'Online Check-in' });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      {!checkedIn ? (
        <>
          <View style={styles.illustrationWrapper}>
            {/* Dummy illustration */}
            <Text style={{ fontSize: 64, marginBottom: 12 }}>🛫</Text>
          </View>
          <Text style={[styles.title, { color: colors.primary }]}>Online Check-in</Text>
          <Text style={[styles.desc, { color: colors.secondary }]}>Uçuşunuz için hızlı ve kolay bir şekilde online check-in yapabilirsiniz.</Text>
          <View style={styles.formCard}>
            <Text style={[styles.label, { color: colors.text }]}>PNR veya Rezervasyon Kodu</Text>
            <TextInput
              style={[styles.inputBox, { borderColor: colors.border, color: colors.text }]}
              placeholder="PNR veya Rezervasyon Kodu"
              placeholderTextColor={colors.secondary}
              value={pnr}
              onChangeText={setPnr}
              autoCapitalize="characters"
              maxLength={8}
              autoCorrect={false}
              keyboardType="default"
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary, opacity: pnr ? 1 : 0.5 }]}
              onPress={() => setCheckedIn(true)}
              disabled={!pnr}
            > 
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Check-in Yap</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={[styles.confirmCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={{ fontSize: 60, marginBottom: 10 }}>✅</Text>
          <Text style={[styles.confirmTitle, { color: colors.primary }]}>Check-in Başarılı!</Text>
          <Text style={[styles.confirmDesc, { color: colors.secondary }]}>Uçuş bilgileriniz aşağıdadır:</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Uçuş:</Text><Text style={styles.infoValue}>{flightInfo.flightNumber}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Varış:</Text><Text style={styles.infoValue}>{flightInfo.destination}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Kapı:</Text><Text style={styles.infoValue}>{flightInfo.gate}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Saat:</Text><Text style={styles.infoValue}>{flightInfo.time}</Text></View>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary, marginTop: 24 }]} onPress={() => { setCheckedIn(false); setPnr(''); }}>
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Kapat</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  illustrationWrapper: {
    marginTop: 32,
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 320,
  },
  formCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#1A237E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputBox: {
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    marginBottom: 18,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  confirmCard: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    padding: 28,
    marginTop: 48,
    shadowColor: '#1A237E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  confirmDesc: {
    fontSize: 15,
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#607D8B',
    fontSize: 15,
  },
  infoValue: {
    fontWeight: '700',
    color: '#1A237E',
    fontSize: 15,
  },
}); 