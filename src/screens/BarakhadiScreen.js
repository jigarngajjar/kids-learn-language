import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { barakhadi } from '../data/barakhadiData';

const isWeb = Platform.OS === 'web';

const BarakhadiScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>બારાખડી</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Barakhadi</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી બારાખડી શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Barakhadi</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી બારાખડી અને તેમના ઉચ્ચાર.
          </Text>
        </View>

        <View style={[styles.barakhadiContainer, isWeb && styles.webBarakhadiContainer]}>
          {barakhadi.map((section, sectionIndex) => (
            <View key={sectionIndex} style={[styles.section, isWeb && styles.webSection]}>
              <View style={[styles.sectionHeader, isWeb && styles.webSectionHeader]}>
                <Text style={[styles.consonantLetter, isWeb && styles.webConsonantLetter]}>{section.consonant}</Text>
                <Text style={[styles.consonantName, isWeb && styles.webConsonantName]}>{section.consonantName}</Text>
              </View>
              
              <View style={[styles.syllablesContainer, isWeb && styles.webSyllablesContainer]}>
                {section.syllables.map((syllable, syllableIndex) => (
                  <View
                    key={syllableIndex}
                    style={[styles.syllableCard, isWeb && styles.webSyllableCard]}
                  >
                    <Text style={[styles.syllableText, isWeb && styles.webSyllableText]}>{syllable.syllable}</Text>
                    <Text style={[styles.syllablePronunciation, isWeb && styles.webSyllablePronunciation]}>{syllable.pronunciation}</Text>
                    <Text style={[styles.syllableEnglish, isWeb && styles.webSyllableEnglish]}>{syllable.english}</Text>
                  </View>
                ))}
              </View>
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
    backgroundColor: '#96CEB4',
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
    backgroundColor: '#E8F5E8',
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
    color: '#2E7D32',
    marginLeft: 10,
    flex: 1,
  },
  webInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 12,
    flex: 1,
  },
  barakhadiContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  webBarakhadiContainer: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginBottom: 15,
  },
  webSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  webSectionHeader: {
    marginBottom: 20,
    paddingBottom: 15,
  },
  consonantLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#96CEB4',
    marginBottom: 5,
  },
  webConsonantLetter: {
    fontSize: 32,
    color: '#27ae60',
    marginBottom: 8,
  },
  consonantName: {
    fontSize: 12,
    color: '#666',
  },
  webConsonantName: {
    fontSize: 14,
    color: '#34495e',
  },
  syllablesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  webSyllablesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '8px',
    paddingHorizontal: '10px',
    maxWidth: '100%',
  },
  syllableCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 60,
  },
  webSyllableCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 8,
    marginRight: 0,
    alignItems: 'center',
    minWidth: 50,
    width: 50,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  syllableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#96CEB4',
    marginBottom: 4,
  },
  webSyllableText: {
    fontSize: 16,
    color: '#27ae60',
    marginBottom: 3,
  },
  syllablePronunciation: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  webSyllablePronunciation: {
    fontSize: 10,
    color: '#2c3e50',
    marginBottom: 1,
  },
  syllableEnglish: {
    fontSize: 10,
    color: '#666',
  },
  webSyllableEnglish: {
    fontSize: 8,
    color: '#34495e',
  },

});

export default BarakhadiScreen; 