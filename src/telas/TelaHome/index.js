import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Profile from '../../imagens/profile.png';
import Rec from '../../imagens/logo.png';
import Social from '../../imagens/social.png';
import Abrigo from '../../imagens/abrigo.png';
import Lupa from '../../imagens/lupa.png';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
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
    latitude: -8.045562,
    longitude: -34.879,
  },
  {
    id: 3,
    name: "Hospital Naval",
    latitude: -8.040362,
    longitude: -34.880764,
  },
];

const movimentos = [
  {
    id: 4,
    name: "Location 4",
    latitude: -8.050562,
    longitude: -34.874964,
  },
  {
    id: 5,
    name: "Location 5",
    latitude: -8.055462,
    longitude: -34.878864,
  },
  {
    id: 6,
    name: "Location 6",
    latitude: -8.052362,
    longitude: -34.868764,
  },
];

const areasDeAlagamento = [
  {
    id: 7,
    coordinates: [
      { latitude: -8.0465, longitude: -34.8765 },
      { latitude: -8.0475, longitude: -34.8775 },
      { latitude: -8.0460, longitude: -34.8780 },
      { latitude: -8.0450, longitude: -34.8770 },
      { latitude: -8.0455, longitude: -34.8760 },
    ],
    color: 'rgba(0, 0, 255, 0.5)',
  },
  {
    id: 8,
    coordinates: [
      { latitude: -8.0480, longitude: -34.8755 },
      { latitude: -8.0485, longitude: -34.8765 },
      { latitude: -8.0475, longitude: -34.8770 },
      { latitude: -8.0465, longitude: -34.8760 },
    ],
    color: 'rgba(0, 0, 255, 0.5)',
  },
  {
    id: 9,
    coordinates: [
      { latitude: -8.0445, longitude: -34.8745 },
      { latitude: -8.0455, longitude: -34.8755 },
      { latitude: -8.0440, longitude: -34.8760 },
      { latitude: -8.0430, longitude: -34.8750 },
      { latitude: -8.0435, longitude: -34.8740 },
    ],
    color: 'rgba(0, 0, 255, 0.5)',
  },
];

const mapasDeCalor = [
  {
    id: 10,
    center: { latitude: -8.042, longitude: -34.900 },
    radius: 5000,
    color: 'rgba(255, 165, 0, 0.5)',
  },
];

const mapasDeslizamento = [
  {
    id: 11,
    center: { latitude: -8.045, longitude: -34.874 },
    radius: 300,
    color: 'rgba(255, 0, 0, 0.5)',
  },
  {
    id: 12,
    center: { latitude: -8.047, longitude: -34.878 },
    radius: 400,
    color: 'rgba(255, 0, 0, 0.5)',
  },
];

export default function TelaHome() {
  const [region, setRegion] = useState({
    latitude: -8.047562,
    longitude: -34.876964,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const navigation = useNavigation();

  const handleMarkerPress = (id) => {
    navigation.navigate('TelaAbrigo', { id });
  };

  const handleMarkerPressMovimento = (id) => {
    navigation.navigate('TelaMovimento', { id });
  };

  const [showAbrigados, setShowAbrigados] = useState(true);
  const [showMovimentos, setShowMovimentos] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

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
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
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

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const renderFilters = () => {
    if (showFilters) {
      return (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersHeader}>Filtros</Text>
          <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('areasDeAlagamento')}>
            <View style={styles.checkbox}>
              {selectedFilters.includes('areasDeAlagamento') && <View style={styles.checkboxChecked} />}
            </View>
            <Text style={styles.filterText}>Áreas de Alagamento</Text>
            <View style={[styles.legendCircle, { backgroundColor: 'blue' }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('mapasDeCalor')}>
            <View style={styles.checkbox}>
              {selectedFilters.includes('mapasDeCalor') && <View style={styles.checkboxChecked} />}
            </View>
            <Text style={styles.filterText}>Mapas de Calor</Text>
            <View style={[styles.legendCircle, { backgroundColor: 'orange' }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption} onPress={() => toggleFilter('mapasDeslizamento')}>
            <View style={styles.checkbox}>
              {selectedFilters.includes('mapasDeslizamento') && <View style={styles.checkboxChecked} />}
            </View>
            <Text style={styles.filterText}>Mapas de Deslizamento</Text>
            <View style={[styles.legendCircle, { backgroundColor: 'red' }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption} onPress={() => setSelectedFilters([])}>
            <View style={styles.checkbox} />
            <Text style={styles.filterText}>Limpar Filtros</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderPolygonsAndCircles = () => {
    let elements = [];
    if (selectedFilters.includes('areasDeAlagamento')) {
      elements = elements.concat(areasDeAlagamento);
    }
    if (selectedFilters.includes('mapasDeCalor')) {
      elements = elements.concat(mapasDeCalor);
    }
    if (selectedFilters.includes('mapasDeslizamento')) {
      elements = elements.concat(mapasDeslizamento);
    }
    return elements.map((element) => {
      if (element.coordinates) {
        return (
          <Polygon
            key={element.id}
            coordinates={element.coordinates}
            strokeColor={element.color}
            fillColor={element.color}
            strokeWidth={2}
          />
        );
      } else {
        return (
          <Circle
            key={element.id}
            center={element.center}
            radius={element.radius}
            strokeColor={element.color}
            fillColor={element.color}
          />
        );
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <LinearGradient style={styles.container}
          colors={['#FFF', '#F2F2F2']}
          start={{ x: 0.07, y: 0 }}
          end={{ x: 1.1556, y: 1 }}
        >
          <View style={styles.header}>
            <Image source={Rec} contentFit="contain"
              style={{
                alignSelf: 'center',
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
              <Text style={[styles.toggleText, showAbrigados ? styles.activeToggleText : null]}>Abrigo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMovimentos} style={[styles.toggleButton, showMovimentos ? styles.activeToggle : null]}>
              <Text style={[styles.toggleText, showMovimentos ? styles.activeToggleText : null]}>Ações sociais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilters} style={[styles.toggleButton, showFilters ? styles.activeToggle : null]}>
              <Text style={[styles.toggleText, showFilters ? styles.activeToggleText : null]}>Filtros</Text>
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
                width: 349,
                alignSelf: 'center',
                zIndex: 1,
                marginBottom: 10,
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 4,
                elevation: 5,
                shadowOpacity: 1,
                borderRadius: 10,
                position: 'absolute',
                bottom: 80,
              },
              textInput: {
                paddingLeft: 40, // Ajusta o espaço para a esquerda do texto
                borderRadius: 10,
              },
              listView: { backgroundColor: '#fff' }
            }}
          >
            <Image source={Lupa} contentFit="contain"
              style={{
                height: 27,
                width: 27,
                position: 'absolute',
                left: 10,
                bottom: 15,
              }}
            />
          </GooglePlacesAutocomplete>

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
                onPress={() => handleMarkerPress(location.id)}
              >
                <Image source={Abrigo}
                  style={{
                    height: 54,
                    width: 43,
                  }}
                />
              </Marker>
            ))}
            {showMovimentos && movimentos.map(location => (
              <Marker
                key={location.id}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={location.name}
                onPress={() => handleMarkerPressMovimento(location.id)}
              >
                <Image source={Social}
                  style={{
                    height: 54,
                    width: 43,
                  }}
                />
              </Marker>
            ))}
            {renderPolygonsAndCircles()}
          </MapView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    marginBottom: 39,
  },
  map: {
    flex: 1,
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
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 38,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    width: 111,
    height: 38,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: '#02385A',
  },
  toggleText: {
    color: '#94949c',
    fontFamily: 'montserrat',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#fff',
  },
  filtersContainer: {
    position: 'absolute',
    width: 250,
    top: 350,
    left: 0,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  filtersHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterText: {
    fontSize: 14,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxChecked: {
    flex: 1,
    backgroundColor: '#000',
  },
  legendCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});