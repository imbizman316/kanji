import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import {} from "react-native-web";
import CustomCompo from "./src/CustomCompo";

export default function App() {
  const [level, setLevel] = useState(1);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [kanjis, setKanjis] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [currentMeaning, setCurrentMeaning] = useState("");
  const [currentKanji, setCurrentKanji] = useState("");
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://kanjiapi.dev/v1/kanji/grade-${level}`
      );
      const responseJson = await response.json();
      await setKanjis(responseJson);

      console.log(responseJson);

      const word = await responseJson[
        Math.floor(Math.random() * responseJson.length)
      ];
      console.log(word);
      const response2 = await fetch(`https://kanjiapi.dev/v1/kanji/${word}`);

      console.log(response2);
      const data = await response2.json();
      console.log(data);
      setCurrentMeaning(data.heisig_en);
      setCurrentKanji(data.kanji);
      setReadings(data.kun_readings);
      setMeanings(data.meanings);
    } catch (err) {
      console.error("Here's what went wrong", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchWord() {
    // setCurrentKanji(word);
    // console.log(word);

    setIsLoading(true);
    setShowMeaning(false);
    setShowPronunciation(false);
    try {
      const word = await kanjis[Math.floor(Math.random() * kanjis.length)];
      const response = await fetch(`https://kanjiapi.dev/v1/kanji/${word}`);

      console.log(word);
      const data = await response.json();
      console.log(data);
      setCurrentMeaning(data.heisig_en);
      setCurrentKanji(data.kanji);
      setReadings(data.kun_readings);
      setMeanings(data.meanings);
    } catch (err) {
      console.error("Here's what went wrong", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [level]);

  // useEffect(() => {
  //   searchWord();
  // }, [kanjis]);

  function handleLevelChange(level) {
    setLevel(level);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        {/* <CustomCompo /> */}
        <Text style={[styles.word, { marginTop: 20 }]}>TODAY'S KANJI</Text>

        {isLoading ? (
          <View style={styles.kanjiContainer}>
            <Text style={styles.word}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.kanjiContainer}>
            <Text style={styles.currentKanji}>{currentKanji}</Text>
            {showMeaning && (
              <ScrollView style={styles.ScrollViewContainer}>
                {meanings.map((meaning, index) => (
                  <Text key={index} style={styles.word}>
                    {meaning}
                  </Text>
                ))}
              </ScrollView>
            )}
            <Button
              title={showMeaning ? "hide" : "meaning"}
              onPress={() => setShowMeaning(!showMeaning)}
            />
            {showPronunciation && (
              <ScrollView style={styles.ScrollViewContainer}>
                {readings.map((reading, index) => (
                  <Text key={index} style={styles.word}>
                    {reading}
                  </Text>
                ))}
              </ScrollView>
            )}
            <Button
              title={showPronunciation ? "hide" : "pronuncation"}
              onPress={() => setShowPronunciation(!showPronunciation)}
            />
            <View style={styles.levelButtons}>
              <Button title="1" onPress={() => setLevel(1)} />
              <Button title="2" onPress={() => setLevel(2)} />
              <Button title="3" onPress={() => setLevel(3)} />
              <Button title="4" onPress={() => setLevel(4)} />
              <Button title="5" onPress={() => setLevel(5)} />
              <Button title="6" onPress={() => setLevel(6)} />
            </View>
            <Button
              title="Change"
              onPress={() => {
                searchWord();
              }}
            ></Button>
          </View>
        )}
        <View>
          {/* <Text>{currentKanji}</Text>
          <Text>{meanings}</Text> */}
        </View>
        {/* <View style={styles.cardContainer}>
          {kanjis.map((item, index) => {
            return (
              <View key={index}>
                <Pressable onPress={() => searchWord()}>
                  <View style={styles.wordContainer}>
                    <Text style={styles.word}>{item}</Text>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View> */}
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  word: {
    fontSize: 40,
    textAlign: "center",
  },
  wordContainer: {
    width: 100,
    // borderWidth: 2,
    // flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentKanji: {
    fontSize: 200,
  },
  kanjiContainer: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    width: 370,
    minHeight: 600,
  },
  ScrollViewContainer: {
    height: 10,
    width: "95%",
    margin: 10,
    borderWidth: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  levelButtons: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
});
