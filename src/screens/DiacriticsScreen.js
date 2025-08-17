import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { diacritics } from '../data/gujaratiData';

const isWeb = Platform.OS === 'web';

const DiacriticsScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>માત્રા</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Diacritics</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી માત્રા શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Diacritics</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી માત્રા અને તેમના ઉચ્ચાર.
          </Text>
        </View>

        <View style={[styles.diacriticsGrid, isWeb && styles.webDiacriticsGrid]}>
          {isWeb && <View style={styles.webDiacriticsContainer}>
            {diacritics.map((diacritic, index) => (
              <View
                key={index}
                style={[styles.diacriticCard, isWeb && styles.webDiacriticCard]}
              >
                <Text style={[styles.diacriticSymbol, isWeb && styles.webDiacriticSymbol]}>{diacritic.symbol}</Text>
                <Text style={[styles.diacriticName, isWeb && styles.webDiacriticName]}>{diacritic.name}</Text>
                <Text style={[styles.diacriticPronunciation, isWeb && styles.webDiacriticPronunciation]}>{diacritic.pronunciation}</Text>
                <Text style={[styles.diacriticEnglish, isWeb && styles.webDiacriticEnglish]}>{diacritic.english}</Text>
              </View>
            ))}
          </View>}
          {!isWeb && diacritics.map((diacritic, index) => (
            <View
              key={index}
              style={styles.diacriticCard}
            >
              <Text style={styles.diacriticSymbol}>{diacritic.symbol}</Text>
              <Text style={styles.diacriticName}>{diacritic.name}</Text>
              <Text style={styles.diacriticPronunciation}>{diacritic.pronunciation}</Text>
              <Text style={styles.diacriticEnglish}>{diacritic.english}</Text>
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
    backgroundColor: '#45B7D1',
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
    backgroundColor: '#E3F2FD',
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
    color: '#1976D2',
    marginLeft: 10,
    flex: 1,
  },
  webInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 12,
    flex: 1,
  },
  diacriticsGrid: {
    marginBottom: 30,
  },
  webDiacriticsGrid: {
    alignItems: 'center',
  },
  webDiacriticsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
  },
  diacriticCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  webDiacriticCard: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  diacriticHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  webDiacriticHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  diacriticSymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#45B7D1',
    marginRight: 15,
  },
  webDiacriticSymbol: {
    fontSize: 28,
    color: '#9b59b6',
    marginRight: 0,
    marginBottom: 6,
  },
  diacriticName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  webDiacriticName: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  diacriticPronunciation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  webDiacriticPronunciation: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 3,
    textAlign: 'center',
  },
  diacriticEnglish: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  webDiacriticEnglish: {
    fontSize: 10,
    color: '#34495e',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  exampleSection: {
    backgroundColor: '#F3E5F5',
    borderRadius: 15,
    padding: 20,
  },
  webExampleSection: {
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    padding: 30,
    maxWidth: 800,
    alignSelf: 'center',
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 15,
    textAlign: 'center',
  },
  webExampleTitle: {
    fontSize: 22,
    color: '#2c3e50',
    marginBottom: 20,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webExamplesGrid: {
    alignItems: 'center',
  },
  webExamplesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '12px',
    paddingHorizontal: '10px',
    maxWidth: '100%',
  },
  exampleCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  webExampleCard: {
    marginBottom: 0,
    borderRadius: 15,
    width: 180,
  },
  exampleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 5,
  },
  webExampleText: {
    fontSize: 16,
    color: '#9b59b6',
    marginBottom: 4,
  },
  examplePronunciation: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  webExamplePronunciation: {
    fontSize: 11,
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
    color: '#45B7D1',
  },
  webModalTitle: {
    fontSize: 56,
    color: '#9b59b6',
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
  nameSection: {
    marginBottom: 20,
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
  nameText: {
    fontSize: 18,
    color: '#666',
  },
  webNameText: {
    fontSize: 22,
    color: '#34495e',
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

export default DiacriticsScreen; 