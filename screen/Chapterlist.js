import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { getChapterList } from "../utils/http"; 
import storage from '../storage/storage';
import Loader from '../loader/loader';

const win = Dimensions.get('window');
const ratio = win.width / 200;

export default function Chapterlist({route, navigation}) {

    const [chapterList, setChapterlist] = useState([]);
    const [currentChapter, setcurrentChapter] = useState(null);
    const [activityStatus, setactivityStatus] = useState(true);

    useEffect(()=>{
        let isCancelled = false;
        async function getChapters(){
            const chapters =  await getChapterList(route.params.url);
            if(!isCancelled){
              setChapterlist(chapters);
              setactivityStatus(false);
            }

            storage.load({key: route.params.key})
            .then(index => { 
              if(!isCancelled){
                setcurrentChapter(index)
              }
            })
            .catch(err => { console.log("No Data Found!")})
        }
        getChapters()

        return () =>{
          isCancelled = true;
        }
    }, [])

    function handleChapterState(index){
      if(index != ""){
        setcurrentChapter(index);
      }
    }

    function handleNaviation(title, url, index){
        navigation.navigate('Chapter', {
            title: title,
            url: route.params.cdUrl,
            chapterUrl: url,
            chapterIndex:index,
            key: route.params.key,
            handleChapter: handleChapterState
        })
    }
   
    return (
      <View style={styles.container}>
        <Text style={styles.upperTitle}>{route.params.title}</Text>
      
        { activityStatus ? <View style={styles.containerLoader}>
            <ActivityIndicator size="large" color="#89CFF0"/>
        </View>  :
        <FlatList data={chapterList} renderItem={({item, index})=> {
          
            return (
                <TouchableOpacity style={[styles.chapterLink, { backgroundColor: currentChapter == index ? '#75E6DA' : "#fff" }]}  onPress={()=> handleNaviation(item.id, item.url, index)}>
                    <Text style={styles.innerText}>{item.id}</Text>
                </TouchableOpacity>
            );
        }}
        numColumns={4}
        keyExtractor={item=> item.id}
        /> }
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 25
    },
    upperTitle:{
      fontSize: 18,
      fontFamily: "hel-v2",
      marginTop: 16,
      color: "#05445E",
      paddingLeft: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
      paddingBottom: 15,
    },
    chapterList:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom:  10

    },
    chapterLink:{
        width: 90,
        height: 45,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        borderRadius: 15,
        marginTop: 20,
        marginRight: 10
    },
    innerText:{
        fontFamily: "hel-v2",
        fontSize:20,
        color: "#05445E",
    },
    containerLoader:{
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
  }
   
  });
  