import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Clipboard, Alert, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const movimentos = [
  {
    id: 4,
    name: "Arrecadação de Alimentos",
    description: "Ponto de arrecadação de alimento para distribuição no bairro da Boa Vista para moradores de rua em situação de risco.",
    address: "Rua do Príncipe, 321, Recife - PE",
    image: require('../../imagens/fotoSocial.png'),
    contactName: "José de Freitas",
    contactPhone: "(81) 99999-8888",
    pixCode: "ABCDWEFGD1234PQOMAHWK123.pix"
  },
  {
    id: 5,
    name: "Doação de Roupas",
    description: "Coleta de roupas para distribuir a famílias carentes da região.",
    address: "Rua da Aurora, 123, Recife - PE",
    image: require('../../imagens/fotoSocial.png'),
    contactName: "Ana Maria",
    contactPhone: "(81) 98888-7777",
    pixCode: "EFGHEFGD5678PQOMAHWK567.pix"
  },
  {
    id: 6,
    name: "Doação de Objetos",
    description: "Coleta de objetos para distribuir a famílias carentes da região.",
    address: "Av. Conde da Boa Vista, 890, Recife - PE",
    image: require('../../imagens/fotoSocial.png'),
    contactName: "Carlos Silva",
    contactPhone: "(81) 97777-6666",
    pixCode: "IJKLWEFGD9101PQOMAHWK910.pix"
  },
];

const TelaMovimento = ({ route }) => {
  const { id } = route.params;
  const movimento = movimentos.find(m => m.id === id);

  const navigation = useNavigation();
  const [showPix, setShowPix] = useState(false);

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsAppPress = (phoneNumber) => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  const handleDonatePress = () => {
    setShowPix(!showPix);
  };

  const handleCopyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Código PIX copiado!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TelaHome')}>
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
          <FontAwesome name="phone" size={24} color="#02385A" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleWhatsAppPress(movimento.contactPhone)}>
          <FontAwesome name="whatsapp" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
          <Text style={styles.buttonText}>Doar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleWhatsAppPress(movimento.contactPhone)} style={styles.volunteerButton}>
          <Text style={styles.buttonText}>Voluntariar</Text>
        </TouchableOpacity>
      </View>
      {showPix && (
        <View style={styles.pixContainer}>
          <Text style={styles.pixText}>Copie o código abaixo para doar via Pix</Text>
          <View style={styles.pixCodeContainer}>
            <Text style={styles.pixCode}>{movimento.pixCode}</Text>
            <TouchableOpacity onPress={() => handleCopyToClipboard(movimento.pixCode)}>
              <FontAwesome name="clipboard" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialIcons name="currency-exchange" size={32} color="#178B5A" style={styles.infoIcon} />
          <Text style={styles.infoText}>Faça uma doação e receba 10 capibas</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="currency-exchange" size={32} color="#178B5A" style={styles.infoIcon} />
          <Text style={styles.infoText}>Seja voluntário e receba 50 capibas</Text>
        </View>
      </View>
    </ScrollView>
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
    width: 348,
    height: 177,
    borderRadius: 50,
    marginBottom: 46,
    marginTop: 27
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
    color: 'rgba(94, 94, 94, 0.60)',
    fontWeight: '600',
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
    color: '#5E5E5E',
    fontWeight: 500
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: '#4D4D4D',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  donateButton: {
    backgroundColor: '#626263',
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    marginRight: 10,
    width: 108,
    height: 37,
    borderRadius: 28
  },
  volunteerButton: {
    backgroundColor: '#89B9D8',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    height: 37,
    width: 108,
    borderRadius: 28
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    marginLeft: -30,
    marginRight: -20,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#5E5E5E',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  pixContainer: {
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
  pixText: {
    fontSize: 15,
    color: '#5E5E5E',
    marginBottom: 10,
  },
  pixCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 10,
  },
  pixCode: {
    fontSize: 15,
    color: '#5E5E5E',
    flex: 1,
  },
});

export default TelaMovimento;
