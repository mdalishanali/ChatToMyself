import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import Providers from "./src/navigations/index";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const AppStack = createNativeStackNavigator();

  return (
    <Providers />
    // <NavigationContainer>
    //   <AppStack.Navigator screenOptions={{ headerShown: false }}>
    //     <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
    //     <AppStack.Screen name="Login" component={LoginScreen} />
    //   </AppStack.Navigator>
    // </NavigationContainer>
  );
}
