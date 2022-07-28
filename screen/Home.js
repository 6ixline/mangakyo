import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList } from 'react-native';
import manga from '../manga/data';

export default function Home({navigation}) {
    const [enterGoalText, setEnterGoalText] = useState('');
   
    function handleImagePress(url, chapterdetailsurl, title, key){
        navigation.navigate('Chapterlist', {
            title: title,
            url: url,
            cdUrl: chapterdetailsurl,
            key: key
        });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.upperTitle}>Mangakyo</Text>
        <FlatList 
          data={manga}
          renderItem = {({item})=>{
            return (
              <View styles={styles.bookFolder}>
              <TouchableOpacity onPress={()=> handleImagePress(item.url1, item.url2, item.title, item.storage)}>
                <Image source={{uri: item.img}} style={styles.coverImage} />
              </TouchableOpacity>
            </View>
            )
          }}
          keyExtractor={(item)=>(item.key)}
          numColumns="2"
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    bookFolder:{
      justifyContent: 'space-between'
    },
    coverImage:{
      height: 250,
      width: 180,
      marginTop: 15,
      borderRadius: 10,
      marginRight: 20
    }  
  });
  