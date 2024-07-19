import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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