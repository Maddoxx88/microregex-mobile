import { gql } from "@apollo/client";
import { NhostClient } from "@nhost/nhost-js";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const nhost = new NhostClient({
  subdomain: "wwgsiqjwetcrvgptnyta",
  region: "ap-south-1",
});

export default function App() {
  const [patternList, setPatternList] = useState([]);
  const [text, setText] = useState("");
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
    const newList = patternList.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setPatternList(newList);
  };

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
    <View className="flex-1 items-center justify-center bg-white">
      <TextInput
        selectionColor={"#000"}
        underlineColorAndroid={"#000"}
        className="py-6 px-4 w-56 text-xl bg-white mt-8 mb-4"
        placeholder="find your match"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
        onChange={handleSearch}
      />
      {/* <ActivityIndicator size="large" /> */}
      <FlatList
        data={patternList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item.name)}>
            <Text className="text-xl text-left font-bold py-2 px-8">
              {item.name} : {item.preview}
            </Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
    // </NhostReactProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 15,
  },
  
  textInput: {
    padding: 12,
    fontSize: 18.0,
    backgroundColor: "#fff",
    marginVertical: 5,
    height: 75,
    width: 250,
    marginVertical: 10
  },
});
