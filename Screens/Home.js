// HomeScreen.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Home = ({ navigation }) => {
            
GoogleSignin.configure({
    webClientId: '803316938635-reb9kmkvjuc5lkptubut9udbl1vos6ih.apps.googleusercontent.com',
  });
  const handleLogout = async () => {
    try {
        await GoogleSignin.revokeAccess();
      await auth().signOut();
      // Navigate back to SignInScreen after successful sign-out
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.btn}>
        <Text style={{ color: 'black', fontSize: 20 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Home

const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:"white",
    alignItems:'center',
    justifyContent:'center'
    }
})