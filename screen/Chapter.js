import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { getChapter } from "../utils/http";

const win = Dimensions.get('window');
const ratio = win.width / 200;

export default function Chapter({route}) {
   
    const [imageurl, setimageurl] = useState([]);

    useEffect(()=>{
      async function getImages(){
        const images = await getChapter(route.params.url);
        setimageurl(images)
      }
      getImages();
    },[])


    return (
      <View style={styles.container}>
        <Text style={styles.upperTitle}>Chapter No :{route.params.title}</Text>
  
        <FlatList styles={styles.chapterList} data={imageurl} renderItem={(itemData) =>{
            return (
                <Image source={{uri : itemData.item}} style={styles.contentImage}/>
            );
        }} />

        <View style={styles.bottomText}>
          <Text>© Created by 6ixline</Text>
        </View>
     
          
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 5,
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
      marginBottom: 20
    },
    chapterList:{
        flex: 1,
    },
    contentImage:{
        width: win.width,
        height: 300 * ratio,
        marginBottom: 10
    },
    bottomText:{
      position: "absolute",
      bottom: 8,
      left: "36%"
    }
  });
  