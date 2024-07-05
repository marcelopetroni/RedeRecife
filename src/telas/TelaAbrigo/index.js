import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const abrigos = [
  {
    id: 1,
    name: "Escola Santa Maria",
    description: "O abrigo possui 5 quartos com 10 colchões cada e 4 banheiros. Capacidade para aproximadamente 50 pessoas, independente de gênero ou idade.",
    address: "Rua da Aurora, 123, Recife - PE",
    image: require('../../imagens/fotoAbrigo.png'),
    contactName: "Maria das Dores",
    contactPhone: "(81) 99999-9999",
  },
  {
    id: 2,
    name: "Lar de Todes",
    description: "O abrigo possui 5 quartos com 10 colchões cada e 4 banheiros. Capacidade para aproximadamente 50 pessoas, independente de gênero ou idade.",
    address: "Rua da Aurora, 123, Recife - PE",
    image: require('../../imagens/fotoAbrigo.png'),
    contactName: "Maria das Dores",
    contactPhone: "(81) 99999-9999",
  },
  {
    id: 3,
    name: "Hospital Naval",
    description: "O abrigo possui 5 quartos com 10 colchões cada e 4 banheiros. Capacidade para aproximadamente 50 pessoas, independente de gênero ou idade.",
    address: "Rua da Aurora, 123, Recife - PE",
    image: require('../../imagens/fotoAbrigo.png'),
    contactName: "Maria das Dores",
    contactPhone: "(81) 99999-9999",
  },
];

const TelaAbrigo = ({ route }) => {
  const { id } = route.params;
  const abrigo = abrigos.find(a => a.id === id);

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
        <TouchableOpacity onPress={() => navigation.navigate('TelaHome')}>
          <Icon name="arrow-back" size={25} color="#02385A" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Abrigo</Text>
      </View>
      <Image source={abrigo.image} style={styles.image} />
      <Text style={styles.name}>{abrigo.name}</Text>
      <Text style={styles.address}><MaterialIcons name="location-on" size={16} color="gray" /> {abrigo.address}</Text>
      <Text style={styles.descriptionTitle}>Descrição</Text>
      <Text style={styles.description}>{abrigo.description}</Text>
      <View style={styles.contactContainer}>
        <MaterialIcons name="person" size={24} color="gray" />
        <Text style={styles.contactName}>{abrigo.contactName}</Text>
        <TouchableOpacity onPress={() => handlePhonePress(abrigo.contactPhone)}>
          <FontAwesome name="phone" size={24} color="#02385A" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleWhatsAppPress(abrigo.contactPhone)}>
          <FontAwesome name="whatsapp" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>
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
    width: 358,
    height: 298,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 23
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
    color: '#4D4D4D'
  },
  icon: {
    marginLeft: 20,
  },
});

export default TelaAbrigo;
