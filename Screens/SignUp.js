import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const SignUp = ({ route, navigation }) => {
  const { email, photoUrl , uid} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const saveUserData = async () => {
    try {
      // Save user data to Firestore
      await firestore().collection('Users').doc(uid).set({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        address:address,
        email:email,
        photoUrl:photoUrl,
      });

      console.log('User data saved successfully');

      // Navigate to HomeScreen or any other screen after signup
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TouchableOpacity onPress={saveUserData} style={styles.btn}>
        <Text style={{ fontSize: 18, color: 'white' }}>Sign Up</Text>
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
  input: {
    height: 40,
    width: Dimensions.get('screen').width - 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    height: 40,
    width: Dimensions.get('screen').width - 180,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default SignUp;
