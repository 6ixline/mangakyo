import { useState } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import  Home  from "./screen/Home";
import  Chapterlist  from "./screen/Chapterlist";
import  Chapter  from "./screen/Chapter";


const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'hel-v1': require("./assets/fonts/HelveticaLTStd-Blk.otf"),
    'hel-v2': require("./assets/fonts/HelveticaLTStd-BlkCond.otf"),
    'hel-v3': require("./assets/fonts/HelveticaLTStd-BlkCondObl.otf"),
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
    <StatusBar  animated={true}
        barStyle='dark-content'/>
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
    <View style={styles.bottomText}>
      <Text>© Created by 6ixline</Text>
    </View>
    </>
  );
}


styles = StyleSheet.create({
  bottomText:{
    position: "absolute",
    bottom: 8,
    alignSelf: 'center',
    justifyContent: "center",
    backgroundColor: 'transparent'
  }
})