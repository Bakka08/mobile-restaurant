import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;

  return (
    <MapView
      provider="google"
      apiKey="AIzaSyCL2iY-ZKR_hF0DhX76LF2ZoyEr1Q2c83w"
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title="Marker Title"
        description="Marker Description"
      />
    </MapView>
  );
};

export default MapScreen;
