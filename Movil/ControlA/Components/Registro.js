import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import * as LocalAuthentication from 'expo-local-authentication';

export const Registro = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
  const [entradaTime, setEntradaTime] = useState(null);
  const [salidaTime, setSalidaTime] = useState(null);
  const [recesoTime, setRecesoTime] = useState(null);
  const [recesoCountdown, setRecesoCountdown] = useState(null);

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

  const authenticate = async (callback) => {
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
      const faceResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación facial',
      });

      if (faceResult.success) {
        callback();
      } else {
        Alert.alert('Error', 'Autenticación facial fallida');
      }
    } else {
      Alert.alert('Error', 'Autenticación de huella fallida');
    }
  };

  const handleEntrada = () => {
    authenticate(() => {
      setEntradaTime(moment().format('LTS'));
    });
  };

  const handleSalida = () => {
    authenticate(() => {
      setSalidaTime(moment().format('LTS'));
    });
  };

  const handleReceso = () => {
    authenticate(() => {
      setRecesoTime(moment());
      setRecesoCountdown('40:00');
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '100%',
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#800020',
    fontWeight: 'bold',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  eventTime: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#952157',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
