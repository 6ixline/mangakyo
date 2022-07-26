import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { getChapter } from "../utils/http";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../loader/loader';

const win = Dimensions.get('window');
const ratio = win.width / 200;

export default function Chapter({route}) {
   
    const [imageurl, setimageurl] = useState([]);
    const [bookMark, setBookMark] = useState('');
    const [chapterData, setChapterData] = useState(route.params.chapterData)
    const [flag, setflag] = useState(true);
    const [activityStatus, setactivityStatus] = useState(true);

    useEffect(()=>{
      let isCancelled = false; 
      const data = {
        "chapterlink": route.params.chapterUrl,
        "chapterImageEnd": chapterData.chapterImageEnd,
        "imageDirect": chapterData.imageDirect,
        "scroll": chapterData.scroll,
      }
      async function getImages(){
        const images = await getChapter(data);
        if(!isCancelled){
          setimageurl(images)
          setactivityStatus(false)
        }

        try{
           const indexValue = await AsyncStorage.getItem(chapterData.storageKey);
           if(indexValue == route.params.chapterIndex){
            if(!isCancelled){
            setBookMark(indexValue);
            setflag(false)
            }
           }
        }catch(e){
          console.log(e.name)
        }
        
      }
      getImages();

      return ()=>{
        isCancelled = true;
      }
    },[])
    async function handleBookMarkPress(){
      if(bookMark == route.params.chapterIndex){
        setBookMark('');
        setflag(false);
      }else{
        await setBookMark(route.params.chapterIndex);
        setflag(true);
      }
        try{
          await AsyncStorage.setItem(chapterData.storageKey, JSON.stringify(bookMark))
          route.params.handleChapter(bookMark)
          console.log(bookMark)
        }catch(e){
          console.log(e.name)
        }
      
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
        {
          activityStatus ? <View style={styles.containerLoader}>
          <ActivityIndicator size="large" color="#89CFF0"  />
      </View> : <FlatList styles={styles.chapterList} data={imageurl} renderItem={(itemData) =>{
            return (
                <Image source={{uri : itemData.item}} style={styles.contentImage}/>
            );
        }} />
        }
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10
    },
    titleContainer:{
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
      paddingBottom: 10,
      marginBottom: 10,
      marginTop: 16
    },
    upperTitle:{
      fontSize: 18,
      fontFamily: "hel-v2",
      color: "#05445E"
    },
    chapterList:{
        flex: 1,
    },
    contentImage:{
        width: win.width,
        height: 300 * ratio,
        marginBottom: 10
    },
    containerLoader:{
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
    },
  });
  