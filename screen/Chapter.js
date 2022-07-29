import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { getChapter } from "../utils/http";
import Ionicons from '@expo/vector-icons/Ionicons';
import storage from '../storage/storage';

const win = Dimensions.get('window');
const ratio = win.width / 200;

export default function Chapter({route}) {
   
    const [imageurl, setimageurl] = useState([]);
    const [bookMark, setBookMark] = useState('');
    const [flag, setflag] = useState(true);

    useEffect(()=>{
      async function getImages(){
        const images = await getChapter(route.params.url, route.params.chapterUrl);
        setimageurl(images)
        
        storage.load({key: route.params.key})
        .then(index => { 
          if(index == route.params.chapterIndex){
            setBookMark(index);
            setflag(false)
          }
        })
        .catch(err => { console.log("No Data Found!")})
      }
      getImages();
    },[])

    function handleBookMarkPress(){
        if(flag){
          setBookMark('');
          setflag(false);
        }else{
          setBookMark(route.params.chapterIndex);
          setflag(true);
        }
        storage.save({key: route.params.key, data: `${bookMark}`});
        route.params.handleChapter(bookMark)
      
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.upperTitle}>
            Chapter No :{route.params.title}
          </Text>
          <TouchableOpacity onPress={handleBookMarkPress}>
            <Ionicons name={flag ? "md-bookmark-outline" : "md-bookmark"} size={32} color="red" />
          </TouchableOpacity>
        </View>
  
        <FlatList styles={styles.chapterList} data={imageurl} renderItem={(itemData) =>{
            return (
                <Image source={{uri : itemData.item}} style={styles.contentImage}/>
            );
        }} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16
    },
    titleContainer:{
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
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
    }
   
  });
  