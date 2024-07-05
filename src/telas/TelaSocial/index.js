import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const movimentos = [
  {
    id: 1,
    name: "Arrecadação de Alimentos",
    description: "Ponto de arrecadação de alimento para distribuição no bairro da Boa Vista para moradores de rua em situação de risco.",
    address: "Rua do Príncipe, 321, Recife - PE",
    image: require('../../imagens/abrigo.png'),
    contactName: "José de Freitas",
    contactPhone: "(81) 99999-8888",
  },
  {
    id: 2,
    name: "Doação de Roupas",
    description: "Coleta de roupas para distribuir a famílias carentes da região.",
    address: "Rua da Aurora, 123, Recife - PE",
    image: require('../../imagens/abrigo.png'),
    contactName: "Ana Maria",
    contactPhone: "(81) 98888-7777",
  },
  {
    id: 3,
    name: "Campanha de Vacinação",
    description: "Vacinação gratuita contra a gripe para moradores do bairro.",
    address: "Av. Conde da Boa Vista, 890, Recife - PE",
    image: require('../../imagens/abrigo.png'),
    contactName: "Carlos Silva",
    contactPhone: "(81) 97777-6666",
  },
];

const TelaMovimento = ({ route }) => {
  const { id } = route.params;
  const movimento = movimentos.find(m => m.id === id);

  const navigation = useNavigation();

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsAppPress = (phoneNumber) => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back" size={25} color="#02385A" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Ação Social</Text>
      </View>
      <Image source={movimento.image} style={styles.image} />
      <Text style={styles.name}>{movimento.name}</Text>
      <Text style={styles.address}><MaterialIcons name="location-on" size={16} color="gray" /> {movimento.address}</Text>
      <Text style={styles.descriptionTitle}>Descrição</Text>
      <Text style={styles.description}>{movimento.description}</Text>
      <View style={styles.contactContainer}>
        <MaterialIcons name="person" size={24} color="gray" />
        <Text style={styles.contactName}>{movimento.contactName}</Text>
        <TouchableOpacity onPress={() => handlePhonePress(movimento.contactPhone)}>
          <FontAwesome name="phone" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleWhatsAppPress(movimento.contactPhone)}>
          <FontAwesome name="whatsapp" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.buttonText}>Doar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.volunteerButton}>
          <Text style={styles.buttonText}>Voluntariar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>💵 Faça uma doação e receba 10 capibas</Text>
        <Text style={styles.infoText}>🤝 Seja voluntário e receba 50 capibas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#02385A',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#02385A',
  },
  address: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    color: 'rgba(94, 94, 94, 0.60)'
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4D4D4D'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#5E5E5E'
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  donateButton: {
    backgroundColor: '#CCC',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  volunteerButton: {
    backgroundColor: '#6192B1',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#02385A',
    marginBottom: 10,
  },
});

export default TelaMovimento;
