import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
// import { StatusBar } from "expo-status-bar";

export default function CustomCompo() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const LIST = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571efeafe33",
      title: "Fourth Item",
    },
  ];

  React.useEffect(() => {
    async function getNames() {
      const res = await fetch(
        "https://randomuser.me/api/?results=100&inc=name"
      );
      const jsonData = await res.json();
      const names = jsonData.results;

      console.log(names);
      setNameData(names);
    }
    getNames();
  }, []);

  const [count, setCount] = React.useState(0);
  const [myName, setName] = React.useState("");
  const [nameData, setNameData] = React.useState([]);

  function handlePress(value) {
    alert(value);
    setCount(count + 1);
  }

  const Item = ({ title, first, last }) => (
    <View style={styles.flatItem}>
      <Text style={styles.flatText}>
        {title}[{first} {last}
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomButton />
        <FlatList
          data={nameData}
          renderItem={({ item }) => (
            <Item
              title={item.name.title}
              first={item.name.first}
              last={item.name.last}
            />
          )}
          keyExtractor={(item, index) => index}
        />
        <View style={styles.customButtonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => handlePress("Hello")}
          >
            <Text style={{ color: "white" }}>Say hello</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => handlePress("Goodbye")}
          >
            <Text style={{ color: "white" }}>Say goodbye</Text>
          </TouchableOpacity>
          <Text>You said {count} times.</Text>
          <View style={styles.threeBoxes}>
            <View style={[styles.box, { backgroundColor: "#87CEEB" }]}>
              <Text>Square 1</Text>
            </View>
            <View style={[styles.box, { backgroundColor: "green" }]}>
              <Text>Square 2</Text>
            </View>
            <View style={[styles.box, { backgroundColor: "pink" }]}>
              <Text>Square 3</Text>
            </View>
          </View>

          <View>
            <Text>What is your name?</Text>
            <TextInput
              placeholder="your name"
              style={styles.input}
              value={myName}
              onChange={(e) => setName(e.target.value)}
            ></TextInput>
            <Button title="Say ma name" onPress={() => alert(myName)}></Button>
          </View>

          {data.map((box, index) => {
            return (
              <View
                style={[styles.box, { backgroundColor: "#87CEEB" }]}
                key={index}
              >
                <Text>Square {box}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customButton: {
    width: 100,
    backgroundColor: "#AA336A",
    height: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    // flex: 1,
  },
  customButtonContainer: {
    alignItems: "center",
    gap: 30,
    margin: 20,
    width: "100%",
  },
  threeBoxes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    gap: 10,
  },
  box: {
    height: 100,
    width: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    height: 40,
    margin: 12,
    padding: 10,
    borderColor: "blue",
  },
  // flatContainer: { flex: 1, marginTop: StatusBar.currentHeight || 0 },
  flatItem: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatText: { fontSize: 22, color: "black", fontWeight: "bold" },
});
