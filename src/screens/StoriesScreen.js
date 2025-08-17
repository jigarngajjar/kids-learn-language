import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { stories } from '../data/storiesData';

const isWeb = Platform.OS === 'web';

const StoriesScreen = () => {
  return (
    <ScrollView style={[styles.container, isWeb && styles.webContainer]}>
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.title, isWeb && styles.webTitle]}>કથાઓ</Text>
        <Text style={[styles.englishTitle, isWeb && styles.webEnglishTitle]}>Stories</Text>
        <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>ગુજરાતી કથાઓ શીખો</Text>
        <Text style={[styles.englishSubtitle, isWeb && styles.webEnglishSubtitle]}>Learn Gujarati Stories</Text>
      </View>

      <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={[styles.infoBox, isWeb && styles.webInfoBox]}>
          <Ionicons name="information-circle" size={isWeb ? 20 : 24} color="#4ECDC4" />
          <Text style={[styles.infoText, isWeb && styles.webInfoText]}>
            ગુજરાતી કથાઓ અને તેમના સંદેશ.
          </Text>
        </View>

        <View style={[styles.storiesContainer, isWeb && styles.webStoriesContainer]}>
          {stories.map((story, index) => (
            <View
              key={index}
              style={[styles.storyCard, isWeb && styles.webStoryCard]}
            >
              <View style={[styles.storyHeader, isWeb && styles.webStoryHeader]}>
                <Text style={[styles.storyTitle, isWeb && styles.webStoryTitle]}>{story.title}</Text>
                <Text style={[styles.storyEnglishTitle, isWeb && styles.webStoryEnglishTitle]}>{story.englishTitle}</Text>
              </View>
              
              <View style={[styles.storyContent, isWeb && styles.webStoryContent]}>
                <Text style={[styles.storyText, isWeb && styles.webStoryText]}>{story.content}</Text>
                <Text style={[styles.storyEnglishText, isWeb && styles.webStoryEnglishText]}>{story.englishContent}</Text>
              </View>
              
              <View style={[styles.moralSection, isWeb && styles.webMoralSection]}>
                <Text style={[styles.moralLabel, isWeb && styles.webMoralLabel]}>સંદેશ / Moral:</Text>
                <Text style={[styles.moralGujarati, isWeb && styles.webMoralGujarati]}>{story.moral}</Text>
                <Text style={[styles.moralEnglish, isWeb && styles.webMoralEnglish]}>{story.englishMoral}</Text>
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
    padding: 0,
  },
  header: {
    backgroundColor: '#DDA0DD',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  webHeader: {
    padding: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  webTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  englishTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  webEnglishTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  webSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  englishSubtitle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  webEnglishSubtitle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  webContent: {
    padding: 0,
  },
  infoBox: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  webInfoBox: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#7B1FA2',
    marginLeft: 10,
    flex: 1,
  },
  webInfoText: {
    fontSize: 14,
    color: '#7B1FA2',
    marginLeft: 10,
    flex: 1,
  },
  storiesContainer: {
    marginBottom: 30,
  },
  webStoriesContainer: {
    marginBottom: 30,
  },
  storyCard: {
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
  webStoryCard: {
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
  storyHeader: {
    marginBottom: 15,
  },
  webStoryHeader: {
    marginBottom: 15,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  webStoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  storyEnglishTitle: {
    fontSize: 14,
    color: '#666',
  },
  webStoryEnglishTitle: {
    fontSize: 14,
    color: '#666',
  },
  storyContent: {
    marginBottom: 15,
  },
  webStoryContent: {
    marginBottom: 15,
  },
  storyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  webStoryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  storyEnglishText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  webStoryEnglishText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  moralSection: {
    marginTop: 15,
  },
  webMoralSection: {
    marginTop: 15,
  },
  moralLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  webMoralLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  moralGujarati: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: '500',
    marginBottom: 5,
  },
  webMoralGujarati: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: '500',
    marginBottom: 5,
  },
  moralEnglish: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  webMoralEnglish: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },

});

export default StoriesScreen; 