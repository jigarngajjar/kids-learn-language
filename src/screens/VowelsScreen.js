import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { vowels } from '../data/gujaratiData';

const isWeb = Platform.OS === 'web';

const VowelsScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>સ્વર</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Vowels</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી સ્વર શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Vowels</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી સ્વર અને તેમના ઉચ્ચાર.
          </Text>
        </View>

        <View style={[styles.vowelsGrid, isWeb && styles.webVowelsGrid]}>
          {isWeb && <View style={styles.webVowelsContainer}>
            {vowels.map((vowel, index) => (
              <View
                key={index}
                style={[styles.vowelCard, isWeb && styles.webVowelCard]}
              >
                <Text style={[styles.vowelLetter, isWeb && styles.webVowelLetter]}>{vowel.letter}</Text>
                <Text style={[styles.vowelPronunciation, isWeb && styles.webVowelPronunciation]}>{vowel.pronunciation}</Text>
                <Text style={[styles.vowelEnglish, isWeb && styles.webVowelEnglish]}>{vowel.english}</Text>
              </View>
            ))}
          </View>}
          {!isWeb && vowels.map((vowel, index) => (
            <View
              key={index}
              style={styles.vowelCard}
            >
              <Text style={styles.vowelLetter}>{vowel.letter}</Text>
              <Text style={styles.vowelPronunciation}>{vowel.pronunciation}</Text>
              <Text style={styles.vowelEnglish}>{vowel.english}</Text>
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
    backgroundColor: '#FFF3E0',
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
    color: '#E65100',
    marginLeft: 10,
    flex: 1,
  },
  webInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 12,
    flex: 1,
  },
  vowelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webVowelsGrid: {
    alignItems: 'center',
  },
  webVowelsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
  },
  vowelCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
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
  webVowelCard: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  vowelLetter: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  webVowelLetter: {
    fontSize: 28,
    color: '#e74c3c',
    marginBottom: 6,
  },
  vowelPronunciation: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  webVowelPronunciation: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 3,
  },
  vowelEnglish: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  webVowelEnglish: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    width: '85%',
    maxHeight: '70%',
  },
  webModalContent: {
    borderRadius: 25,
    width: '60%',
    maxWidth: 600,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  webModalHeader: {
    padding: 30,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  webModalTitle: {
    fontSize: 56,
    color: '#e74c3c',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  webModalBody: {
    padding: 30,
  },
  pronunciationSection: {
    marginBottom: 20,
  },
  englishSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  webSectionTitle: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 12,
  },
  pronunciationText: {
    fontSize: 18,
    color: '#666',
  },
  webPronunciationText: {
    fontSize: 22,
    color: '#34495e',
  },
  englishText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  webEnglishText: {
    fontSize: 20,
    color: '#2c3e50',
  },

});

export default VowelsScreen; 