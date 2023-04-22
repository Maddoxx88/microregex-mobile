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
import Card from "./src/components/card";

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
        regex
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
        className="px-2 py-4 w-56 font-medium text-xl bg-white mt-8 mb-4"
        placeholder="find your match"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
        onChange={handleSearch}
      />
      {/* <ActivityIndicator size="large" /> */}
      <FlatList
        data={patternList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false} 
        columnWrapperStyle={{justifyContent: 'space-between', flex: 1}} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item.name)}>
          <Card className="w-1/2 max-w-1/2 my-2 h-24">
            <Text className="text-xl w-36">
              {item.name}
            </Text>
            <Text className="text-xs text-slate-400 font-medium py-2">
              Click to open
            </Text>
          </Card>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
    // </NhostReactProvider>
  );
}

const styles = StyleSheet.create({

});
