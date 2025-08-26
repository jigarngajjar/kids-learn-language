import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { words } from '../data/wordsData';

const GamesScreen = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedGujarati, setSelectedGujarati] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [showGameMenu, setShowGameMenu] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [puzzleWord, setPuzzleWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleAttempts, setPuzzleAttempts] = useState(0);
  const [categoryWords, setCategoryWords] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [categoryScore, setCategoryScore] = useState(0);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);
  const [puzzleError, setPuzzleError] = useState(false);
  const isWeb = Platform.OS === 'web';

  // Game menu items
  const gameMenuItems = [
    {
      id: 'matching',
      title: 'Word Matching',
      description: 'Match English words with Gujarati meanings',
      icon: 'link',
      color: '#2196F3',
    },
    {
      id: 'puzzle',
      title: 'Word Puzzle',
      description: 'Unscramble Gujarati words',
      icon: 'puzzle',
      color: '#4ECDC4',
    },
    {
      id: 'category',
      title: 'Category Challenge',
      description: 'Name words in different categories',
      icon: 'list',
      color: '#A8E6CF',
    },
  ];



  // Create a new matching game
  const createNewMatchingGame = () => {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    
    const englishWords = shuffledWords.map(word => ({
      id: `eng_${word.english}`,
      text: word.english,
      category: word.category,
      matched: false
    }));
    
    const gujaratiWords = shuffledWords.map(word => ({
      id: `guj_${word.word}`,
      text: word.word,
      english: word.english,
      matched: false
    }));

    const shuffledEnglish = englishWords.sort(() => Math.random() - 0.5);
    const shuffledGujarati = gujaratiWords.sort(() => Math.random() - 0.5);

    setCurrentGame({
      englishWords: shuffledEnglish,
      gujaratiWords: shuffledGujarati
    });
    setMatchedPairs([]);
    setGameCompleted(false);
    setScore(0);
    setTotalPairs(6);
    setSelectedEnglish(null);
    setSelectedGujarati(null);
  };





  // Word Puzzle Functions
  const startPuzzleGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setPuzzleWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.word));
    setUserGuess('');
    setPuzzleScore(0);
    setPuzzleAttempts(0);
    setPuzzleSuccess(false);
    setPuzzleError(false);
  };

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handlePuzzleGuess = () => {
    console.log('handlePuzzleGuess called with userGuess:', userGuess);
    
    if (!userGuess.trim()) {
      Alert.alert('❌ Error', 'Please enter a word to guess!', [{ text: 'OK' }]);
      return;
    }
    
    setPuzzleAttempts(prev => prev + 1);
    
    // Normalize both strings for comparison (trim whitespace and normalize unicode)
    const normalizedGuess = userGuess.trim().normalize('NFC');
    const normalizedAnswer = puzzleWord.word.trim().normalize('NFC');
    
    // Debug logging
    console.log('Puzzle Debug:', {
      userGuess: userGuess,
      normalizedGuess: normalizedGuess,
      correctWord: puzzleWord.word,
      normalizedAnswer: normalizedAnswer,
      match: normalizedGuess === normalizedAnswer
    });
    
    if (normalizedGuess === normalizedAnswer) {
      console.log('Correct answer! Updating score and showing success alert...');
      setPuzzleScore(prev => prev + 1);
      
      // Clear the input and show success
      setUserGuess('');
      setPuzzleSuccess(true);
      
      // For web, show immediate success feedback
      if (isWeb) {
        console.log('Web platform - showing immediate success feedback');
        // Show success message and auto-advance after 1.5 seconds
        setTimeout(() => {
          console.log('Auto-advancing to next word on web...');
          setPuzzleSuccess(false);
          startPuzzleGame();
        }, 1500);
      }
      
      // Show success alert
      Alert.alert(
        '🎉 Correct!',
        `You unscrambled "${puzzleWord.word}" correctly!`,
        [
          { 
            text: 'Next Word', 
            onPress: () => {
              console.log('Next Word pressed, starting new puzzle...');
              startPuzzleGame();
            }
          }
        ]
      );
      
      // Fallback: Auto-advance to next word after 2 seconds if alert doesn't work
      setTimeout(() => {
        console.log('Auto-advancing to next word...');
        startPuzzleGame();
      }, 2000);
    } else {
      console.log('Incorrect answer! Showing error feedback...');
      setPuzzleError(true);
      
      // Clear error after 2 seconds
      setTimeout(() => {
        setPuzzleError(false);
      }, 2000);
      
      Alert.alert(
        '❌ Try Again',
        `Hint: Pronunciation is "${puzzleWord.pronunciation}"\nYou entered: "${userGuess}"\nCorrect answer: "${puzzleWord.word}"`,
        [{ text: 'OK' }]
      );
    }
  };



  // Category Challenge Functions
  const startCategoryGame = () => {
    const categories = ['Animals', 'Fruits', 'Vegetables', 'Birds'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = words.filter(word => word.category === randomCategory);
    
    setCurrentCategory(randomCategory);
    setCategoryWords(categoryWords);
    setCategoryScore(0);
  };

  const handleCategoryWord = (word) => {
    setCategoryScore(prev => prev + 1);
    setCategoryWords(prev => prev.filter(w => w.word !== word.word));
    
    if (categoryWords.length === 1) {
      Alert.alert(
        '🎉 Category Challenge Complete!',
        `You named all ${currentCategory} words!`,
        [
          { text: 'Play Again', onPress: startCategoryGame },
          { text: 'Back to Menu', onPress: () => setShowGameMenu(true) }
        ]
      );
    }
  };

  // Handle word selection for matching game
  const handleWordSelect = (word, type) => {
    if (type === 'english') {
      if (selectedEnglish?.id === word.id) {
        setSelectedEnglish(null);
      } else {
        setSelectedEnglish(word);
      }
      setSelectedGujarati(null);
    } else {
      if (selectedGujarati?.id === word.id) {
        setSelectedGujarati(null);
      } else {
        setSelectedGujarati(word);
      }
    }
  };

  // Check for matches
  useEffect(() => {
    if (selectedEnglish && selectedGujarati) {
      if (selectedEnglish.text === selectedGujarati.english) {
        setMatchedPairs(prev => [...prev, selectedEnglish.id, selectedGujarati.id]);
        setScore(prev => prev + 1);
        
        setCurrentGame(prev => ({
          englishWords: prev.englishWords.map(word => 
            word.id === selectedEnglish.id ? { ...word, matched: true } : word
          ),
          gujaratiWords: prev.gujaratiWords.map(word => 
            word.id === selectedGujarati.id ? { ...word, matched: true } : word
          )
        }));

        if (score + 1 === totalPairs) {
          setGameCompleted(true);
          Alert.alert(
            '🎉 Congratulations!',
            'You have successfully matched all the words!',
            [
              { text: 'Play Again', onPress: createNewMatchingGame },
              { text: 'Back to Menu', onPress: () => setShowGameMenu(true) }
            ]
          );
        }
      } else {
        Alert.alert(
          '❌ Try Again',
          'These words do not match. Keep trying!',
          [{ text: 'OK' }]
        );
      }
      
      setSelectedEnglish(null);
      setSelectedGujarati(null);
    }
  }, [selectedEnglish, selectedGujarati, score, totalPairs]);

  // Start games when selected
  useEffect(() => {
    if (activeGame === 'matching') {
      createNewMatchingGame();
    } else if (activeGame === 'puzzle') {
      startPuzzleGame();
    } else if (activeGame === 'category') {
      startCategoryGame();
    }
  }, [activeGame]);

  const isWordMatched = (wordId) => matchedPairs.includes(wordId);
  const isWordSelected = (word, type) => {
    if (type === 'english') {
      return selectedEnglish?.id === word.id;
    } else {
      return selectedGujarati?.id === word.id;
    }
  };

  // Render game menu
  const renderGameMenu = () => (
    <View style={[styles.gameMenuContainer, isWeb && styles.webGameMenuContainer]}>
      <Text style={[styles.gameMenuTitle, isWeb && styles.webGameMenuTitle]}>
        Choose a Game
      </Text>
      <Text style={[styles.gameMenuSubtitle, isWeb && styles.webGameMenuSubtitle]}>
        Select a game to start learning Gujarati in a fun way!
      </Text>
      
      <View style={[styles.gameMenuGrid, isWeb && styles.webGameMenuGrid]}>
        {gameMenuItems.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameMenuItem, isWeb && styles.webGameMenuItem]}
            onPress={() => {
              setActiveGame(game.id);
              setShowGameMenu(false);
            }}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: game.color }]}>
              <Ionicons name={game.icon} size={isWeb ? 32 : 28} color="white" />
            </View>
            <Text style={[styles.gameMenuTitle, isWeb && styles.webGameMenuTitle]}>
              {game.title}
            </Text>
            <Text style={[styles.gameMenuDescription, isWeb && styles.webGameMenuDescription]}>
              {game.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Render matching game
  const renderMatchingGame = () => (
    <View style={[styles.gameContainer, isWeb && styles.webGameContainer]}>
      {/* Score and Progress */}
      <View style={[styles.scoreContainer, isWeb && styles.webScoreContainer]}>
        <Text style={[styles.scoreText, isWeb && styles.webScoreText]}>
          Score: {score}/{totalPairs}
        </Text>
        <Text style={[styles.progressText, isWeb && styles.webProgressText]}>
          {gameCompleted ? '🎉 Game Complete!' : 'Match the words correctly'}
        </Text>
      </View>

      {/* Game Instructions */}
      <View style={[styles.instructionsContainer, isWeb && styles.webInstructionsContainer]}>
        <Ionicons name="information-circle" size={isWeb ? 24 : 20} color="#2196F3" />
        <Text style={[styles.instructionsText, isWeb && styles.webInstructionsText]}>
          Tap on an English word and then tap on its Gujarati meaning. Match all pairs to win!
        </Text>
      </View>

      {/* Game Area */}
      {currentGame && (
        <>
          {/* English Words */}
          <View style={[styles.wordsSection, isWeb && styles.webWordsSection]}>
            <Text style={[styles.sectionTitle, isWeb && styles.webSectionTitle]}>
              English Words
            </Text>
            <View style={[styles.wordsGrid, isWeb && styles.webWordsGrid]}>
              {currentGame.englishWords.map((word) => (
                <TouchableOpacity
                  key={word.id}
                  style={[
                    styles.wordCard,
                    isWeb && styles.webWordCard,
                    isWordMatched(word.id) && styles.matchedCard,
                    isWordSelected(word, 'english') && styles.selectedCard,
                    isWordMatched(word.id) && isWeb && styles.webMatchedCard,
                    isWordSelected(word, 'english') && isWeb && styles.webSelectedCard
                  ]}
                  onPress={() => !isWordMatched(word.id) && handleWordSelect(word, 'english')}
                  disabled={isWordMatched(word.id)}
                >
                  <Text style={[
                    styles.wordText,
                    isWeb && styles.webWordText,
                    isWordMatched(word.id) && styles.matchedText,
                    isWordSelected(word, 'english') && styles.selectedText
                  ]}>
                    {word.text}
                  </Text>
                  {isWordMatched(word.id) && (
                    <Ionicons name="checkmark-circle" size={isWeb ? 24 : 20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gujarati Words */}
          <View style={[styles.wordsSection, isWeb && styles.webWordsSection]}>
            <Text style={[styles.sectionTitle, isWeb && styles.webSectionTitle]}>
              Gujarati Words
            </Text>
            <View style={[styles.wordsGrid, isWeb && styles.webWordsGrid]}>
              {currentGame.gujaratiWords.map((word) => (
                <TouchableOpacity
                  key={word.id}
                  style={[
                    styles.wordCard,
                    isWeb && styles.webWordCard,
                    isWordMatched(word.id) && styles.matchedCard,
                    isWordSelected(word, 'gujarati') && styles.selectedCard,
                    isWordMatched(word.id) && isWeb && styles.webMatchedCard,
                    isWordSelected(word, 'gujarati') && isWeb && styles.webSelectedCard
                  ]}
                  onPress={() => !isWordMatched(word.id) && handleWordSelect(word, 'gujarati')}
                  disabled={isWordMatched(word.id)}
                >
                  <Text style={[
                    styles.wordText,
                    isWeb && styles.webWordText,
                    isWordMatched(word.id) && styles.matchedText,
                    isWordSelected(word, 'gujarati') && styles.selectedText
                  ]}>
                    {word.text}
                  </Text>
                  {isWordMatched(word.id) && (
                    <Ionicons name="checkmark-circle" size={isWeb ? 24 : 20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );



  // Render Word Puzzle game
  const renderPuzzleGame = () => (
    <View style={[styles.gameContainer, isWeb && styles.webGameContainer]}>
      <View style={[styles.scoreContainer, isWeb && styles.webScoreContainer]}>
        <Text style={[styles.scoreText, isWeb && styles.webScoreText]}>
          Score: {puzzleScore}
        </Text>
        <Text style={[styles.progressText, isWeb && styles.webProgressText]}>
          Attempts: {puzzleAttempts}
        </Text>
      </View>

      {puzzleWord && (
        <View style={[styles.puzzleContainer, isWeb && styles.webPuzzleContainer]}>
          <Text style={[styles.puzzleTitle, isWeb && styles.webPuzzleTitle]}>
            Unscramble the Gujarati Word
          </Text>
          <Text style={[styles.scrambledWord, isWeb && styles.webScrambledWord]}>
            {scrambledWord}
          </Text>

          
          {puzzleSuccess && (
            <View style={[styles.successContainer, isWeb && styles.webSuccessContainer]}>
              <Ionicons name="checkmark-circle" size={isWeb ? 32 : 28} color="#10B981" />
              <Text style={[styles.successText, isWeb && styles.webSuccessText]}>
                🎉 Correct! Moving to next word...
              </Text>
            </View>
          )}
          
          {puzzleError && (
            <View style={[styles.errorContainer, isWeb && styles.webErrorContainer]}>
              <Ionicons name="close-circle" size={isWeb ? 32 : 28} color="#EF4444" />
              <Text style={[styles.errorText, isWeb && styles.webErrorText]}>
                ❌ Incorrect! Try again...
              </Text>
            </View>
          )}
          
          <View style={[styles.inputContainer, isWeb && styles.webInputContainer]}>
            <TextInput
              style={[styles.puzzleInput, isWeb && styles.webPuzzleInput]}
              value={userGuess}
              onChangeText={setUserGuess}
              placeholder="Enter the unscrambled Gujarati word..."
              placeholderTextColor="#9ca3af"
              onSubmitEditing={handlePuzzleGuess}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.puzzleButton, isWeb && styles.webPuzzleButton]}
              onPress={handlePuzzleGuess}
            >
              <Text style={[styles.puzzleButtonText, isWeb && styles.webPuzzleButtonText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );



  // Render Category Challenge
  const renderCategoryGame = () => (
    <View style={[styles.gameContainer, isWeb && styles.webGameContainer]}>
      <View style={[styles.scoreContainer, isWeb && styles.webScoreContainer]}>
        <Text style={[styles.scoreText, isWeb && styles.webScoreText]}>
          Category: {currentCategory}
        </Text>
        <Text style={[styles.progressText, isWeb && styles.webProgressText]}>
          Words found: {categoryScore}
        </Text>
      </View>

      <View style={[styles.categoryContainer, isWeb && styles.webCategoryContainer]}>
        <Text style={[styles.categoryTitle, isWeb && styles.webCategoryTitle]}>
          Name all {currentCategory} words
        </Text>
        <Text style={[styles.categoryInstruction, isWeb && styles.webCategoryInstruction]}>
          Tap on words that belong to this category
        </Text>
        
        <View style={[styles.categoryWordsGrid, isWeb && styles.webCategoryWordsGrid]}>
          {categoryWords.map((word) => (
            <TouchableOpacity
              key={word.word}
              style={[styles.categoryWordCard, isWeb && styles.webCategoryWordCard]}
              onPress={() => handleCategoryWord(word)}
            >
              <Text style={[styles.categoryWordText, isWeb && styles.webCategoryWordText]}>
                {word.word}
              </Text>
              <Text style={[styles.categoryWordEnglish, isWeb && styles.webCategoryWordEnglish]}>
                {word.english}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  // Render placeholder for other games
  const renderPlaceholderGame = () => (
    <View style={[styles.gameContainer, isWeb && styles.webGameContainer]}>
      <View style={[styles.placeholderContainer, isWeb && styles.webPlaceholderContainer]}>
        <Ionicons name="construct" size={isWeb ? 80 : 60} color="#6b7280" />
        <Text style={[styles.placeholderTitle, isWeb && styles.webPlaceholderTitle]}>
          Coming Soon!
        </Text>
        <Text style={[styles.placeholderText, isWeb && styles.webPlaceholderText]}>
          This game is under development. Check back soon!
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <Text style={[styles.headerTitle, isWeb && styles.webHeaderTitle]}>
          Gujarati Learning Games
        </Text>
        <Text style={[styles.headerSubtitle, isWeb && styles.webHeaderSubtitle]}>
          Learn Gujarati through fun interactive games
        </Text>
      </View>

      {/* Back to Menu Button */}
      {!showGameMenu && (
        <View style={[styles.backButtonContainer, isWeb && styles.webBackButtonContainer]}>
          <TouchableOpacity
            style={[styles.backButton, isWeb && styles.webBackButton]}
            onPress={() => setShowGameMenu(true)}
          >
            <Ionicons name="arrow-back" size={isWeb ? 20 : 18} color="white" />
            <Text style={[styles.backButtonText, isWeb && styles.webBackButtonText]}>
              Back to Games
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Game Content */}
      {showGameMenu && renderGameMenu()}
      {!showGameMenu && activeGame === 'matching' && renderMatchingGame()}
      {!showGameMenu && activeGame === 'puzzle' && renderPuzzleGame()}
      {!showGameMenu && activeGame === 'category' && renderCategoryGame()}

      {/* Action Buttons */}
      {!showGameMenu && (
        <View style={[styles.buttonContainer, isWeb && styles.webButtonContainer]}>
          {activeGame === 'matching' && (
            <TouchableOpacity
              style={[styles.newGameButton, isWeb && styles.webNewGameButton]}
              onPress={createNewMatchingGame}
            >
              <Ionicons name="refresh" size={isWeb ? 24 : 20} color="white" />
              <Text style={[styles.newGameButtonText, isWeb && styles.webNewGameButtonText]}>
                New Game
              </Text>
            </TouchableOpacity>
          )}
          {activeGame === 'puzzle' && (
            <TouchableOpacity
              style={[styles.newGameButton, isWeb && styles.webNewGameButton]}
              onPress={startPuzzleGame}
            >
              <Ionicons name="refresh" size={isWeb ? 24 : 20} color="white" />
              <Text style={[styles.newGameButtonText, isWeb && styles.webNewGameButtonText]}>
                New Puzzle
              </Text>
            </TouchableOpacity>
          )}
          {activeGame === 'category' && (
            <TouchableOpacity
              style={[styles.newGameButton, isWeb && styles.webNewGameButton]}
              onPress={startCategoryGame}
            >
              <Ionicons name="refresh" size={isWeb ? 24 : 20} color="white" />
              <Text style={[styles.newGameButtonText, isWeb && styles.webNewGameButtonText]}>
                New Category Challenge
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  backButtonContainer: {
    padding: 15,
  },
  webBackButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    backgroundColor: '#6b7280',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  webBackButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    cursor: 'pointer',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  webBackButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  gameMenuContainer: {
    padding: 20,
  },
  webGameMenuContainer: {
    padding: 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  gameMenuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  webGameMenuTitle: {
    fontSize: 28,
    marginBottom: 15,
  },
  gameMenuSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  webGameMenuSubtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  gameMenuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  webGameMenuGrid: {
    gap: 20,
  },
  gameMenuItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  webGameMenuItem: {
    width: 280,
    borderRadius: 20,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  gameIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  gameMenuDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  webGameMenuDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  scoreContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  webScoreContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    border: '1px solid #e5e7eb',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  webScoreText: {
    fontSize: 20,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  webProgressText: {
    fontSize: 16,
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  webInstructionsContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#dbeafe',
  },
  instructionsText: {
    fontSize: 14,
    color: '#0369a1',
    marginLeft: 10,
    flex: 1,
  },
  webInstructionsText: {
    fontSize: 16,
    marginLeft: 15,
  },
  gameContainer: {
    padding: 15,
  },
  webGameContainer: {
    paddingHorizontal: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  wordsSection: {
    marginBottom: 20,
  },
  webWordsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  webSectionTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  webWordsGrid: {
    gap: 15,
  },
  wordCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    minWidth: 100,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  webWordCard: {
    padding: 20,
    minWidth: 120,
    borderRadius: 15,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selectedCard: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  webSelectedCard: {
    borderColor: '#1e3a8a',
    backgroundColor: '#dbeafe',
    transform: 'scale(1.05)',
  },
  matchedCard: {
    backgroundColor: '#d1fae5',
    borderColor: '#10B981',
  },
  webMatchedCard: {
    backgroundColor: '#d1fae5',
    borderColor: '#10B981',
    opacity: 0.8,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  webWordText: {
    fontSize: 18,
  },
  selectedText: {
    color: '#2196F3',
  },
  matchedText: {
    color: '#10B981',
  },

  placeholderContainer: {
    backgroundColor: 'white',
    padding: 40,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  webPlaceholderContainer: {
    padding: 60,
    marginHorizontal: 20,
    borderRadius: 25,
    border: '1px solid #e5e7eb',
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 10,
  },
  webPlaceholderTitle: {
    fontSize: 28,
    marginTop: 25,
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  webPlaceholderText: {
    fontSize: 18,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  webButtonContainer: {
    paddingVertical: 30,
  },
  newGameButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  webNewGameButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 0,
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  webNewGameButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  // Puzzle Game Styles
  puzzleContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  webPuzzleContainer: {
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    border: '1px solid #e5e7eb',
  },
  puzzleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  webPuzzleTitle: {
    fontSize: 24,
    marginBottom: 25,
  },
  scrambledWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  webScrambledWord: {
    fontSize: 36,
    marginBottom: 20,
  },
  puzzleHint: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  webPuzzleHint: {
    fontSize: 18,
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  webInputContainer: {
    gap: 15,
  },
  puzzleInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  webPuzzleInput: {
    padding: 15,
    fontSize: 18,
    borderRadius: 12,
  },
  puzzleButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  webPuzzleButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 12,
    cursor: 'pointer',
  },
  puzzleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webPuzzleButtonText: {
    fontSize: 18,
  },


  // Category Game Styles
  categoryContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  webCategoryContainer: {
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    border: '1px solid #e5e7eb',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  webCategoryTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  categoryInstruction: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  webCategoryInstruction: {
    fontSize: 18,
    marginBottom: 25,
  },
  categoryWordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  webCategoryWordsGrid: {
    gap: 15,
  },
  categoryWordCard: {
    backgroundColor: '#A8E6CF',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  webCategoryWordCard: {
    padding: 20,
    borderRadius: 12,
    minWidth: 140,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  categoryWordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  webCategoryWordText: {
    fontSize: 18,
    marginBottom: 8,
  },
  categoryWordEnglish: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  webCategoryWordEnglish: {
    fontSize: 16,
  },
  
  // Success Indicator Styles
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  webSuccessContainer: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    border: '2px solid #10B981',
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065F46',
    marginLeft: 10,
  },
  webSuccessText: {
    fontSize: 18,
    marginLeft: 12,
  },
  
  // Error Indicator Styles
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  webErrorContainer: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    border: '2px solid #EF4444',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#991B1B',
    marginLeft: 10,
  },
  webErrorText: {
    fontSize: 18,
    marginLeft: 12,
  },
});

export default GamesScreen;
