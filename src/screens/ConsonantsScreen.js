import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { consonants } from '../data/gujaratiData';

const isWeb = Platform.OS === 'web';

const ConsonantsScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>વ્યંજન</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Consonants</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી વ્યંજન શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Consonants</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી વ્યંજન અને તેમના ઉચ્ચાર.
          </Text>
        </View>

        <View style={[styles.consonantsGrid, isWeb && styles.webConsonantsGrid]}>
          {isWeb && <View style={styles.webConsonantsContainer}>
            {consonants.map((consonant, index) => (
              <View
                key={index}
                style={[styles.consonantCard, isWeb && styles.webConsonantCard]}
              >
                <Text style={[styles.consonantLetter, isWeb && styles.webConsonantLetter]}>{consonant.letter}</Text>
                <Text style={[styles.consonantPronunciation, isWeb && styles.webConsonantPronunciation]}>{consonant.pronunciation}</Text>
                <Text style={[styles.consonantEnglish, isWeb && styles.webConsonantEnglish]}>{consonant.english}</Text>
              </View>
            ))}
          </View>}
          {!isWeb && consonants.map((consonant, index) => (
            <View
              key={index}
              style={styles.consonantCard}
            >
              <Text style={styles.consonantLetter}>{consonant.letter}</Text>
              <Text style={styles.consonantPronunciation}>{consonant.pronunciation}</Text>
              <Text style={styles.consonantEnglish}>{consonant.english}</Text>
            </View>
          ))}
        </View>
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
    backgroundColor: '#4ECDC4',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  webTitle: {
    fontSize: 36,
    color: '#ecf0f1',
  },
  englishTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  webEnglishTitle: {
    fontSize: 20,
    color: '#bdc3c7',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  webSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  englishSubtitle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  webEnglishSubtitle: {
    fontSize: 14,
    color: '#bdc3c7',
  },
  content: {
    padding: 20,
  },
  webContent: {
    padding: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  webInfoBox: {
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    maxWidth: 800,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#00695C',
    marginLeft: 10,
    flex: 1,
  },
  webInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 12,
    flex: 1,
  },
  consonantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webConsonantsGrid: {
    alignItems: 'center',
  },
  webConsonantsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
  },
  consonantCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  webConsonantCard: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  consonantLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 6,
  },
  webConsonantLetter: {
    fontSize: 28,
    color: '#3498db',
    marginBottom: 6,
  },
  consonantPronunciation: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 3,
  },
  webConsonantPronunciation: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 3,
  },
  consonantEnglish: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  webConsonantEnglish: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
  },

});

export default ConsonantsScreen; 