import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AlphabetScreen from './src/screens/AlphabetScreen';
import NumbersScreen from './src/screens/NumbersScreen';
import DiacriticsScreen from './src/screens/DiacriticsScreen';
import BarakhadiScreen from './src/screens/BarakhadiScreen';
import WordsScreen from './src/screens/WordsScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import VowelsScreen from './src/screens/VowelsScreen';
import ConsonantsScreen from './src/screens/ConsonantsScreen';
import GamesScreen from './src/screens/GamesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AlphabetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AlphabetMain" 
        component={AlphabetScreen}
        options={{ title: 'મૂળાક્ષરો (Alphabets)' }}
      />
      <Stack.Screen 
        name="Vowels" 
        component={VowelsScreen}
        options={{ title: 'સ્વર (Vowels)' }}
      />
      <Stack.Screen 
        name="Consonants" 
        component={ConsonantsScreen}
        options={{ title: 'વ્યંજન (Consonants)' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Alphabets') {
              iconName = focused ? 'text' : 'text-outline';
            } else if (route.name === 'Numbers') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Diacritics') {
              iconName = focused ? 'language' : 'language-outline';
            } else if (route.name === 'Barakhadi') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Words') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Stories') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Games') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#FF6B6B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'ઘર (Home)' }}
        />
        <Tab.Screen 
          name="Alphabets" 
          component={AlphabetStack}
          options={{ headerShown: false, title: 'મૂળાક્ષરો' }}
        />
        <Tab.Screen 
          name="Numbers" 
          component={NumbersScreen}
          options={{ title: 'અંક (Numbers)' }}
        />
        <Tab.Screen 
          name="Diacritics" 
          component={DiacriticsScreen}
          options={{ title: 'માત્રા (Diacritics)' }}
        />
        <Tab.Screen 
          name="Barakhadi" 
          component={BarakhadiScreen}
          options={{ title: 'બારાખડી' }}
        />
        <Tab.Screen 
          name="Words" 
          component={WordsScreen}
          options={{ title: 'શબ્દો (Words)' }}
        />
        <Tab.Screen 
          name="Stories" 
          component={StoriesScreen}
          options={{ title: 'બાળવાર્તા (Stories)' }}
        />
        <Tab.Screen 
          name="Games" 
          component={GamesScreen}
          options={{ title: 'ગેમ્સ (Games)' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 