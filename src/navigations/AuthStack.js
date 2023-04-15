import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "../screens/auth/SignupScreen";
import GoogleLoginScreen from "../screens/auth/GoogleLoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    GoogleSignin.configure({
      webClientId:
        "147376266850-37vb9id0ajipa3fd02jcl19hvdkjbcgv.apps.googleusercontent.com",
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="GoogleLoginScreen"
        component={GoogleLoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#072c0b",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#072c0b"
                color="white"
                onPress={() => navigation.navigate("GoogleLoginScreen")}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#072c0b",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#072c0b"
                color="white"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
