import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { numbers } from '../data/gujaratiData';

const isWeb = Platform.OS === 'web';

const NumbersScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination - 10 numbers per page, starting from 1
  const numbersPerPage = 10; // 1-10, 11-20, 21-30, etc.
  const totalPages = 10; // We have 100 numbers (1-100), so 10 pages
  const startIndex = currentPage * numbersPerPage + 1; // Start from index 1 (number 1)
  const endIndex = Math.min(startIndex + numbersPerPage, 101); // Use 101 as max since array has 101 elements (0-100)
  const currentNumbers = numbers.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const getPageRange = () => {
    const start = startIndex;
    const end = endIndex - 1;
    return `${start} - ${end}`;
  };

  const getTensLabel = (pageIndex) => {
    const start = pageIndex * 10 + 1; // Start from 1, 11, 21, etc.
    const end = Math.min(start + 9, 100);
    return `${start}-${end}`;
  };

  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>અંક</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Numbers</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી અંક શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Numbers</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી અંકો ૧ થી ૧૦૦ સુધી.
          </Text>
        </View>

        <View style={[styles.paginationContainer, isWeb && styles.webPaginationContainer]}>
          <Text style={[styles.pageInfo, isWeb && styles.webPageInfo]}>
            Numbers {getPageRange()} of 0-100
          </Text>
          
          <View style={[styles.navigationButtons, isWeb && styles.webNavigationButtons]}>
            <TouchableOpacity
              style={[styles.navButton, isWeb && styles.webNavButton, currentPage === 0 && styles.disabledButton]}
              onPress={goToPreviousPage}
              disabled={currentPage === 0}
            >
              <Ionicons name="chevron-back" size={isWeb ? 20 : 24} color={currentPage === 0 ? "#ccc" : "#4ECDC4"} />
              <Text style={[styles.navButtonText, isWeb && styles.webNavButtonText, currentPage === 0 && styles.disabledText]}>Previous</Text>
            </TouchableOpacity>
            
            <View style={[styles.quickJumpContainer, isWeb && styles.webQuickJumpContainer]}>
              <Text style={[styles.quickJumpLabel, isWeb && styles.webQuickJumpLabel]}>Jump to:</Text>
              <View style={[styles.quickJumpGrid, isWeb && styles.webQuickJumpGrid]}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.quickJumpButton,
                      isWeb && styles.webQuickJumpButton,
                      currentPage === index && styles.activeQuickJumpButton
                    ]}
                    onPress={() => goToPage(index)}
                  >
                    <Text style={[
                      styles.quickJumpText,
                      isWeb && styles.webQuickJumpText,
                      currentPage === index && styles.activeQuickJumpText
                    ]}>
                      {getTensLabel(index)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TouchableOpacity
              style={[styles.navButton, isWeb && styles.webNavButton, currentPage === totalPages - 1 && styles.disabledButton]}
              onPress={goToNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <Text style={[styles.navButtonText, isWeb && styles.webNavButtonText, currentPage === totalPages - 1 && styles.disabledText]}>Next</Text>
              <Ionicons name="chevron-forward" size={isWeb ? 20 : 24} color={currentPage === totalPages - 1 ? "#ccc" : "#4ECDC4"} />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.pageNumber, isWeb && styles.webPageNumber]}>
            Page {currentPage + 1} of {totalPages}
          </Text>
        </View>

        <View style={[styles.numbersContainer, isWeb && styles.webNumbersContainer]}>
          {currentNumbers.map((number, index) => (
            <View
              key={startIndex + index}
              style={[styles.numberCard, isWeb && styles.webNumberCard]}
            >
              <View style={styles.numberContent}>
                <Text style={[styles.numberSymbol, isWeb && styles.webNumberSymbol]}>{number.number}</Text>
                <View style={styles.numberTextContainer}>
                  <Text style={[styles.numberPronunciation, isWeb && styles.webNumberPronunciation]}>{number.pronunciation}</Text>
                  <Text style={[styles.numberEnglish, isWeb && styles.webNumberEnglish]}>{number.english}</Text>
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
    maxWidth: 800,
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
    maxWidth: 600,
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
  paginationContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  webPaginationContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    maxWidth: 600,
    alignSelf: 'center',
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  webPageInfo: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  webNavigationButtons: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  webNavButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginHorizontal: 5,
  },
  webNavButtonText: {
    fontSize: 16,
    color: '#3498db',
    marginHorizontal: 8,
  },
  disabledText: {
    color: '#ccc',
  },
  quickJumpContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  webQuickJumpContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  quickJumpLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  webQuickJumpLabel: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
  },
  quickJumpGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webQuickJumpGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickJumpButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 1,
    marginVertical: 5,
    flex: 1,
    alignItems: 'center',
  },
  webQuickJumpButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
    marginVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  activeQuickJumpButton: {
    backgroundColor: '#4ECDC4',
  },
  quickJumpText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  webQuickJumpText: {
    fontSize: 12,
    color: '#34495e',
    fontWeight: '500',
  },
  activeQuickJumpText: {
    color: 'white',
  },
  pageNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  webPageNumber: {
    fontSize: 16,
    color: '#34495e',
  },
  numbersContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  webNumbersContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    maxWidth: 600,
    alignSelf: 'center',
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  numberCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  webNumberCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  numberContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberSymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginRight: 20,
    minWidth: 50,
    textAlign: 'center',
  },
  webNumberSymbol: {
    fontSize: 28,
    color: '#3498db',
    marginRight: 25,
    minWidth: 60,
  },
  numberTextContainer: {
    flex: 1,
  },
  numberPronunciation: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  webNumberPronunciation: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 5,
  },
  numberEnglish: {
    fontSize: 14,
    color: '#666',
  },
  webNumberEnglish: {
    fontSize: 16,
    color: '#34495e',
  },
});

export default NumbersScreen; 