//pantalla de logueo
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { Icon } from 'react-native-elements';
import axios from 'axios';
import LoadingScreen from './Load';
import { styles } from './styles/styles-login';

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


