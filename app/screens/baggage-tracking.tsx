import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function BaggageTrackingScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const [baggageNo, setBaggageNo] = useState('');
  const [searched, setSearched] = useState(false);
  const navigation = useNavigation();

  // Dummy baggage info logic
  let status = 'Yolda';
  let statusColor = '#FFA000';
  let statusIcon = '🛄';
  let location = 'Aktarma Noktası';
  if (baggageNo.trim().toUpperCase() === 'BG123') {
    status = 'Teslim Edildi';
    statusColor = '#4CAF50';
    statusIcon = '✅';
    location = 'İstanbul (IST)';
  } else if (baggageNo.trim().toUpperCase() === 'BG999') {
    status = 'Beklemede';
    statusColor = '#E53935';
    statusIcon = '⏳';
    location = 'Ankara (ESB)';
  }

  React.useEffect(() => {
    navigation.setOptions?.({ title: 'Bagaj Takip' });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 24 }}>
        <View style={styles.illustrationWrapper}>
          {/* Dummy illustration */}
          <Text style={{ fontSize: 64, marginBottom: 12 }}>🧳</Text>
        </View>
        <Text style={[styles.title, { color: colors.primary }]}>Bagaj Takip</Text>
        <Text style={[styles.desc, { color: colors.secondary }]}>Bagaj numarası ile bagajınızın güncel durumunu sorgulayabilirsiniz.</Text>
        <View style={styles.formCard}>
          <Text style={[styles.label, { color: colors.text }]}>Bagaj Numarası</Text>
          <TextInput
            style={[styles.inputBox, { borderColor: colors.border, color: colors.text }]}
            placeholder="Örn: BG123 veya BG999"
            placeholderTextColor={colors.secondary}
            value={baggageNo}
            onChangeText={setBaggageNo}
            autoCapitalize="characters"
            maxLength={8}
            autoCorrect={false}
            keyboardType="default"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary, opacity: baggageNo ? 1 : 0.5 }]}
            onPress={() => setSearched(true)}
            disabled={!baggageNo}
          > 
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Sorgula</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={searched}
        animationType="slide"
        transparent
        onRequestClose={() => { setSearched(false); setBaggageNo(''); }}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.resultModal, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <Text style={{ fontSize: 32, marginBottom: 8 }}>{statusIcon}</Text>
            <Text style={[styles.resultTitle, { color: colors.primary }]}>Bagaj Durumu</Text>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Bagaj No:</Text><Text style={styles.infoValue}>{baggageNo.toUpperCase()}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Konum:</Text><Text style={styles.infoValue}>{location}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Durum:</Text><Text style={[styles.infoValue, { color: statusColor }]}>{status}</Text></View>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary, marginTop: 18 }]} onPress={() => { setSearched(false); setBaggageNo(''); }}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Kapat</Text>
            </TouchableOpacity>
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
  illustrationWrapper: {
    marginTop: 32,
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 320,
    alignSelf: 'center',
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
    marginBottom: 24,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultModal: {
    width: '88%',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    padding: 28,
    shadowColor: '#1A237E10',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: '#fff',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
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