import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View, Image, TextInput, KeyboardAvoidingView, Pressable, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [onPress] = useState('')
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style= { styles.logo } >
          <Image source={require('../../imagens/TelaLogin/Logotipo.png')} style={{width: 204,
          height: 94,}} />
        </View>
        <View>
          <TextInput  style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor='rgba(77, 77, 77, 0.46)' />
          <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} placeholderTextColor='rgba(77, 77, 77, 0.46)' secureTextEntry={true}
/>
        </View>
        <View style={styles.section}>  
          <CheckBox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#048ABF' : undefined}
        />
        <Text style={styles.lembrar}>Lembrar-me</Text>
        <Pressable onPress={onPress}>
            {({ pressed }) => (
              <Text style={[styles.esqueceu, pressed && styles.pressedText]}>
                Esqueceu a senha?
              </Text>
            )}
          </Pressable>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.govContainer}>
        <TouchableOpacity>
            <Text style={styles.govText}>Entrar com {' '}
                <Image source={require('../../imagens/TelaLogin/gov.png')} style={{width: 49, height: 17,}} />
            </Text>
        </TouchableOpacity>  
        </View>    
        <View style={styles.cadstro}>
          <Text style={styles.text}>
          Não tem uma conta?{' '}
        </Text>
        <Pressable onPress={onPress}>
            {({ pressed }) => (
              <Text style={[styles.signupText, pressed && styles.pressedText]}>
                Cadastre-se
              </Text>
            )}
          </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Platform.OS === 'ios' ? 200 : 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
      logo: {
        alignSelf: 'center',
        paddingBottom: 30,
      },
      input: {
        backgroundColor: '#D9D9D9',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        padding: 12,
        borderRadius: 50,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
      }, 
      checkbox: {
        marginTop: 12,
        marginLeft: 50,
        color: '#B4B4B4'
      },
      section: {
        flexDirection: 'row',
      },
      lembrar: {
        marginTop: 12,
        marginLeft: 5,
        color: '#02385A',
        fontWeight: 'bold',
      },
      esqueceu: {
        marginTop: 12,
        ...Platform.select({
          ios: {
            marginLeft: 50,
          },
          android: {
            marginLeft: 90,
          },
          default: {
            marginLeft: 90,
          }
          },
        ),
        color: '#02385A',
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: '#6192B1',
        marginLeft: 120,
        marginRight: 120,
        marginTop: 40,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
      },
      govContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 150,
        marginBottom: 15,
        borderRadius: 30,
        marginHorizontal: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,

      },
      cadstro: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
       },
      text: {
        fontSize: 16,
      },
      signupText: {
        fontSize: 16,
        color: '#02385A',
      },
      pressedText: {
        color: '#058ABF',
      },
});