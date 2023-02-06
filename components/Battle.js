import { useState, useReducer } from "react";
import CreatureList from "./CreatureList";

import { StyleSheet, View, Pressable } from "react-native";

import { RefreshIcon, AddNewCharacterIcon } from "../components/Icons";

function creaturesReducer(creatures, action) {
  switch (action.type) {
    case "added": {
      return [
        ...creatures,
        {
          id: action.id,
          title: action.title,
          isCurrent: false,
        },
      ];
    }
    case "deleted": {
      return creatures.filter((c) => c.id !== action.id);
    }

    case "refreshed": {
      return [];
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function Battle() {
  const [creatures, dispatch] = useReducer(creaturesReducer, []);

  function handleAddCreature() {
    dispatch({
      type: "added",
      id: Math.random().toString(12).substring(0),
      title: "Item",
    });
  }

  function handleDeleteCreature(id) {
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  function handleRefreshCreatures() {
    dispatch({
      type: "refreshed",
    });
  }

  return (
    <>
      {/* <ImageBackground
        source={require("../assets/images/GreenBackground.png")}
        style={styles.image}
      /> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleAddCreature}>
            <AddNewCharacterIcon />
          </Pressable>
          <Pressable onPress={handleRefreshCreatures}>
            <RefreshIcon />
          </Pressable>
        </View>
        <CreatureList
          creatures={creatures}
          onDeleteCreature={handleDeleteCreature}
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
    marginTop: 45,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginBottom: 10,
  },
});
