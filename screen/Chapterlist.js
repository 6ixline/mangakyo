import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image,Dimensions, FlatList  } from 'react-native';
import { getChapterList } from "../utils/http"; 


const win = Dimensions.get('window');
const ratio = win.width / 200;

export default function Chapterlist({route, navigation}) {

    const [chapterList, setChapterlist] = useState([{id: 1, url:'https://testing.com'}]);
    const [currentChapter, setcurrentChapter] = useState(null);

    useEffect(()=>{
        async function getChapters(){
           const chapters =  await getChapterList();
           setChapterlist(chapters);
        }
        getChapters()
    }, [])

    function handleNaviation(title, url, index){
        setcurrentChapter(index);
        navigation.navigate('Chapter', {
            title: title,
            url: url
        })
    }
   
    return (
      <View style={styles.container}>
        <Text style={styles.upperTitle}>{route.params.title}</Text>
  
        <FlatList data={chapterList} renderItem={({item, index})=> {
          
            return (
                <TouchableOpacity style={[styles.chapterLink, { backgroundColor: currentChapter == index ? '#75E6DA' : "#fff" }]}  onPress={()=> handleNaviation(item.id, item.url, index)}>
                    <Text style={styles.innerText}>{item.id}</Text>
                </TouchableOpacity>
            );
        }}
        numColumns={4}
        keyExtractor={item=> item.id}
        />
        
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
      paddingHorizontal: 16,
      paddingBottom: 50
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
    chapterList:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between"

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
        fontWeight: "bold",
        fontSize:20,
        color: "#05445E"
    },
    bottomText:{
      position: "absolute",
      bottom: 8,
      left: "36%"
    }

   
  });
  