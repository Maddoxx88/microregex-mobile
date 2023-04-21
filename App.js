import { gql } from "@apollo/client";
import { NhostClient } from "@nhost/nhost-js";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const nhost = new NhostClient({
  subdomain: "wwgsiqjwetcrvgptnyta",
  region: "ap-south-1",
});

export default function App() {
  const [patternList, setPatternList] = useState([]);
  const [text, setText] = useState('');
  const PATTERNS = gql`
    query {
      patterns {
        name
        description
        tags
        content
        preview
      }
    }
  `;

  const handleSearch = () => {
    if (text.length < 3) {
      setPatternList(patternList);
      return;
    } 
    const newList = patternList.filter((p) => p.name.toLowerCase().includes(text.toLowerCase()));
    setPatternList(newList)
  }

  console.log("sfsfsf");
  const url = nhost.graphql.getUrl();

  useEffect(() => {
    async function anyNameFunction() {
      const { data } = await nhost.graphql.request(PATTERNS);

      if (data?.patterns) {
        setPatternList(data.patterns);
      }
    }

    anyNameFunction();
  }, [nhost.graphql]);

  return (
    // <NhostReactProvider nhost={nhost}>
    <View style={styles.container}>
          <TextInput
        style={{padding: 5, width: "100%", fontSize: 16.0, borderRadius: 4, borderWidth: 2, borderColor: "#000", backgroundColor: "#888", marginVertical: 5}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        onChange={handleSearch}
        
      />
      {/* <ActivityIndicator size="large" /> */}
      <FlatList
        data={patternList}
        renderItem={
          ({ item }) => 
          <TouchableOpacity onPress={() => console.log(item.name) }>
          <Text style={styles.item}>{item.name} : {item.preview}</Text>
          </TouchableOpacity>
          }
      />
      <StatusBar style="auto" />
    </View>
    // </NhostReactProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 15
  },
});
