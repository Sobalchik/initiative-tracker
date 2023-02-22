import { memo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { CreatureIcon, DeleteIcon } from "../components/Icons";

import Animated, { SlideInLeft } from "react-native-reanimated";

import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const _colors = {
  active: `#FCD259ff`,
  inactive: `#AED857`,
};

const CreatureItem = ({ item, index, fIndex, onDelete }) => {

  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={{ backgroundColor: "red", flex:1, justifyContent: 'flex-end', flexDirection:"row", alignItems:"center"}}>
        <Pressable onPress={onDelete}>
          <DeleteIcon />
        </Pressable>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={1.2}
        rightThreshold={180}
        renderRightActions={renderRightActions}
        onSwipeableOpen={onDelete}
      >
        <Animated.View
          entering={SlideInLeft.duration(1000)}
          style={[
            styles.trackerItem,
            {
              backgroundColor:
                fIndex === index ? _colors.active : _colors.inactive,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <CreatureIcon />
          <Text style={styles.title}>
            Name: {item.title} - {item.initiative}
          </Text>
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  trackerItem: {
    width: 350,
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignCreatureIcons: "center",
    padding: 10,
  },
  title: {
    fontSize: 16,
  },

  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  
  rightAction: {
    alignItems: 'center',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default memo(CreatureItem, (prevProps, nextProps) => {
  if (prevProps.fIndex !== nextProps.fIndex) return false; //для корректной работы удаления

  if (
    nextProps.fIndex === nextProps.index || // при смене индекса
    nextProps.fIndex === prevProps.index
  ) {
    return false;
  }

  return true;
});
