import { useState, useReducer, useRef, useEffect, memo } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import uuid from "react-uuid";

import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";

import {
  RefreshIcon,
  AddNewCharacterIcon,
  Arrow,
  DeleteIcon,
} from "../components/Icons";

import CreatureItem from "./CreatureItem";
import CharacterCreationModal from "./CharacterCreationModal";

const { width, height } = Dimensions.get("screen");

const _spacing = 10;

function creaturesReducer(creatures, action) {
  switch (action.type) {
    case "added": {
      return [
        ...creatures,
        {
          id: action.id,
          title: action.title,
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
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState(false);

  useEffect(() => {
    
    if (creatures.length > 0) {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPostiton: 0.5,
      });
    }
  }, [index]);


  function handleAddCreature(creature) {
    
    dispatch({
      type: "added",
      id: uuid(),
      title: creature.title,
      hp: creature.hp,
      ac: creature.ac,
      initiative: creature.initiative,
      dexMod: creature.dexMod,
    });

    setCharacterCreationModalVisible(false)
  }

  function handleDeleteCreature(id, index, fIndex) {

    if (index > fIndex) {
      setIndex((index) => index - 1);
    }
    if (index === creatures.length - 1) {
      setIndex(0);
    }
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  function handleRefreshCreatures() {
    dispatch({
      type: "refreshed",
    });
    setIndex(0);
  }

  let c = 0;

  const renderItem = ({ item, index: fIndex }) => {

    return (
      <CreatureItem
        item={item}
        index={index}
        fIndex={fIndex}
        onDelete={()=> handleDeleteCreature(item.id, index, fIndex)}
      />
    );
  };



  const keyExtractor = (item) => item.id;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCharacterCreationModalVisible(true)}>
            <AddNewCharacterIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <RefreshIcon onPress={handleRefreshCreatures} />
          </TouchableOpacity>
        </View>

        <CharacterCreationModal
          onClose={() => setCharacterCreationModalVisible(false)}
          characterCreationModalVisible={characterCreationModalVisible}
        />

        <FlatList
          ref={ref}
          initialScrollIndex={index}
          style={{ maxHeight: 500 }}
          data={creatures}
          ListEmptyComponent={() => {
            return <Text>Nothing here</Text>;
          }}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <View
          style={{
            alignCreatureItems: "center",
            flexDirection: "row",
            marginTop: _spacing * 10,
          }}
        >
          <View style={{ alignCreatureItems: "center" }}>
            <Text
              style={{
                color: "#36303F",
                fontWeight: "700",
                marginBottom: 10,
                marginLeft: 60,
              }}
            >
              Navigation
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: width / 2,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (index === 0) {
                    return;
                  }

                  setIndex(index - 1);
                }}
              >
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#FCD259",
                    borderRadius: _spacing,
                    marginRight: _spacing,
                  }}
                >
                  <Feather name="arrow-up" size={24} color="#36303F" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (index === creatures.length - 1) {
                    setIndex(0);
                    return;
                  }
                  setIndex(index + 1);
                }}
              >
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#FCD259",
                    borderRadius: _spacing,
                  }}
                >
                  <Feather name="arrow-down" size={24} color="#36303F" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 16,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
