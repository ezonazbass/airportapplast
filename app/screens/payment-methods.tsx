import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

interface Card {
  id: string;
  number: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentMethodsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const handleAddCard = async () => {
    if (cardNumber.length !== 16) {
      Alert.alert('Hata', 'Kart numarası 16 haneli olmalıdır.');
      return;
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      Alert.alert('Hata', 'Son kullanma tarihi MM/YY formatında olmalıdır.');
      return;
    }

    try {
      const newCard: Card = {
        id: Date.now().toString(),
        number: cardNumber,
        name: cardName,
        expiry: expiryDate,
        isDefault
      };

      const existingCardsJson = await AsyncStorage.getItem('cards');
      const existingCards: Card[] = existingCardsJson ? JSON.parse(existingCardsJson) : [];

      let updatedCards: Card[];
      if (isDefault) {
        // Eğer yeni kart varsayılan olarak işaretlendiyse, diğer kartların varsayılan özelliğini kaldır
        updatedCards = existingCards.map(card => ({ ...card, isDefault: false }));
        updatedCards.push(newCard);
      } else {
        updatedCards = [...existingCards, newCard];
      }

      await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));

      Alert.alert(
        'Başarılı',
        'Kart başarıyla eklendi.',
        [
          {
            text: 'Tamam',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Kart eklenirken hata oluştu:', error);
      Alert.alert('Hata', 'Kart eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Yeni Kart Ekle</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Kart Numarası</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Kart Üzerindeki İsim</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="JOHN DOE"
            placeholderTextColor={colors.textSecondary}
            value={cardName}
            onChangeText={setCardName}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Son Kullanma Tarihi</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="MM/YY"
            placeholderTextColor={colors.textSecondary}
            maxLength={5}
            value={expiryDate}
            onChangeText={(text) => {
              // Otomatik olarak / ekle
              if (text.length === 2 && !text.includes('/')) {
                setExpiryDate(text + '/');
              } else {
                setExpiryDate(text);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.defaultToggle, { backgroundColor: colors.card }]}
          onPress={() => setIsDefault(!isDefault)}
        >
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>Varsayılan Kart Olarak Kaydet</Text>
            <View style={[
              styles.toggleButton,
              { backgroundColor: isDefault ? colors.primary : colors.border }
            ]}>
              <View style={[
                styles.toggleKnob,
                { 
                  backgroundColor: '#FFFFFF',
                  transform: [{ translateX: isDefault ? 20 : 0 }]
                }
              ]} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddCard}
        >
          <Text style={[styles.addButtonText, { color: '#FFFFFF' }]}>Kartı Ekle</Text>
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
  content: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  defaultToggle: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 16,
  },
  toggleButton: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 
