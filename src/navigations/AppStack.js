import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupScreen from "../screens/GroupScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SingleChatScreen from "../screens/SingleChatScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Groups" component={GroupScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        headerShown: false,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="MessageStack"
      screenOptions={{
        activeTintColor: "#2e64e5",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={() => ({
          tabBarLabel: "Group",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" color={color} size={size || "150"} />
          ),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={SingleChatScreen}
        options={({ route }) => ({
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
