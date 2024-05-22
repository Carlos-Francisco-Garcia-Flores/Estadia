import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Login from "./Login";
import MenuP from "./Main"; 

const Tab = createBottomTabNavigator(); 

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isLoggedIn ? "Menu" : "Login"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Menu") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "login" : "login-variant";
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
          <Tab.Screen name="Menu">
            {() => <MenuP setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
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
