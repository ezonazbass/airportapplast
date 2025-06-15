import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function PrivacyScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const privacySettings = [
    {
      id: '1',
      title: 'Konum Servisleri',
      description: 'Havalimanı içi navigasyon ve yakındaki hizmetler için konum izni',
      icon: 'location.fill',
      enabled: true,
    },
    {
      id: '2',
      title: 'Bildirimler',
      description: 'Uçuş durumu ve önemli güncellemeler için bildirim izni',
      icon: 'bell.fill',
      enabled: true,
    },
    {
      id: '3',
      title: 'Kamera Erişimi',
      description: 'QR kod tarama ve belge fotoğrafı çekme için kamera izni',
      icon: 'camera.fill',
      enabled: false,
    },
    {
      id: '4',
      title: 'Veri Toplama',
      description: 'Kullanım istatistikleri ve hizmet iyileştirmeleri için veri toplama',
      icon: 'chart.bar.fill',
      enabled: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Gizlilik</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>İzinler ve Gizlilik</Text>
        
        {privacySettings.map((setting) => (
          <View
            key={setting.id}
            style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.settingHeader}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary + '22' }]}>
                <IconSymbol name={setting.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>{setting.title}</Text>
                <Text style={[styles.settingDescription, { color: colors.secondary }]}>
                  {setting.description}
                </Text>
              </View>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => {}}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={setting.enabled ? colors.primary : colors.secondary}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Verilerimi İndir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.error }]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Hesabımı Sil</Text>
        </TouchableOpacity>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Gizlilik ayarlarınızı istediğiniz zaman değiştirebilirsiniz. Verileriniz güvenli bir şekilde saklanmaktadır ve üçüncü taraflarla paylaşılmamaktadır.
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  button: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
}); 