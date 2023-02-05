import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { AuthContext } from "../context/AuthProvider";

import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";

export default function ChatScreen() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupId = "456";

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const list = [];
      await firestore()
        .collection("notes")
        .where("user._id", "==", user.uid)
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
    } catch (e) {
      setLoading(false);
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    firestore()
      .collection("notes")
      .add({
        _id,
        createdAt,
        text,
        user,
        groupId: groupId,
      })
      .then(() => {});
  }, []);

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
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
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
