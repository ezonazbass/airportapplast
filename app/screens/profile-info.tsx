import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileInfoScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme as keyof typeof Colors];
  const router = useRouter();

  const profileInfo = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    birthDate: '15.05.1990',
    nationality: 'Türkiye',
    passportNumber: 'U12345678',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profil Bilgileri</Text>
      </View>

      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatarBg, { backgroundColor: colors.primary + '22' }]}>
            <IconSymbol name="person.crop.circle.fill" size={80} color={colors.primary} />
          </View>
        </View>
        <Text style={[styles.userName, { color: colors.primary }]}>{profileInfo.name}</Text>
        <Text style={[styles.userEmail, { color: colors.secondary }]}>{profileInfo.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <IconSymbol name="phone.fill" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Telefon</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>{profileInfo.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Doğum Tarihi</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>{profileInfo.birthDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol name="globe" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Uyruk</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>{profileInfo.nationality}</Text>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol name="doc.text.fill" size={20} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.text }]}>Pasaport No</Text>
            <Text style={[styles.infoValue, { color: colors.secondary }]}>{profileInfo.passportNumber}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.editButton, { backgroundColor: colors.primary }]}
        activeOpacity={0.8}
      >
        <Text style={[styles.editButtonText, { color: colors.buttonText }]}>Profili Düzenle</Text>
      </TouchableOpacity>
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
  profileCard: {
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  infoContainer: {
    padding: 16,
  },
  infoCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 