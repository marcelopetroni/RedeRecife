import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert, ScrollView, KeyboardAvoidingView, } from 'react-native';
import CheckBox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rg, setRg] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [onPress] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async () => {
    if (senha !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Erro", "Você deve concordar com os termos de uso!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/paciente', {
        nome,            
        cpf,             
        dataNascimento, 
        rg,              
        endereco,        
        cep,             
        numero,          
        email,           
        cidade,          
        estado,          
        genero,
        senha,    
      });
      console.log('Response:', response.data);

      if (response.status === 200) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        // Limpe os campos após o sucesso do cadastro
        setNome('');
        setEmail('');
        setCpf('');
        setGenero('');
        setDataNascimento('');
        setCep('');
        setEndereco('');
        setNumero('');
        setCidade('');
        setEstado('');
        setRg('');
        setSenha('');
        setConfirmPassword('');
        setAgreeTerms(false);
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao cadastrar o usuário.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor='rgba(77,77,77,0.46)' value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor='rgba(77,77,77,0.46)' value={email} onChangeText={setEmail} />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="CPF" placeholderTextColor='rgba(77,77,77,0.46)' value={cpf} keyboardType="phone-pad" onChangeText={setCpf} />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Gênero" placeholderTextColor='rgba(77,77,77,0.46)' value={genero} onChangeText={setGenero} />
        </View>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Nascimento" placeholderTextColor='rgba(77,77,77,0.46)' value={dataNascimento} onChangeText={setDataNascimento} />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="CEP" placeholderTextColor='rgba(77,77,77,0.46)' value={cep} keyboardType="phone-pad" onChangeText={setCep} />
        </View>
        <TextInput style={styles.input} placeholder="Endereço" placeholderTextColor='rgba(77,77,77,0.46)' value={endereco} onChangeText={setEndereco} />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Número" placeholderTextColor='rgba(77,77,77,0.46)' value={numero} keyboardType="phone-pad" onChangeText={setNumero} />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="Cidade" placeholderTextColor='rgba(77,77,77,0.46)' value={cidade} onChangeText={setCidade} />
        </View>
        <TextInput style={styles.input} placeholder="Estado" placeholderTextColor='rgba(77,77,77,0.46)' value={estado} onChangeText={setEstado} />
        <TextInput style={styles.input} placeholder="RG" placeholderTextColor='rgba(77,77,77,0.46)' value={rg} keyboardType="phone-pad" onChangeText={setRg} />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Senha"
            placeholderTextColor='rgba(77,77,77,0.46)'
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={styles.eyeIcon}>{showPassword ? <Icon name="eye" size={20} color="#346788" /> : <Icon name="eye-slash" size={20} color="#0C5F73" />}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Repetir Senha"
            placeholderTextColor='rgba(77,77,77,0.46)'
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <Text style={styles.eyeIcon}>{showConfirmPassword ? <Icon name="eye" size={20} color="#346788" /> : <Icon name="eye-slash" size={20} color="#0C5F73" />}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.checkboxContainer}>
        <CheckBox value={agreeTerms} onValueChange={setAgreeTerms} />
        <Text style={styles.checkboxLabel}>Eu li e concordo com os{' '}</Text>
        <Pressable onPress={onPress}>
            {({ pressed }) => (
              <Text style={[styles.link]}>
                termos de uso
              </Text>
            )}
        </Pressable>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Navigate to login screen')}>
        <Text style={[styles.link, styles.possuo]}> {'<'} Já possuo cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6192B1',
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  passwordInput: {
    width: '90%',
  },
  eyeIcon: {
    padding: 10,
    paddingTop: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 8,
    color: '#B4B4B4'
  },
  checkboxLabel: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#7C7C7C',
  },
  link: {
    color: '#0C5F73',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6192B1',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30,
    marginHorizontal: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  possuo: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    paddingTop: 10,
  }
});