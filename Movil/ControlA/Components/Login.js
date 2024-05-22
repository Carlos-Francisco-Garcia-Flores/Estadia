//pantalla de logueo
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { Icon } from 'react-native-elements';
import axios from 'axios';
import LoadingScreen from './Load';

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setError('');
    }, [])
  );

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const iconContraseña = mostrarContraseña ? 'eye-off' : 'eye';

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    const passV = password;
    const nombreV = username;

    if (nombreV === '' && passV === '') {
      setError('Por favor complete ambos campos');
      setIsLoading(false);
      return;
    }

    if (nombreV === '') {
      setError('El campo del nombre no puede estar vacío. Complete este campo por favor');
      setIsLoading(false);
      return;
    }

    if (passV === '') {
      setError('El campo de la contraseña no puede estar vacío. Complete este campo por favor');
      setIsLoading(false);
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('https://greengarden.onrender.com/user/login', data);

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };return (
      <View style={styles.container}>
        
        <Image source={require('./images/LogoEscuela.png')} style={styles.logo} />

        <Text style={styles.titulo}>Inicio de sesión</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Matricula</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Ingresa aquí tu matricula"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña:</Text>
          <View style={styles.contraseña}>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.inputPass}
              onChangeText={setPassword}
              value={password}
              placeholder="Ingresa tu contraseña"
              secureTextEntry={!mostrarContraseña}
            />
            <TouchableOpacity onPress={toggleMostrarContraseña} style={styles.visibilityButton}>
              <Icon type="material-community" name={iconContraseña} size={24} color="#999" />
            </TouchableOpacity>
          </View>
          </View>
          

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

        </View>

        <Modal visible={isLoading} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LoadingScreen />
            </View>
          </View>
        </Modal>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: '10%',
    backgroundColor:'#F4F4F4',
  
  },
  logo: {
    width: '100%',
    backgroundColor: 'white',
    resizeMode: 'contain',

  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  visibilityButton: {
    marginTop: -10,
    marginLeft: 10,
    color: 'black',
  },
  titulo: {
    
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    backgroundColor:'#6D0C2E',
    width: '100%',
   

  },
  card: {
    width: '80%',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    alignItems: 'center',
    marginTop: '30%',

  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '95%', 
    height: 36,
    marginBottom: 15,
  },
  inputPass: {
    borderWidth: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '90%', 
    height: 36,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 50,
    alignItems: 'center',
    width: '50%', 
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    paddingTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: 'auto',
    height: '30%',
  },
  contraseña:{
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%', 
    height: 40,
    marginBottom: 15,
  }
});
