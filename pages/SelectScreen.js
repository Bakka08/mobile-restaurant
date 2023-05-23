import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zones, setZones] = useState([]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedZone(null);
  };

  useEffect(() => {
    fetch('https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/all')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetch(`https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/${selectedCity}/zones`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.log(error));
    } else {
      setZones([]);
    }
  }, [selectedCity]);

  const handleSearchPress = () => {
    navigation.navigate('SecondScreen', {
      selectedCity: selectedCity,
      selectedZone: selectedZone,
    });
  };

  return (
    <ImageBackground source={require('../assets/bg1.png')} style={styles.container}>
      <Text style={styles.logo}>Finder</Text>

      <View style={styles.pickerContainer1}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
        >
          <Picker.Item label="Select the city" value={null}  />
          {cities.map(city => (
            <Picker.Item key={city.id} label={city.nom} value={city.nom}  />
          ))}
        </Picker>
      </View>

      {/* Conditionally render the zone select and button */}
      {selectedCity && (
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={selectedZone}
            onValueChange={(itemValue) => setSelectedZone(itemValue)}
            enabled={selectedCity !== null}
          >
            <Picker.Item label="Select the zone" value={null} />
            {zones.map(zone => (
              <Picker.Item key={zone.id} label={zone.nom} value={zone.nom}  />
            ))}
          </Picker>
        </View>
      )}

      {/* Conditionally render the search button */}
      {selectedCity && selectedZone && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSearchPress}>
          <Image source={require('../assets/icon1.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer1: {
    backgroundColor: '#30464F',
    width: '80%',
    marginVertical: 10,
    height: '8%',
    borderRadius: 20,
  },
  pickerContainer2: {
    backgroundColor: '#FD7F08',
    width: '80%',
    marginVertical: 10,
    height: '8%',
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10, // Adjust the marginTop value to move the button higher
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 50,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: -3,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    color: 'white',
  },
  PickerItem : {
    color : 'white'
    
  },
});

export default SelectScreen;
