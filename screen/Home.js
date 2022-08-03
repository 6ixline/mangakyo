import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import data from '../manga/data';

export default function Home({ navigation }) {
  const [enterGoalText, setEnterGoalText] = useState('');

  function handleImagePress(url, chapterdetailsurl, title, key) {
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

      <FlatList style={styles.categoryContainer} data={data} renderItem={({ item }) => {
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
                  <TouchableOpacity onPress={() => handleImagePress(item.url1, item.url2, item.title, item.storage)}>
                    <Image source={{ uri: item.img }} style={styles.coverImage} />
                    <Text style={styles.mangaTitle}>{item.comicTitle}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={(item) => (item.key)}
            // numColumns="2",
            horizontal

          />
        </>)
      }} />


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
    justifyContent: 'space-between'
  },
  coverImage: {
    height: 240,
    width: 170,
    marginTop: 15,
    borderRadius: 10,
    marginRight: 10
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
  }
});
