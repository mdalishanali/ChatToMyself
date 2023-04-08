import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import DialogInput from "react-native-dialog-input";
import Icon from "react-native-vector-icons/AntDesign";
import { sizes, spacing } from "../constants/theme";
import niceColors from "nice-color-palettes";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/Loader";
import Header from "../components/Header";

const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(0, 3),
];

const iconData = [
  "https://cdn-icons-png.flaticon.com/512/435/435047.png",
  "https://cdn-icons-png.flaticon.com/512/435/435050.png",
  "https://cdn-icons-png.flaticon.com/512/435/435061.png",
  "https://cdn-icons-png.flaticon.com/512/435/435061.png",
  "https://cdn-icons-png.flaticon.com/512/435/435022.png",
  "https://cdn-icons-png.flaticon.com/512/435/435034.png",
  "https://cdn-icons-png.flaticon.com/512/435/435036.png",
  "https://cdn-icons-png.flaticon.com/512/435/435026.png",
  "https://cdn-icons-png.flaticon.com/512/435/435026.png",
];

const ITEM_HEIGHT = sizes.height * 0.18;
export default function GroupScreen() {
  const { logout, user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputDialog, setInputDialog] = useState(false);

  const navigation = useNavigation();

  const showToast = () => {
    ToastAndroid.show("Successfully Created", ToastAndroid.SHORT);
  };

  const getAllGroups = async () => {
    setLoading(true);
    try {
      const list = [];
      await firestore()
        .collection("groups")
        .where("userId", "==", user.uid)
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              doc.data().createdAt = doc
                .data()
                .createdAt.toDate()
                .toDateString();
              doc.data()._id = doc.id;
              list.push(doc.data());
            }
          });
        })
        .then(() => {
          const newList = list.map((item, index) => ({
            ...item,
            color: colors[index % colors.length],
            image: iconData[Math.floor(Math.random() * iconData.length)],
          }));
          setGroups(newList);
          setLoading(false);
        });
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  const openChat = ({ _id, userId }) => {
    navigation.navigate("Chat", {
      item: {
        _id,
        userId,
      },
    });
  };

  const createGroups = async (groupName) => {
    setInputDialog(false);
    setLoading(true);
    await firestore()
      .collection("groups")
      .add({
        name: groupName,
        userId: user.uid,
        createdAt: new Date(),
      })
      .then(() => {
        getAllGroups();
        showToast();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader loading={loading} />
      <View>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <GroupItem item={item} openChat={openChat} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: spacing.s }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setInputDialog(true);
        }}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={{
            uri:
              "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png",
          }}
          style={styles.FloatingButtonStyle}
        />
        <View
          style={{
            position: "absolute",
            left: 8,
            top: 46,
          }}
        >
          <Text>Group</Text>
        </View>
      </TouchableOpacity>

      <DialogInput
        isDialogVisible={inputDialog}
        title={"Create Group 🚀"}
        message={"Now chat in respective group!"}
        hintInput={"Group"}
        submitInput={(inputText) => {
          createGroups(inputText);
        }}
        submitText={"Create"}
        closeDialog={() => {
          setInputDialog(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },

  //
  name: {
    fontWeight: "700",
    fontSize: 25,
  },
  image: {
    height: ITEM_HEIGHT * 0.8,
    width: ITEM_HEIGHT * 0.8,
    position: "absolute",
    bottom: 0,
    right: spacing.s,
  },
  createdAt: {
    fontSize: 11,
    opacity: 0.7,
  },
});

const GroupItem = ({ item, openChat }) => {
  let { name, userID, createdAt, image, color } = item;
  return (
    <TouchableOpacity
      onPress={() => {
        openChat(item);
      }}
      style={{ marginBottom: spacing.s, height: ITEM_HEIGHT }}
    >
      <View style={{ flex: 1, padding: spacing.s }}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: color, padding: 10, borderRadius: 16 },
          ]}
        >
          <Text style={styles.name}>{capitalizeFirstLetter(name)}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  // return string.charAt(0).toUpperCase() + string.slice(1);
}
