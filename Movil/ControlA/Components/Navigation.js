import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Login from "./Login";
import MenuP from "./Main";
import { Registro } from "./Registro";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const confirmLogout = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => setIsLoggedIn(false)
        }
      ]
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isLoggedIn ? "Inicio" : "Login"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "login" : "login-variant";
            } else if (route.name === "Cerrar Sesión") {
              iconName = focused ? "logout" : "logout-variant";
            }

            return <Icon type="material-community" name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "#00a680",
          tabBarInactiveTintColor: "#646464",
          tabBarStyle: {
            display: isLoggedIn ? "flex" : "none",
          },
        })}
      >
        {isLoggedIn ? (
          <>
            <Tab.Screen name="Inicio">
              {() => <Registro />}
            </Tab.Screen>
            <Tab.Screen name="Cerrar Sesión">
              {() => <CerrarSesionScreen confirmLogout={confirmLogout} />}
            </Tab.Screen>
          </>
        ) : (
          <Tab.Screen name="Login">
            {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const LoginScreen = ({ setIsLoggedIn }) => (
  <Login setIsLoggedIn={setIsLoggedIn} />
);

const CerrarSesionScreen = ({ confirmLogout }) => {
  useFocusEffect(
    React.useCallback(() => {
      confirmLogout();
    }, [])
  );

  return <Registro />;
};
