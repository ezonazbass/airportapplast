import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function PaymentMethodsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const paymentMethods = [
    {
      id: '1',
      type: 'Kredi Kartı',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true,
      cardType: 'visa',
    },
    {
      id: '2',
      type: 'Kredi Kartı',
      lastFour: '5678',
      expiryDate: '09/24',
      isDefault: false,
      cardType: 'mastercard',
    },
  ];

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return 'creditcard.fill';
      case 'mastercard':
        return 'creditcard.fill';
      default:
        return 'creditcard.fill';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Ödeme Yöntemleri</Text>
      </View>

      <View style={styles.paymentMethodsContainer}>
        {paymentMethods.map((method) => (
          <View
            key={method.id}
            style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <IconSymbol name={getCardIcon(method.cardType)} size={24} color={colors.primary} />
                <View style={styles.cardDetails}>
                  <Text style={[styles.cardType, { color: colors.text }]}>{method.type}</Text>
                  <Text style={[styles.cardNumber, { color: colors.secondary }]}>
                    **** **** **** {method.lastFour}
                  </Text>
                </View>
              </View>
              {method.isDefault && (
                <View style={[styles.defaultBadge, { backgroundColor: colors.primary + '22' }]}>
                  <Text style={[styles.defaultText, { color: colors.primary }]}>Varsayılan</Text>
                </View>
              )}
            </View>

            <View style={styles.cardFooter}>
              <Text style={[styles.expiryDate, { color: colors.secondary }]}>
                Son Kullanma: {method.expiryDate}
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <IconSymbol name="pencil" size={16} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <IconSymbol name="trash" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.addCardButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.8}
        >
          <IconSymbol name="plus.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.addCardText, { color: colors.primary }]}>Yeni Kart Ekle</Text>
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
  paymentMethodsContainer: {
    padding: 16,
  },
  paymentCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardDetails: {
    gap: 4,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 14,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  expiryDate: {
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 