import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Iconify } from 'react-native-iconify';

const AdicionarAlerta = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    titulo: '',
    outraCategoria: '',
    localizacao: '',
  });

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setCategory('');
    setImage(null);
    setInputs({
      titulo: '',
      outraCategoria: '',
      localizacao: '',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaHome')}>
          <Icon name="arrow-back" size={25} color="#B02304" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Alerta</Text>
      </View>
      <View style={styles.uploadContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity onPress={pickImage}>
          <Iconify icon="mdi:fluent:camera-add-20-regular" size={42} color="#02385A" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva aqui o título da sua solicitação"
        placeholderTextColor="#808080"
        value={inputs.titulo}
        onChangeText={(text) => handleInputChange('titulo', text)}
      />
      <Text style={styles.subTitle}>Categoria</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Chuvas fortes' && styles.selectedCategory]}
          onPress={() => handleCategoryChange('Chuvas fortes')}
        >
          <Text style={[styles.categoryText, category === 'Chuvas fortes' && styles.selectedCategoryText]}>Chuvas fortes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Alagamento' && styles.selectedCategory]}
          onPress={() => handleCategoryChange('Alagamento')}
        >
          <Text style={[styles.categoryText, category === 'Alagamento' && styles.selectedCategoryText]}>Alagamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Outros' && styles.selectedCategory]}
          onPress={() => handleCategoryChange('Outros')}
        >
          <Text style={[styles.categoryText, category === 'Outros' && styles.selectedCategoryText]}>Outros</Text>
        </TouchableOpacity>
      </View>
      {category === 'Outros' && (
        <>
          <Text style={styles.subTitle}>Outra categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Deslizamento"
            placeholderTextColor="#808080"
            value={inputs.outraCategoria}
            onChangeText={(text) => handleInputChange('outraCategoria', text)}
          />
        </>
      )}
      <Text style={styles.subTitle}>Localização</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua, Bairro, Cidade"
        placeholderTextColor="#808080"
        value={inputs.localizacao}
        onChangeText={(text) => handleInputChange('localizacao', text)}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -8.0476,
          longitude: -34.8770,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: -8.0476, longitude: -34.8770 }}
          title="Localização"
          description="Local do alerta"
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>⚠️</Text>
          </View>
        </Marker>
      </MapView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 33,
    marginLeft: 70,
    color: '#B02304',
  },
  subTitle: {
    fontSize: 16,
    color: '#B02304',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    backgroundColor: 'rgba(142, 188, 218, 0.2)',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  image: {
    width: 230,
    height: 110,
    marginRight: 20,
    borderRadius: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#808080',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  selectedCategory: {
    backgroundColor: '#B02304',
    borderColor: '#B02304',
  },
  categoryText: {
    color: '#808080', // Cinza
  },
  selectedCategoryText: {
    color: '#fff', // Branco para texto da categoria selecionada
  },
  map: {
    marginTop: 10,
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 5,
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    height: 40,
    backgroundColor: '#B02304',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdicionarAlerta;
