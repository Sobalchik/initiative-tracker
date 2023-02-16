import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { Heart, Shield, Sword } from "./Icons";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";


const CharacterCreationModal = (props) => {
  const [fontsLoaded] = useFonts({
    "Fira-Sans-Extra": require("../assets/fonts/FiraSansExtraCondensed-Light.ttf"),
  });

  const [creatureStats, setCreatureStats] = useState({
    title: "",
    hp: "",
    ac: "",
    initiative: "",
    dexMod: "",
  });

  useEffect(() => {
    console.log(creatureStats);
  }, [creatureStats]);

  const updateStats = (value, stat) => {
    setCreatureStats(existingStats => ({
      ...existingStats,
      [stat]: value.nativeEvent.text,
    }))
  }

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.characterCreationModalVisible}
      onRequestClose={props.onClose}
    >
      <View style={styles.modal}>
        <TextInput
          style={[styles.input, { width: 150 }]}
          placeholder={"Name"}
          onChange={(value) => updateStats(value,"title")}
        />
        <View style={{ flexDirection: "row" }}>
          <Heart style={{ marginTop: 15 }} />
          <TextInput
            style={styles.input}
            placeholder={"HP"}
            maxLength={3}
            onChange={(value) => updateStats(value,"hp")}
          />
          <Shield style={{ marginTop: 15 }} />
          <TextInput
            style={styles.input}
            placeholder={"AC"}
            maxLength={2}
            onChange={(value) => updateStats(value,"ac")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.text, { marginTop: 20 }]}>Initiative</Text>
          <TextInput
            style={styles.input}
            placeholder={"10"}
            maxLength={2}
            onChange={(value) => updateStats(value,"initiative")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.text, { marginTop: 20 }]}>DEX mod</Text>
          <TextInput
            style={styles.input}
            placeholder={"3"}
            maxLength={2}
            onChange={(value) => updateStats(value,"dexMod")}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={props.onClose}>
          <Text style={[styles.text, { padding: 5, color: "#FFFFFF" }]}>
            Ready to Fight
          </Text>
          <Sword />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 180,
    marginHorizontal: 25,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 7,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9CC14E",
    borderRadius: 10,
    height: 35,
    width: 130,
  },
  text: {
    color: "#000000",
    fontFamily: "Fira-Sans-Extra",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    shadowColor: "black",
    width: 50,
  },
});

export default CharacterCreationModal;
