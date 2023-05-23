import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SecondScreen = ({ route }) => {
  const { selectedCity, selectedZone } = route.params;

  const [restaurants, setRestaurants] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [series, setSeries] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    fetch('https://1cd9-41-141-208-127.eu.ngrok.io/api/serie/all')
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('https://1cd9-41-141-208-127.eu.ngrok.io/api/sepecialite/all')
      .then(response => response.json())
      .then(data => setSpecialites(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedSerie === null && selectedSpeciality === null && selectedCity && selectedZone) {
      const apiUrl = `https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSpeciality && selectedSerie === null) {
      const apiUrl = `https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/specialite=${selectedSpeciality}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSerie && selectedSpeciality === null) {
      const apiUrl = `https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/serie=${selectedSerie}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSpeciality && selectedSerie) {
      const apiUrl = `https://1cd9-41-141-208-127.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/specialite=${selectedSpeciality}/serie=${selectedSerie}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setRestaurants([]);
    }
  }, [selectedCity, selectedZone, selectedSpeciality, selectedSerie]);

  const handleSerieChange = serie => {
    setSelectedSerie(serie);
  };

  const handleSpecialityChange = speciality => {
    setSelectedSpeciality(speciality);
  };

  function RestaurantList(restaurant) {
    const navigation = useNavigation();
    
    const handleLocatePress = () => {
      navigation.navigate('MapScreen', {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      });
    };

    return (
      <View style={styles.container2} key={restaurant.id}>
      <View style={styles.item}>
      <Image style={styles.image}source={{ uri: restaurant.photos[0].url }}/>

        <View style={styles.details}>
          <Text style={styles.name}>{restaurant.nom}</Text>
          <Text style={styles.address}>{restaurant.adresse}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
          <Text style={styles.hours}>{restaurant.hourOpened} - {restaurant.hourClosed}</Text>
          <View style={styles.container3}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLocatePress}>
              <Image source={require('../assets/map.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    
    
    
    
    );
  }

  return (
    <ImageBackground source={require('../assets/bg1.png')} style={styles.container}>
      <View><Text style={styles.logo}>Finder</Text>
      </View>
      <Image source={require('../assets/loop.png')} style={styles.buttonIcon2} />
      <View style={styles.pickerContainer1}>
       
        <Picker
          selectedValue={selectedSerie}
          onValueChange={itemValue => handleSerieChange(itemValue)}
        >
          <Picker.Item label="Serie" value={null}  />
          {series.map(serie => (
            <Picker.Item key={serie.id} label={serie.nom} value={serie.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer2}>
    
        <Picker
          selectedValue={selectedSpeciality}
          onValueChange={itemValue => handleSpecialityChange(itemValue)}
        >
          <Picker.Item label="Speciality" value={null} />
          {specialites.map(specialite => (
            <Picker.Item key={specialite.id} label={specialite.nom} value={specialite.id} />
          ))}
        </Picker>
      </View>

      <ScrollView >
        <View style={styles.ScrollView} >
          {restaurants.map(restaurant => RestaurantList(restaurant))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10, // Adjust the marginTop value to move the button higher
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 50,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    backgroundColor : '',
  },
  ScrollView : {
 
    borderRadius : 10,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0286FF',
  },
  pickerContainer1: {
    backgroundColor: '#30464F',
    width: '36%',
    marginVertical: 10,
    height: '6%',
    borderRadius: 20,
    top: 10,
    left: -100,
  },
  pickerContainer2: {
    backgroundColor: '#FD7F08',
    width: '36%',
    marginVertical: 10,
    height: '6%',
    borderRadius: 20,
    top: 5,
    left: -100,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  logo: {
  
    top: 30,
    left: -130,
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    color: 'white',
    
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    width: '95%',
    marginBottom : 10,
    margin: '1%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  hours: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#19f5aa',
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon2: {
    width: 60,
    height: 60,
    backgroundColor : '#D9D9D9',
    borderRadius : 20,
    top: 108,
    left: 60,
  },
});

export default SecondScreen;
