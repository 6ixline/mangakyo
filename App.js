import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Home  from "./screen/Home";
import  Chapterlist  from "./screen/Chapterlist";
import  Chapter  from "./screen/Chapter";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Chapterlist" component={Chapterlist} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Chapter" component={Chapter} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
   
    </>
  );
}
