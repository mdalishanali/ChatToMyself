import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
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
        console.log("count: ", count);
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
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {}
        },
        googleLogin: async () => {
          try {
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            await auth()
              .signInWithCredential(googleCredential)
              .then(async (data) => {
                await checkGroupExists(data.user);
              })
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
              .catch((error) => {
                console.log("Something went wrong with sign up: ", error);
              });
          } catch (error) {
            console.log({ error });
          }
        },
        fbLogin: async () => {},
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async (data) => {
                console.log("data: ", data);
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
              })
              .catch((error) => {
                console.log("Something went wrong with sign up: ", error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
