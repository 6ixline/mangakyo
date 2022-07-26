import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';



export default function Home({navigation}) {
    const [enterGoalText, setEnterGoalText] = useState('');
   
    function handleImagePress(){
        navigation.navigate('Chapterlist', {
            title: 'Jujustu Kaisen Chapters'
        });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.upperTitle}>Mangakyo</Text>
  
        <View styles={styles.bookFolder}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={{uri: "https://i.pinimg.com/736x/16/65/ee/1665ee47b8a2c8954418fdf64689da41.jpg"}} style={styles.coverImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomText}>
          <Text>© Created by 6ixline</Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 16
    },
    upperTitle:{
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 16,
      paddingLeft: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
      paddingBottom: 20,
    },
    coverImage:{
      height: 250,
      width: 180,
      marginTop: 15,
      borderRadius: 10
    },
    bottomText:{
      position: "absolute",
      bottom: 8,
      left: "36%"
    }

  
  });
  