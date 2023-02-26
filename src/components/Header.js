import { View, Text, StatusBar } from "react-native";
import React from "react";
import { sizes } from "../constants/theme";

export default function Header() {
  return (
    <View
      style={{
        backgroundColor: "#fc9d9a",
        height: sizes.height * 0.1,
        width: sizes.width,
        justifyContent: "center",
        alignContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontWeight: "900",
          fontFamily: "Lato-Bold",
          //   color: "black",
        }}
      >
        Chat To Yourself
      </Text>
      <StatusBar backgroundColor={"pink"} />
    </View>
  );
}
