import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { AuthContext } from "../context/AuthProvider";

import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";

export default function ChatScreen() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { _id: groupId } = route.params.item;

  useEffect(() => {
    setLoading(true);
    getAllNotes();
    console.log(" ia m called", groupId);
  }, [groupId]);

  const getAllNotes = async () => {
    try {
      const list = [];
      await firestore()
        .collection("notes")
        .where("user._id", "==", user.uid)
        .where("groupId", "==", groupId)
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              doc.data().createdAt = doc.data().createdAt.toDate();
              list.push(doc.data());
            }
          });
        });
      setMessages(list);
      if (loading) {
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      console.log("e: ", e);
      setLoading(false);
    }
  };

  const onSend = useCallback((messages = [], groupId) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // console.log("messages: ", messages);
    console.log("groupId: ", groupId);
    const { _id, createdAt, text, user } = messages[0];
    firestore()
      .collection("notes")
      .add({
        groupId,
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {});
  }, [groupId]);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  return (
    <>
      <Text>{groupId}</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages, groupId)}
          renderBubble={renderBubble}
          renderSend={renderSend}
          alwaysShowSend={true}
          scrollToBottomComponent={scrollToBottomComponent}
          user={{
            _id: user.uid,
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
