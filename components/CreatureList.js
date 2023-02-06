import { StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {
    DeleteIcon,
    CreatureIcon,
    InitiativeArrowIcon,
  } from "../components/Icons";



export default function CreatureList ({creatures, deleteCreature})
{
    const Item = ({ title, id }) => (
        <Pressable
          style={{
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
                deleteCreature(id);
              }}
            >
              <DeleteIcon />
            </Pressable>
          </View>
          <InitiativeArrowIcon style={{ transform: [{ rotateY: "180deg" }] }} />
        </Pressable>
      );

    return (
        <FlatList
        data={creatures}
        renderItem={({ item }) => <Item title={item.title} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
      );
}

const styles = StyleSheet.create({
    trackerItem: {
      width: 350,
      height: 60,
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
  