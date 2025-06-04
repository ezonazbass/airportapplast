import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const notificationSettings = [
    {
      id: '1',
      title: 'Uçuş Bildirimleri',
      description: 'Uçuş durumu, kapı değişikliği ve gecikme bildirimleri',
      icon: 'airplane',
      enabled: true,
    },
    {
      id: '2',
      title: 'Bagaj Bildirimleri',
      description: 'Bagaj teslim ve takip bildirimleri',
      icon: 'suitcase.fill',
      enabled: true,
    },
    {
      id: '3',
      title: 'Check-in Hatırlatıcıları',
      description: 'Online check-in zamanı geldiğinde bildirim',
      icon: 'checkmark.circle.fill',
      enabled: false,
    },
    {
      id: '4',
      title: 'Kampanya ve İndirimler',
      description: 'Özel teklifler ve indirim fırsatları',
      icon: 'tag.fill',
      enabled: false,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bildirimler</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Bildirim Ayarları</Text>
        
        {notificationSettings.map((setting) => (
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

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Bildirim ayarlarınızı istediğiniz zaman değiştirebilirsiniz. Tüm bildirimleri kapatmak için cihaz ayarlarınızı kullanabilirsiniz.
          </Text>
        </View>
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