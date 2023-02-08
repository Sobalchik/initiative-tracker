import { useState, useReducer, useRef, useEffect} from "react";
import { Entypo, Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  RefreshIcon,
  AddNewCharacterIcon,
  Arrow,
  CreatureIcon,
  DeleteIcon,
} from "../components/Icons";

const { width, height } = Dimensions.get("screen");

const _colors = {
  active: `#FCD259ff`,
  inactive: `#AED857`,
};
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

  useEffect(() => {
    if (creatures.length > 0) {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPostiton: 0.5,
      });
    }
  }, [index]);

  function handleAddCreature() {
    dispatch({
      type: "added",
      id: Math.random().toString(12).substring(0),
      title: "Item" + Math.random().toString(12).substring(0),
    });
  }

  function handleDeleteCreature(id, index, fIndex) {
    if (index > fIndex) {
      setIndex(index - 1);
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

  const Item = ({ title, id, index, fIndex }) => (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={[
          styles.trackerItem,
          {
            backgroundColor:
              fIndex === index ? _colors.active : _colors.inactive,
          },
        ]}
      >
        <CreatureIcon />
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={() => handleDeleteCreature(id, index, fIndex)}>
          <DeleteIcon />
        </Pressable>
      </View>
    </Pressable>
  );

  const renderItem = ({ item, index: fIndex }) => (
    <Item title={item.title} id={item.id} index={index} fIndex={fIndex} />
  );

      
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleAddCreature}>
            <AddNewCharacterIcon />
          </Pressable>
          <Pressable>
            <RefreshIcon onPress={handleRefreshCreatures} />
          </Pressable>
        </View>
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          style={{ maxHeight: 500 }}
          data={creatures}
          ListEmptyComponent={() => {
            return <Text>Nothing here</Text>;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: _spacing * 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ color: "#36303F", fontWeight: "700", marginBottom: 10 }}
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
  trackerItem: {
    width: 350,
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
});
