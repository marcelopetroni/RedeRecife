import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Iconify } from 'react-native-iconify';
import Icon from 'react-native-vector-icons/Ionicons';

const AjudaRecife = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    titulo: '',
    objetivo: '',
    localizacao: '',
    capacidade: '',
    responsavel: '',
    contato: ''
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setInputs({
      titulo: '',
      objetivo: '',
      localizacao: '',
      capacidade: '',
      responsavel: '',
      contato: ''
    });
  };

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const renderForm = () => {
    if (category === 'Ação Social') {
      return (
        <>
          <Text style={styles.subTitle}>Objetivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arrecadar alimentos"
            placeholderTextColor="#808080"
            value={inputs.objetivo}
            onChangeText={(text) => handleInputChange('objetivo', text)}
          />
          <Text style={styles.subTitle}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço para coleta"
            placeholderTextColor="#808080"
            value={inputs.localizacao}
            onChangeText={(text) => handleInputChange('localizacao', text)}
          />
          <Text style={styles.subTitle}>Responsável</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Responsável"
            placeholderTextColor="#808080"
            value={inputs.responsavel}
            onChangeText={(text) => handleInputChange('responsavel', text)}
          />
          <Text style={styles.subTitle}>Contato</Text>
          <TextInput
            style={styles.input}
            placeholder="(DDD) 9XXXX-XXXX"
            placeholderTextColor="#808080"
            keyboardType="phone-pad"
            value={inputs.contato}
            onChangeText={(text) => handleInputChange('contato', text)}
          />
        </>
      );
    } else if (category === 'Abrigo') {
      return (
        <>
          <Text style={styles.subTitle}>Capacidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 200m2, 25 quartos, 100 colchões"
            placeholderTextColor="#808080"
            value={inputs.capacidade}
            onChangeText={(text) => handleInputChange('capacidade', text)}
          />
          <Text style={styles.subTitle}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor="#808080"
            value={inputs.localizacao}
            onChangeText={(text) => handleInputChange('localizacao', text)}
          />
          <Text style={styles.subTitle}>Responsável</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Responsável"
            placeholderTextColor="#808080"
            value={inputs.responsavel}
            onChangeText={(text) => handleInputChange('responsavel', text)}
          />
          <Text style={styles.subTitle}>Contato</Text>
          <TextInput
            style={styles.input}
            placeholder="(DDD) 9XXXX-XXXX"
            placeholderTextColor="#808080"
            keyboardType="phone-pad"
            value={inputs.contato}
            onChangeText={(text) => handleInputChange('contato', text)}
          />
        </>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('TelaHome')}>
        <Icon name="arrow-back" size={25} color="#02385A" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>AjudaRecife</Text>
      </View>
      <View style={styles.uploadContainer}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={pickImage} ><Iconify icon="mdi:fluent:camera-add-20-regular" size={42} color="#02385A" /></TouchableOpacity>
      </View>
      <Text style={styles.subTitle} >Título</Text>
      <TextInput style={styles.input} placeholder="Escreva aqui o título da sua solicitação" placeholderTextColor="#808080" />
      <Text style={styles.subTitle} >Categoria</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Ação Social' && styles.selectedCategory]}
          onPress={() => setCategory('Ação Social')}
        >
          <Text style={[styles.categoryText, category === 'Ação Social' && styles.selectedCategoryText]}>Ação Social</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Abrigo' && styles.selectedCategory]}
          onPress={() => setCategory('Abrigo')}
        >
          <Text style={[styles.categoryText, category === 'Abrigo' && styles.selectedCategoryText]}>Abrigo</Text>
        </TouchableOpacity>
      </View>
      {renderForm()}
      <TouchableOpacity style={styles.submitButton}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
    marginLeft: 80,
    color: '#02385A',
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
    color: 'rgba(77,77,77,0.46)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#02385A',
    fontWeight: 'bold',
    marginBottom: 10,
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
    backgroundColor: '#6192B1',
    borderColor: '#6192B1',
  },
  categoryText: {
    color: '#808080', // Cinza
  },
  selectedCategoryText: {
    color: '#fff', // Branco para texto da categoria selecionada
  },
  submitButton: {
    height: 45,
    marginHorizontal: 100,
    marginBottom: 100,
    marginTop: 20,
    backgroundColor: '#6192B1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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

export default AjudaRecife;
