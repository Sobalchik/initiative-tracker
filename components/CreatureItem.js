import { memo } from "react";
import { StyleSheet, Text, View, Pressable  } from "react-native";

import { CreatureIcon, DeleteIcon } from "../components/Icons";

const _colors = {
  active: `#FCD259ff`,
  inactive: `#AED857`,
};

const CreatureItem = (props) => {
  return (
    <Pressable
      style={[
        styles.trackerItem,
        {
          backgroundColor:
            props.fIndex === props.index ? _colors.active : _colors.inactive,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <CreatureIcon />
      <Text style={styles.title}>{props.title}</Text>
      <Pressable onPress={() => handleDeleteCreature(id, index, fIndex)}>
            <DeleteIcon />
          </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trackerItem: {
    width: 350,
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignCreatureIcons: "center",
    marginVertical: 8,
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default memo(CreatureItem, (prevProps, nextProps) => {

  if ((nextProps.fIndex === nextProps.index)||(nextProps.fIndex===prevProps.index))
  return false;
  return true;
});
