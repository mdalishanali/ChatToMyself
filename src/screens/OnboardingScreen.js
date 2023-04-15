import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen({navigation}) {
  const img1 = "../assets/onboarding/onboarding-img1.png";
  const img2 = "../assets/onboarding/onboarding-img2.png";
  const img3 = "../assets/onboarding/onboarding-img3.png";

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("GoogleLoginScreen")}
      onDone={() => navigation.navigate("GoogleLoginScreen")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require(img1)} />,
          title: "Connect to yourself",
          subtitle: "A New Way To Connect With The Your World",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require(img2)} />,
          title: "Share Your Favorites",
          subtitle: "Share Your Thoughts With yourself",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require(img3)} />,
          title: "Become The Star",
          subtitle: "Let The Spot Light Capture You",
        },
      ]}
    />
  );
}
