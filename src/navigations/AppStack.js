import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupScreen from "../screens/GroupScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QuotesScreen from "../screens/QuotesScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="GroupScreen" component={GroupScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        // title: route.params.userName,
        headerBackTitleVisible: false,
        tabBarVisible:false
      })}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

      console.log('routeName: ', routeName);
    if (routeName === "Chat") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="Group"
      screenOptions={{
        activeTintColor: "#2e64e5",
      }}
    >
      <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={({ route }) => ({
          tabBarLabel: "Chat",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Quotes"
        component={QuotesScreen}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
