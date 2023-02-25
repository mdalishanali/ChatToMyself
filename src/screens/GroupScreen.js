import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import DialogInput from "react-native-dialog-input";

export default function GroupScreen() {
  const { logout, user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputDialog, setInputDialog] = useState(true);

  const navigation = useNavigation();

  const getAllGroups = async () => {
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
              doc.data().createdAt = doc.data().createdAt.toDate();
              doc.data()._id = doc.id;
              list.push(doc.data());
            }
          });
        });
      setGroups(list);
      if (loading) {
        setLoading(false);
      }
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
    await firestore()
      .collection("groups")
      .add({
        name: groupName,
        userId: user.uid,
        createdAt: new Date(),
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Button title="Logout" onPress={logout} />
      {groups.length
        ? groups.map((group, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => openChat(group)}>
                <Text>{group.name}</Text>
                <Text>{group.userID}</Text>
              </TouchableOpacity>
            );
          })
        : null}

      <Text>Create your group</Text>
      <DialogInput
        isDialogVisible={inputDialog}
        title={"Create Group 🚀"}
        message={"Type your message on group"}
        hintInput={"Group"}
        submitInput={(inputText) => {
          createGroups(inputText);
        }}
        submitText={"Create"}
        closeDialog={() => {
          setInputDialog(false);
        }}
      ></DialogInput>
    </View>
  );
}
