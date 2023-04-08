import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import FormButton from "../components/FormButton";
import { sizes } from "../constants/theme";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  const privacyUrl =
    "https://www.privacypolicies.com/live/0094f2fb-67f0-4455-9fcb-46fcb130f570";

  const OpenURLButton = async () => {
    const supported = await Linking.canOpenURL(privacyUrl);
    if (supported) {
      await Linking.openURL(privacyUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${privacyUrl}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/435/435061.png",
          }}
        />
      </View>
      <View style={[styles.imageContainer, { padding: 5 }]}>
        <Text style={styles.textStyle}>Name : {user.displayName}</Text>
        <Text style={styles.textStyle}>Email: {user.email}</Text>
      </View>

      <FormButton buttonTitle="Logout" onPress={logout} />
      <FormButton buttonTitle="Privacy Policy" onPress={OpenURLButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: sizes.height,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  textStyle: {
    fontWeight: 800,
    color: "black",
    paddingBottom: 15,
    fontSize: 20,
    padding: 10,
  },
});
