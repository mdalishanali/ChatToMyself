import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ToastAndroid } from "react-native";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const createGroups = async (user) => {
    const initialGroups = [
      {
        userId: user.uid,
        name: "Personal",
        createdAt: new Date(),
      },
      {
        userId: user.uid,
        name: "Goal",
        createdAt: new Date(),
      },
      {
        userId: user.uid,
        name: "Study Life",
        createdAt: new Date(),
      },
      {
        userId: user.uid,
        name: "Idea",
        createdAt: new Date(),
      },
      {
        userId: user.uid,
        name: "Startup",
        createdAt: new Date(),
      },
    ];
    initialGroups.forEach(async (group) => {
      await firestore()
        .collection("groups")
        .add(group)
        .then(() => {});
    });
  };

  const checkGroupExists = async (user) => {
    await firestore()
      .collection("groups")
      .where("userId", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        const count = querySnapshot.size;
        if (!count) {
          createGroups(user);
        } else {
          return;
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        login: async (email, password) => {
          try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(email, password);
            ToastAndroid.show("Login successfully", ToastAndroid.SHORT);
          } catch (error) {
            const msg =
              error?.response?.data?.message ||
              error?.message ||
              "Sorry something went wrong";
            msg && ToastAndroid.show(msg, ToastAndroid.SHORT);
            setLoading(false);
          }
        },
        googleLogin: async () => {
          setLoading(true);

          try {
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken
            );
            setLoading(true);

            await auth()
              .signInWithCredential(googleCredential)
              .then(async (data) => {
                await checkGroupExists(data.user);
              });
            // Use it only when user Sign's up,
            // so create different social signup function
            // .then(() => {
            //   //Once the user creation has happened successfully, we can add the currentUser into firestore
            //   //with the appropriate details.
            //   // console.log('current User', auth().currentUser);
            //   firestore().collection('users').doc(auth().currentUser.uid)
            //   .set({
            //       fname: '',
            //       lname: '',
            //       email: auth().currentUser.email,
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: null,
            //   })
            //   //ensure we catch any errors at this stage to advise us if something does go wrong
            //   .catch(error => {
            //       console.log('Something went wrong with added user to firestore: ', error);
            //   })
            // })
            //we need to catch the whole sign up process if it fails too.
            setLoading(false);
          } catch (error) {
            console.log('error: ', error);
            const msg =
            error?.response?.data?.message ||
            error?.message ||
            "Sorry something went wrong";
            msg && ToastAndroid.show(msg, ToastAndroid.SHORT);
            setLoading(false);
          }
        },
        fbLogin: async () => {},
        register: async (email, password) => {
          try {
            setLoading(true);

            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async (data) => {
                await checkGroupExists(data.user);

                // firestore()
                //   .collection("users")
                //   .doc(auth().currentUser.uid)
                //   .set({
                //     fname: "",
                //     lname: "",
                //     email: email,
                //     createdAt: firestore.Timestamp.fromDate(new Date()),
                //     userImg: null,
                //   })
                //   .catch((error) => {
                //     console.log(
                //       "Something went wrong with added user to firestore: ",
                //       error
                //     );
                //   });
              });
            setLoading(false);
          } catch (error) {
            const msg =
              error?.response?.data?.message ||
              error?.message ||
              "Sorry something went wrong";
            msg && ToastAndroid.show(msg, ToastAndroid.SHORT);
            setLoading(false);
          }
        },
        logout: async () => {
          try {
            setLoading(true);

            await auth().signOut();
            setLoading(false);
          } catch (e) {
            console.log(e);
            setLoading(false);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
