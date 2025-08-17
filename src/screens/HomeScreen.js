import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    {
      title: 'મૂળાક્ષરો',
      englishTitle: 'Alphabets',
      icon: 'text',
      screen: 'Alphabets',
      color: '#FF6B6B',
      description: 'Learn Gujarati vowels and consonants'
    },
    {
      title: 'અંક',
      englishTitle: 'Numbers',
      icon: 'calculator',
      screen: 'Numbers',
      color: '#4ECDC4',
      description: 'Learn Gujarati numbers 0-10'
    },
    {
      title: 'માત્રા',
      englishTitle: 'Diacritics',
      icon: 'language',
      screen: 'Diacritics',
      color: '#45B7D1',
      description: 'Learn vowel marks and symbols'
    },
    {
      title: 'બારાખડી',
      englishTitle: 'Barakhadi',
      icon: 'grid',
      screen: 'Barakhadi',
      color: '#96CEB4',
      description: 'Learn syllabic combinations'
    },
    {
      title: 'શબ્દો',
      englishTitle: 'Words',
      icon: 'book',
      screen: 'Words',
      color: '#FFEAA7',
      description: 'Learn 100+ Gujarati words'
    },
    {
      title: 'બાળવાર્તા',
      englishTitle: 'Stories',
      icon: 'library',
      screen: 'Stories',
      color: '#DDA0DD',
      description: 'Read Gujarati children stories'
    }
  ];

  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.welcomeText, isWeb && styles.webWelcomeText]}>સ્વાગત છે!</Text>
        <Text style={[styles.englishWelcome, isWeb && styles.webEnglishWelcome]}>Welcome!</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી શીખવા માટે તૈયાર છો?</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Ready to learn Gujarati?</Text>
      </View>

      <View style={[styles.menuContainer, isWeb && styles.webMenuContainer]}>
        {isWeb && <View style={styles.webMenuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: item.color }, isWeb && styles.webMenuItem]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <View style={[styles.menuContent, isWeb && styles.webMenuContent]}>
                <Ionicons name={item.icon} size={isWeb ? 32 : 40} color="white" />
                <View style={[styles.menuText, isWeb && styles.webMenuText]}>
                  <Text style={[styles.menuTitle, isWeb && styles.webMenuTitle]}>{item.title}</Text>
                  <Text style={[styles.menuEnglishTitle, isWeb && styles.webMenuEnglishTitle]}>{item.englishTitle}</Text>
                  <Text style={[styles.menuDescription, isWeb && styles.webMenuDescription]}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>}
        {!isWeb && menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.menuContent}>
              <Ionicons name={item.icon} size={40} color="white" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuEnglishTitle}>{item.englishTitle}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.footer, isWeb && styles.webFooter]}>
        <Text style={[styles.footerText, isWeb && styles.webFooterText]}>ગુજરાતી ભાષા શીખવાની મજા લો!</Text>
        <Text style={[styles.footerEnglishText, isWeb && styles.webFooterEnglishText]}>Have fun learning Gujarati!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  webContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  webHeader: {
    backgroundColor: '#2c3e50',
    padding: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  webWelcomeText: {
    fontSize: 40,
    color: '#ecf0f1',
  },
  englishWelcome: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
  },
  webEnglishWelcome: {
    fontSize: 22,
    color: '#bdc3c7',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  webSubtitle: {
    fontSize: 18,
    color: '#ecf0f1',
  },
  englishSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  webEnglishSubtitle: {
    fontSize: 16,
    color: '#bdc3c7',
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
  webMenuGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
  },
  menuItem: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  webMenuItem: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  webMenuContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  menuText: {
    marginLeft: 15,
    flex: 1,
  },
  webMenuText: {
    marginLeft: 0,
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  webMenuTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  menuEnglishTitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  webMenuEnglishTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  webMenuDescription: {
    fontSize: 10,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  webFooter: {
    padding: 40,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  webFooterText: {
    fontSize: 20,
    color: '#2c3e50',
  },
  footerEnglishText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  webFooterEnglishText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default HomeScreen; 