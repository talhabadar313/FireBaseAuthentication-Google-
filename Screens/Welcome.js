import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '803316938635-reb9kmkvjuc5lkptubut9udbl1vos6ih.apps.googleusercontent.com',
});

const Welcome = ({ navigation }) => {
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      console.log(user)
      // Check if the user already exists in your Firestore collection
      const userSnapshot = await firestore().collection('Users').doc(user.uid).get();

      if (userSnapshot.exists) {
        // User exists, navigate to HomeScreen
        console.log("User Sign In Successful");
        navigation.navigate('Home');
        return
      } else {
        
        console.log("New Account Creation Successful");
        navigation.navigate('SignUp', { uid: user.uid, email: user.email, photoUrl: user.photoURL });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to HomeScreen
        // navigation.navigate('Home');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome To Our App</Text>
      <TouchableOpacity onPress={onGoogleButtonPress} style={styles.btn}>
        <Text style={{ fontSize: 18, color: 'white' }}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    height: 40,
    width: Dimensions.get('screen').width - 180,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Welcome;
