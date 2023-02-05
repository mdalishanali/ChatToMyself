import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function GroupScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Button title="Logout" onPress={logout} />
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Create your group</Text>
    </View>
  );
}
