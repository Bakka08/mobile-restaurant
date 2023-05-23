import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectScreen from './pages/SelectScreen';
import SecondScreen from './pages/SecondScreen';
import MapScreen from './pages/MapScreen';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Wait for 2 seconds before showing SelectScreen
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/loading.png')} style={styles.image}>
          <Text style={styles.logo}>Finder</Text>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#CD6785" />
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectScreen">
        <Stack.Screen name="SelectScreen" component={SelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  logo: {
    position: 'absolute',
    top: 200,
    justifyContent: 'center',
    width: 402,
    height: 211,
    overflow: 'hidden',
    fontSize: 50,
    textAlign: 'center',
    color: '#CD6785',
  },
  loading: {
    justifyContent: 'center',
    marginTop: 170,
  },
});

export default App;
