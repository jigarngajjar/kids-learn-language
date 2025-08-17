import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isWeb = Platform.OS === 'web';

const AlphabetScreen = ({ navigation }) => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>મૂળાક્ષરો</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Alphabets</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી મૂળાક્ષરો શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Alphabets</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        {isWeb && <View style={styles.webCardsGrid}>
          <TouchableOpacity
            style={[styles.card, isWeb && styles.webCard]}
            onPress={() => navigation.navigate('Vowels')}
            activeOpacity={0.8}
          >
            <View style={[styles.cardHeader, isWeb && styles.webCardHeader]}>
              <Ionicons name="heart" size={isWeb ? 32 : 40} color="#FF6B6B" />
              <View style={[styles.cardTitleContainer, isWeb && styles.webCardTitleContainer]}>
                <Text style={[styles.cardTitle, isWeb && styles.webCardTitle]}>સ્વર</Text>
                <Text style={[styles.cardEnglishTitle, isWeb && styles.webCardEnglishTitle]}>Vowels</Text>
              </View>
            </View>
            <Text style={[styles.cardDescription, isWeb && styles.webCardDescription]}>
              Learn Gujarati vowels (સ્વર) - the basic sounds that form the foundation of the language.
            </Text>
            <View style={[styles.cardFooter, isWeb && styles.webCardFooter]}>
              <Text style={[styles.cardCount, isWeb && styles.webCardCount]}>13 Vowels</Text>
              <Ionicons name="arrow-forward" size={isWeb ? 16 : 20} color="#FF6B6B" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, isWeb && styles.webCard]}
            onPress={() => navigation.navigate('Consonants')}
            activeOpacity={0.8}
          >
            <View style={[styles.cardHeader, isWeb && styles.webCardHeader]}>
              <Ionicons name="grid" size={isWeb ? 32 : 40} color="#4ECDC4" />
              <View style={[styles.cardTitleContainer, isWeb && styles.webCardTitleContainer]}>
                <Text style={[styles.cardTitle, isWeb && styles.webCardTitle]}>વ્યંજન</Text>
                <Text style={[styles.cardEnglishTitle, isWeb && styles.webCardEnglishTitle]}>Consonants</Text>
              </View>
            </View>
            <Text style={[styles.cardDescription, isWeb && styles.webCardDescription]}>
              Learn Gujarati consonants (વ્યંજન) - the building blocks for forming words.
            </Text>
            <View style={[styles.cardFooter, isWeb && styles.webCardFooter]}>
              <Text style={[styles.cardCount, isWeb && styles.webCardCount]}>34 Consonants</Text>
              <Ionicons name="arrow-forward" size={isWeb ? 16 : 20} color="#4ECDC4" />
            </View>
          </TouchableOpacity>
        </View>}

        {!isWeb && <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Vowels')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="heart" size={40} color="#FF6B6B" />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>સ્વર</Text>
                <Text style={styles.cardEnglishTitle}>Vowels</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>
              Learn Gujarati vowels (સ્વર) - the basic sounds that form the foundation of the language.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardCount}>13 Vowels</Text>
              <Ionicons name="arrow-forward" size={20} color="#FF6B6B" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Consonants')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="grid" size={40} color="#4ECDC4" />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>વ્યંજન</Text>
                <Text style={styles.cardEnglishTitle}>Consonants</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>
              Learn Gujarati consonants (વ્યંજન) - the building blocks for forming words.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardCount}>34 Consonants</Text>
              <Ionicons name="arrow-forward" size={20} color="#4ECDC4" />
            </View>
          </TouchableOpacity>
        </>}

        <View style={[styles.infoCard, isWeb && styles.webInfoCard]}>
          <Ionicons name="information-circle" size={isWeb ? 24 : 30} color="#45B7D1" />
          <View style={[styles.infoContent, isWeb && styles.webInfoContent]}>
            <Text style={[styles.infoTitle, isWeb && styles.webInfoTitle]}>ગુજરાતી મૂળાક્ષરો</Text>
            <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
              Gujarati alphabet consists of 47 letters: 13 vowels and 34 consonants. 
              Each letter has a unique sound and pronunciation.
            </Text>
          </View>
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
  webCardsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '15px',
    paddingHorizontal: '20px',
    maxWidth: '100%',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  webCard: {
    marginBottom: 0,
    borderRadius: 20,
    width: 200,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  webCardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitleContainer: {
    marginLeft: 15,
    flex: 1,
  },
  webCardTitleContainer: {
    marginLeft: 0,
    marginTop: 8,
    alignItems: 'center',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  webCardTitle: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
  },
  cardEnglishTitle: {
    fontSize: 14,
    color: '#666',
  },
  webCardEnglishTitle: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  webCardDescription: {
    fontSize: 10,
    color: '#2c3e50',
    lineHeight: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webCardFooter: {
    justifyContent: 'center',
  },
  cardCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  webCardCount: {
    fontSize: 10,
    color: '#2c3e50',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  webInfoCard: {
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    padding: 25,
    maxWidth: 800,
    alignSelf: 'center',
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  webInfoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  webInfoTitle: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  webInfoText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
});

export default AlphabetScreen; 