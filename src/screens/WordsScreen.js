import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { words } from '../data/wordsData';

const isWeb = Platform.OS === 'web';

const WordsScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>શબ્દો</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Words</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી શબ્દો શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Words</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી શબ્દો અને તેમના અર્થ.
          </Text>
        </View>

        <View style={[styles.wordsContainer, isWeb && styles.webWordsContainer]}>
          {isWeb && <View style={styles.webWordsGrid}>
            {words.map((word, index) => (
              <View
                key={index}
                style={[styles.wordCard, isWeb && styles.webWordCard]}
              >
                <View style={styles.wordContent}>
                  <Text style={[styles.wordText, isWeb && styles.webWordText]}>{word.word}</Text>
                  <Text style={[styles.wordPronunciation, isWeb && styles.webWordPronunciation]}>{word.pronunciation}</Text>
                  <Text style={[styles.wordEnglish, isWeb && styles.webWordEnglish]}>{word.english}</Text>
                  <View style={[styles.categoryTag, isWeb && styles.webCategoryTag]}>
                    <Text style={[styles.categoryTagText, isWeb && styles.webCategoryTagText]}>{word.category}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>}
          {!isWeb && words.map((word, index) => (
            <View
              key={index}
              style={styles.wordCard}
            >
              <View style={styles.wordContent}>
                <Text style={styles.wordText}>{word.word}</Text>
                <Text style={styles.wordPronunciation}>{word.pronunciation}</Text>
                <Text style={styles.wordEnglish}>{word.english}</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{word.category}</Text>
                </View>
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
    backgroundColor: '#FFEAA7',
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
    color: '#D63031',
    marginBottom: 5,
  },
  webTitle: {
    fontSize: 36,
    color: '#ecf0f1',
  },
  englishTitle: {
    fontSize: 16,
    color: '#D63031',
    marginBottom: 15,
  },
  webEnglishTitle: {
    fontSize: 20,
    color: '#bdc3c7',
  },
  subtitle: {
    fontSize: 14,
    color: '#D63031',
    textAlign: 'center',
    marginBottom: 5,
  },
  webSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  englishSubtitle: {
    fontSize: 12,
    color: '#D63031',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignSelf: 'center',
    width: '90%',
  },
  webInfoBox: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 25,
    marginBottom: 30,
    width: '60%',
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 10,
    fontWeight: '500',
  },
  webInfoText: {
    fontSize: 18,
    color: '#bdc3c7',
    marginLeft: 15,
  },
  wordsContainer: {
    // Removed searchContainer styles as it's no longer used
  },
  webWordsContainer: {
    // Removed webSearchContainer styles as it's no longer used
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webWordsGrid: {
    alignItems: 'center',
  },
  wordCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  webWordCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  wordContent: {
    // New style for word content to center text
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D63031',
    marginBottom: 5,
    textAlign: 'center',
  },
  webWordText: {
    fontSize: 22,
    color: '#2c3e50',
    marginBottom: 6,
  },
  wordPronunciation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  webWordPronunciation: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  wordEnglish: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  webWordEnglish: {
    fontSize: 12,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  categoryTag: {
    backgroundColor: '#FFEAA7',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'center',
  },
  webCategoryTag: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#D63031',
    fontWeight: '500',
  },
  webCategoryTagText: {
    fontSize: 12,
    color: 'white',
  },
  // Removed noResults styles as they are no longer applicable
  // Removed modal styles as they are no longer applicable
});

export default WordsScreen; 