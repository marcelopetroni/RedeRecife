import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Switch, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Profile from '../../imagens/profile.png';
import Rec from '../../imagens/rec.png';
import Social from '../../imagens/social.png';
import Abrigo from '../../imagens/abrigo.png';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env';

const pic = Profile;
const abrigos = [
  {
    id: 1,
    name: "Escola Santa Maria",
    latitude: -8.047562,
    longitude: -34.876964,
  },
  {
    id: 2,
    name: "Casa de Todes",
    latitude: -8.048462, // Ajustada ligeiramente
    longitude: -34.877864, // Ajustada ligeiramente
  },
  {
    id: 3,
    name: "Hospital Naval",
    latitude: -8.046362, // Ajustada ligeiramente
    longitude: -34.875764, // Ajustada ligeiramente
  },
];

const movimentos = [
  {
    id: 1,
    name: "Location 4",
    latitude: -8.045562,
    longitude: -34.874964,
  },
  {
    id: 2,
    name: "Location 5",
    latitude: -8.049462, // Ajustada ligeiramente
    longitude: -34.878864, // Ajustada ligeiramente
  },
  {
    id: 3,
    name: "Location 6",
    latitude: -8.044362, // Ajustada ligeiramente
    longitude: -34.873764, // Ajustada ligeiramente
  },
];

export default function TelaHome() {
  const [region, setRegion] = useState({
    latitude: -8.047562,
    longitude: -34.876964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [showAbrigados, setShowAbrigados] = useState(true);
  const [showMovimentos, setShowMovimentos] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const mapRef = useRef(null);

  const handleLocationSelected = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setRegion({
      ...region,
      latitude: lat,
      longitude: lng,
    });
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  const toggleAbrigados = () => {
    setShowAbrigados(!showAbrigados);
  };

  const toggleMovimentos = () => {
    setShowMovimentos(!showMovimentos);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderFilters = () => {
    if (showFilters) {
      return (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersHeader}>Filtros</Text>
          {/* Aqui você pode adicionar os seus filtros */}
          <TouchableOpacity style={styles.filterOption}>
            <Text style={styles.filterText}>Opção 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text style={styles.filterText}>Opção 2</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <LinearGradient style={styles.container}
      colors={['#FFF', '#F2F2F2']}
      start={{ x: 0.07, y: 0 }}
      end={{ x: 1.1556, y: 1 }}
    >
      <View style={styles.header}>
        <Image source={Rec} contentFit="contain"
          style={{
            height: 50,
            marginTop: 10,
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text}>Olá, Leonardo</Text>
            <Text style={styles.smallText}>Faça parte dessa rede.</Text>
          </View>
          <View style={styles.picContainer}>
            <Image source={pic} contentFit="fill"
              style={styles.picContainer}
            />
          </View>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={toggleAbrigados} style={[styles.toggleButton, showAbrigados ? styles.activeToggle : null]}>
          <Text style={styles.toggleText}>Abrigados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMovimentos} style={[styles.toggleButton, showMovimentos ? styles.activeToggle : null]}>
          <Text style={styles.toggleText}>Movimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFilters} style={[styles.toggleButton, showFilters ? styles.activeToggle : null]}>
          <Text style={styles.toggleText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {renderFilters()}

      <GooglePlacesAutocomplete
        placeholder='Buscar endereço'
        onPress={handleLocationSelected}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: 349,
            alignSelf: 'center',
            zIndex: 1,
            bottom: 100,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 4,
            elevation: 5,
            shadowOpacity: 1,
            borderRadius: 10,
          },
          listView: { backgroundColor: 'white' }
        }}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
      >
        {showAbrigados && abrigos.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            image={Abrigo}
          />
        ))}
        {showMovimentos && movimentos.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            image={Social}
          />
        ))}
      </MapView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: 193,
    paddingVertical: 27,
    paddingHorizontal: 27,
    backgroundColor: '#02385a',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '60%',
    marginTop: 50,
  },
  text: {
    color: '#FFF',
    fontFamily: 'montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  smallText: {
    color: '#FFF',
    fontFamily: 'montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  picContainer: {
    width: 71,
    height: 71,
    borderRadius: 71,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#02385a',
  },
  activeToggle: {
    backgroundColor: '#4CAF50', // Cor de fundo quando ativo
  },
  toggleText: {
    color: '#FFF',
    fontFamily: 'montserrat',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filtersContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  filtersHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterText: {
    fontSize: 14,
  },
});
