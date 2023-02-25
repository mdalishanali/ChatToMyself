import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function GroupScreen() {
  const { logout, user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

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
    /** {"_id": "giecnxWMY1owF14ZDGmI", "createdAt": 2023-02-05T13:12:47.698Z, "name": "Goal", "userId": "8rqj76pHfsRVeiwSLDE7daISrGE2"} */
    navigation.navigate("Chat", {
      item: {
        _id,
        userId,
      },
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
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Personal</Text>
      <Text>Create your group</Text>
    </View>
  );
}
