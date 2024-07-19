import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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