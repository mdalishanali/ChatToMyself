import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { sizes } from "../constants/theme";

export default function Loader({ loading }) {
  return (
    <View>
      {loading ? (
        <View
          style={{
            position: "relative",
            flex: 1,
            justifyContent: "center",
            top: sizes.height / 2,
            zIndex: 999,
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : null}
    </View>
  );
}
