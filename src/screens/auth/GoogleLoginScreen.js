import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import SocialButton from "../../components/SocialButton";
import { AuthContext } from "../../context/AuthProvider";
import { sizes } from "../../constants/theme";

const GoogleLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login, googleLogin, fbLogin } = useContext(AuthContext);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/rn-social-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Chat To Myself</Text>

      {Platform.OS === "android" ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{" "}
        </Text>
        <TouchableOpacity onPress={OpenURLButton}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
          Privacy Policy
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          display: "flex",
          flexDirection: "row",
          width: sizes.width * 0.6,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {navigation.navigate("Login")}}
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "black",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {navigation.navigate("Signup")}}
            style={{
              backgroundColor: "#2596be",
              padding: 8,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "white",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoogleLoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#072c0b",
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    marginBottom: 50,
    fontSize: 35,
    marginBottom: 10,
    color: "#ffff",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
