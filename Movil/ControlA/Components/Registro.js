import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Alert, Button } from 'react-native';
import moment from 'moment';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Location from 'expo-location';
import { styles } from './styles/styles-registro';

export const Registro = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
  const [entradaTime, setEntradaTime] = useState(null);
  const [salidaTime, setSalidaTime] = useState(null);
  const [recesoTime, setRecesoTime] = useState(null);
  const [recesoCountdown, setRecesoCountdown] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('LTS'));
    }, 1000);

    if (recesoCountdown !== null) {
      const recesoInterval = setInterval(() => {
        const now = moment();
        const endTime = moment(recesoTime).add(40, 'minutes');
        const diff = endTime.diff(now, 'seconds');

        if (diff <= 0) {
          clearInterval(recesoInterval);
          setRecesoCountdown('Receso terminado');
        } else {
          const duration = moment.duration(diff, 'seconds');
          const formatted = `${duration.minutes()}:${duration.seconds() < 10 ? '0' : ''}${duration.seconds()}`;
          setRecesoCountdown(formatted);
        }
      }, 1000);

      return () => clearInterval(recesoInterval);
    }

    return () => clearInterval(interval);
  }, [recesoTime, recesoCountdown]);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso para acceder a la ubicación fue denegado');
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    return location;
  };

  const authenticate = async (callback) => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Error', 'Autenticación biométrica no disponible');
        return;
      }

      const fingerprintResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación de huella digital',
      });

      if (fingerprintResult.success) {
        const facialResult = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Autenticación facial',
        });

        if (facialResult.success) {
          callback();
        } else {
          Alert.alert('Error', 'Autenticación facial fallida');
        }
      } else {
        Alert.alert('Error', 'Autenticación de huella fallida');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error durante la autenticación: ' + error.message);
    }
  };

  const handleEntrada = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) return;

    authenticate(async () => {
      const location = await getLocation();
      setEntradaTime(moment().format('LTS'));
      Alert.alert('Ubicación', `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`);
    });
  };

  const handleSalida = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) return;

    authenticate(async () => {
      const location = await getLocation();
      setSalidaTime(moment().format('LTS'));
      Alert.alert('Ubicación', `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`);
    });
  };

  const handleReceso = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) return;

    authenticate(async () => {
      const location = await getLocation();
      setRecesoTime(moment());
      setRecesoCountdown('40:00');
      Alert.alert('Ubicación', `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`);
    });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://www.publicdomainpictures.net/pictures/270000/velka/plain-light-grey-background.jpg' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido, Yadira</Text>
          <Image source={{ uri: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" }} style={styles.userImage} />
          <Text style={styles.currentTime}>{currentTime}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEntrada}>
              <Text style={styles.buttonText}>Entrada</Text>
            </TouchableOpacity>
            {entradaTime && <Text style={styles.eventTime}>Hora de entrada: {entradaTime}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleReceso}>
              <Text style={styles.buttonText}>Receso</Text>
            </TouchableOpacity>
            {recesoCountdown && <Text style={styles.eventTime}>Tiempo de receso: {recesoCountdown}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSalida}>
              <Text style={styles.buttonText}>Salida</Text>
            </TouchableOpacity>
            {salidaTime && <Text style={styles.eventTime}>Hora de salida: {salidaTime}</Text>}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};


