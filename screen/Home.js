import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { getMangaData } from "../utils/http";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home({ navigation }) {
  const [enterGoalText, setEnterGoalText] = useState('');
  const [dataManga, setMangaData] = useState([]);
  const [activityStatus, setactivityStatus] = useState(true);

  function handleImagePress(item) {
    navigation.navigate('Chapterlist', {
     item
    });
  }
  useEffect(()=>{
    let isCancelled = false;
    async function getManga(){
      const data = await getMangaData();
      if(!isCancelled){
        setMangaData(data)
        setactivityStatus(false)
      }
    }
    getManga();
    return ()=>{
      isCancelled = true;
    }
  }, [])
  return (
    <View style={styles.container}>
      
      <Text style={styles.upperTitle}>Mangakyo</Text>

     {activityStatus ? <View style={styles.containerLoader}>
            <ActivityIndicator size="large" color="#89CFF0"/>
        </View> : <FlatList style={styles.categoryContainer}  showsVerticalScrollIndicator={false} data={dataManga} renderItem={({ item }) => {
       return ( <>
          <View style={styles.featureContainer}>
            <Ionicons name="albums" size={20} color="#189AB4" />
            <Text style={styles.featureTitle}>{item.title}</Text>
          </View>
          <FlatList
            data={item.manga}
            renderItem={({ item }) => {
              return (
                <View styles={styles.bookFolder}>
                  <TouchableOpacity onPress={() => handleImagePress(item)}>
                    <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
                    <Text style={styles.mangaTitle}>{item.comicTitle}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={(item) => (item._id)}
            // numColumns="2",
            horizontal

          />
        </>)
      }} />}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  upperTitle: {
    fontSize: 22,
    marginTop: 16,
    paddingLeft: 15,
    color: "#05445E",
    fontFamily: "hel-v1",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 20,
  },
  bookFolder: {
    justifyContent: 'space-between',
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  coverImage: {
    height: 240,
    width: 170,
    marginTop: 15,
    borderRadius: 10,
    marginRight: 10,
    
  },
  featureContainer: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: 'center'
  },
  featureTitle: {
    color: '#189AB4',
    fontFamily: "hel-v2",
    fontSize: 16,
    marginLeft: 5
  },
  mangaTitle: {
    color: "#05445E",
    fontSize: 16,
    alignSelf: "center",
    paddingVertical: 6,
    fontFamily: 'hel-v2'
  },
  categoryContainer: {
    marginBottom: 30,
  },
  containerLoader:{
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
}
 
});
