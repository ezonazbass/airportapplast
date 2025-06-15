import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function LanguageScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const languages = [
    { id: 'tr', name: 'Türkçe', nativeName: 'Türkçe', isSelected: true },
    { id: 'en', name: 'English', nativeName: 'English', isSelected: false },
    { id: 'de', name: 'Deutsch', nativeName: 'Deutsch', isSelected: false },
    { id: 'fr', name: 'Français', nativeName: 'Français', isSelected: false },
    { id: 'es', name: 'Español', nativeName: 'Español', isSelected: false },
    { id: 'ar', name: 'العربية', nativeName: 'العربية', isSelected: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Dil Seçimi</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Uygulama Dili</Text>

        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[styles.languageCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {}}
          >
            <View style={styles.languageInfo}>
              <Text style={[styles.languageName, { color: colors.text }]}>{language.name}</Text>
              <Text style={[styles.languageNativeName, { color: colors.secondary }]}>
                {language.nativeName}
              </Text>
            </View>
            {language.isSelected && (
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Dil değişikliği uygulamanın yeniden başlatılmasını gerektirebilir. Değişiklikler hemen uygulanacaktır.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  languageNativeName: {
    fontSize: 14,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
