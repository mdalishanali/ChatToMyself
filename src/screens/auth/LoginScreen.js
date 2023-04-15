import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";

import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import SocialButton from "../../components/SocialButton";
import { AuthContext } from "../../context/AuthProvider";
// import { AuthContext } from "../../navigation/AuthProvider";
// AuthContext
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleLogin } = useContext(AuthContext);

  const fbLogin = () => {};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/rn-social-logo.png")}
        style={styles.logo}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        {/* <Text style={styles.navButtonText}>Forgot Password?</Text> */}
      </TouchableOpacity>

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

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#072c0b",
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "white",
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
    color: "white",
    fontFamily: "Lato-Regular",
    bottom:10,
  },
});
