import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Welcome from './Screens/Welcome';
import SignUp from './Screens/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
          <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
       </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white"
  },
  btn:{
    backgroundColor:'blue',
    height:48,
    paddingHorizontal:8,
    width:300,
    margin:20,
    borderRadius:8
  }
})