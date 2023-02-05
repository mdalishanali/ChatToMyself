import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import Providers from "./src/navigations/index";

export default function App() {
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
