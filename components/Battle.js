import { useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

import {
  DeleteIcon,
  DeleteIconOutline,
  CreatureIcon,
  InitiativeArrowIcon,
  RefreshIcon,
  AddNewCharacterIcon,
} from "../components/Icons";

export default function Battle() {
  const [initialElements, changeEl] = useState([]);
  const addCharacter = () => addItem(Math.random().toString(12).substring(0));

  const addItem = (id) => {
    var newArray = [...initialElements, { id: id, title: "Item " + id }];
    changeEl(newArray);
  };

  const deleteItem = (id) => {
    const newArray = initialElements.filter((item) => item.id !== id);
    changeEl(newArray);
  };

  const refreshInitive = () => {
    var newArray = [];
    changeEl(newArray);
  };

  const Item = ({ title, id }) => (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <InitiativeArrowIcon />
      <View style={styles.trackerItem}>
        <CreatureIcon />
        <Text style={styles.title}>{title}</Text>
        <Pressable
          onPress={() => {
            deleteItem(id);
          }}
        >
          <DeleteIcon />
        </Pressable>
      </View>
      <InitiativeArrowIcon style={{ transform: [{ rotateY: "180deg" }] }} />
    </Pressable>
  );

  return (
    <>
      {/* <ImageBackground
        source={require("../assets/images/GreenBackground.png")}
        style={styles.image}
      /> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={addCharacter}>
            <AddNewCharacterIcon />
          </Pressable>
          <Pressable onPress={refreshInitive}>
            <RefreshIcon />
          </Pressable>
        </View>
        <FlatList
          data={initialElements}
          renderItem={({ item }) => <Item title={item.title} id={item.id} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
  },
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginBottom: 10,
  },
  trackerItem: {
    width: 350,
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#AED857",
    marginVertical: 8,
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
});
