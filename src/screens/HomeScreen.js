import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const isWeb = Platform.OS === 'web';

  const menuItems = [
    {
      title: 'અક્ષરો',
      englishTitle: 'Alphabet',
      icon: 'text',
      screen: 'Alphabets',
      description: 'Learn Gujarati vowels and consonants',
    },
    {
      title: 'શબ્દો',
      englishTitle: 'Words',
      icon: 'book',
      screen: 'Words',
      description: 'Learn Gujarati vocabulary by categories',
    },
    {
      title: 'અંકો',
      englishTitle: 'Numbers',
      icon: 'calculator',
      screen: 'Numbers',
      description: 'Learn Gujarati numbers 1-100',
    },
    {
      title: 'વાર્તાઓ',
      englishTitle: 'Stories',
      icon: 'library',
      screen: 'Stories',
      description: 'Read Gujarati stories with morals',
    },
    {
      title: 'બારાખડી',
      englishTitle: 'Barakhadi',
      icon: 'grid',
      screen: 'Barakhadi',
      description: 'Learn Gujarati syllable combinations',
    },
    {
      title: 'રમતો',
      englishTitle: 'Games',
      icon: 'game-controller',
      screen: 'Games',
      description: 'Play word matching games',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.headerTitle, isWeb && styles.webHeaderTitle]}>
          ગુજરાતી શીખો
        </Text>
        <Text style={[styles.headerSubtitle, isWeb && styles.webHeaderSubtitle]}>
          Learn Gujarati
        </Text>
        <Text style={[styles.headerDescription, isWeb && styles.webHeaderDescription]}>
          Interactive learning for all ages
        </Text>
      </View>

      {/* Menu Grid */}
      <View style={[styles.menuContainer, isWeb && styles.webMenuContainer]}>
        <View style={[styles.menuGrid, isWeb && styles.webMenuGrid]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuCard, isWeb && styles.webMenuCard]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.cardContent}>
                <Ionicons
                  name={item.icon}
                  size={isWeb ? 40 : 32}
                  color="#2196F3"
                  style={styles.cardIcon}
                />
                <Text style={[styles.cardTitle, isWeb && styles.webCardTitle]}>
                  {item.title}
                </Text>
                <Text style={[styles.cardEnglishTitle, isWeb && styles.webCardEnglishTitle]}>
                  {item.englishTitle}
                </Text>
                <Text style={[styles.cardDescription, isWeb && styles.webCardDescription]}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 30,
    alignItems: 'center',
  },
  webHeader: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  webHeaderTitle: {
    fontSize: 36,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  webHeaderSubtitle: {
    fontSize: 24,
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  webHeaderDescription: {
    fontSize: 16,
  },
  menuContainer: {
    padding: 20,
  },
  webMenuContainer: {
    padding: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webMenuGrid: {
    justifyContent: 'center',
    gap: 20,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  webMenuCard: {
    width: 200,
    marginBottom: 0,
    borderRadius: 20,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  webCardTitle: {
    fontSize: 20,
    marginBottom: 6,
  },
  cardEnglishTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  webCardEnglishTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 16,
  },
  webCardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default HomeScreen; 