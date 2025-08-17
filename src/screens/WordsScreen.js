import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { words } from '../data/wordsData';

const WordsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const isWeb = Platform.OS === 'web';

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(words.map(word => word.category)))];

  // Filter words by selected category
  const filteredWords = selectedCategory === 'All' 
    ? words 
    : words.filter(word => word.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.headerTitle, isWeb && styles.webHeaderTitle]}>
          Gujarati Words
        </Text>
        <Text style={[styles.headerSubtitle, isWeb && styles.webHeaderSubtitle]}>
          Learn Gujarati vocabulary organized by categories
        </Text>
      </View>

      {/* Category Tabs */}
      <View style={[styles.tabsContainer, isWeb && styles.webTabsContainer]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScrollView}
        >
          {categories.map((category) => (
            <View
              key={category}
              style={[
                styles.tab,
                isWeb && styles.webTab,
                selectedCategory === category && styles.activeTab,
                selectedCategory === category && isWeb && styles.webActiveTab
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isWeb && styles.webTabText,
                  selectedCategory === category && styles.activeTabText,
                  selectedCategory === category && isWeb && styles.webActiveTabText
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                {category}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Category Info */}
      <View style={[styles.infoContainer, isWeb && styles.webInfoContainer]}>
        <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
          {selectedCategory === 'All' 
            ? `Showing all ${words.length} words` 
            : `Showing ${filteredWords.length} words in ${selectedCategory}`
          }
        </Text>
      </View>

      {/* Words Grid */}
      <View style={[styles.wordsContainer, isWeb && styles.webWordsContainer]}>
        {filteredWords.map((word, index) => (
          <View
            key={index}
            style={[styles.wordCard, isWeb && styles.webWordCard]}
          >
            <View style={styles.wordContent}>
              <Text style={[styles.wordText, isWeb && styles.webWordText]}>{word.word}</Text>
              <Text style={[styles.wordPronunciation, isWeb && styles.webWordPronunciation]}>{word.pronunciation}</Text>
              <Text style={[styles.wordEnglish, isWeb && styles.webWordEnglish]}>{word.english}</Text>

            </View>
          </View>
        ))}
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
    padding: 20,
    alignItems: 'center',
  },
  webHeader: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  webHeaderTitle: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  webHeaderSubtitle: {
    fontSize: 16,
  },
  tabsContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  webTabsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottom: '1px solid #e5e7eb',
  },
  tabsScrollView: {
    paddingHorizontal: 15,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  webTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  webActiveTab: {
    backgroundColor: '#1e3a8a',
    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  webTabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  webActiveTabText: {
    color: 'white',
    fontWeight: '700',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  webInfoContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    border: '1px solid #e5e7eb',
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  webInfoText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  wordsContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webWordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
  },
  wordCard: {
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
  webWordCard: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  wordContent: {
    alignItems: 'center',
    width: '100%',
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  webWordText: {
    fontSize: 28,
    marginBottom: 10,
  },
  wordPronunciation: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 6,
    textAlign: 'center',
  },
  webWordPronunciation: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 8,
    fontWeight: '500',
  },
  wordEnglish: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 10,
    textAlign: 'center',
  },
  webWordEnglish: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 12,
    fontWeight: '500',
  },
  categoryTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  webCategoryTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#0369a1',
    fontWeight: '600',
  },
  webCategoryTagText: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: '700',
  },
});

export default WordsScreen; 