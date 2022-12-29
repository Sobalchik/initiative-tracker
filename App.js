import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";

import Battle  from "./components/Battle";
import Library from "./components/Library";
import Settings from "./components/Settings";
import  {BookIcon, BookOutlineIcon, SwordsIcon, SwordsIconOutline, SettingsIcon, SettingIconOutline}  from "./components/Icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Battle") {
              iconName = focused ? SwordsIcon :SwordsIconOutline;
            }

            if (route.name === "Settings") {
              iconName = focused ? SettingsIcon : SettingIconOutline;
            }

            if (route.name === "Library") {
              iconName = focused ? BookIcon : BookOutlineIcon;
            }
            
            SpecificIcon = iconName;
            return <SpecificIcon/>;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Battle" component={Battle} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
