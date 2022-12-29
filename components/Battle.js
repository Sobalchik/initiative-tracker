import {
  ImageBackground,
  StyleSheet,
  VirtualizedList,
  View,
  Text,
  Pressable,
} from "react-native";

import {
  DeleteIcon,
  DeleteIconOutline,
  CreatureIcon,
  InitiativeArrowIcon,
  RefreshIcon,
  AddNewCharacterIcon,
} from "../components/Icons";

const DATA = [];

const [initiativeItems, setCount] = useState(0);

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (data) => 0;

const addCharacter = () => alert("Add character");
const refresh = () => alert("refresh!");
const prinInfo =(title) => alert(title)
 
const Item = ({ title }) => (
  <Pressable style={{display: "flex",flexDirection: "row", justifyContent:"space-between", alignItems:"center"}} onPress={refresh}>
    <InitiativeArrowIcon/>
    <View style={styles.trackerItem}>
      <CreatureIcon />
      <Text style={styles.title}>{title}</Text>
      <DeleteIcon />
    </View>
    <InitiativeArrowIcon
      style={{ transform: [{ rotateY: "180deg" }] }}
    />
  </Pressable>
);

export default function Battle() {
  const renderItem = ({ item }) => <Item title={item.title} />;

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
          <Pressable onPress={refresh}>
            <RefreshIcon />
          </Pressable>
        </View>
        <VirtualizedList
          data={DATA}
          initialNumToRender={4}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
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
