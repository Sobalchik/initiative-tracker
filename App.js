import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Battle from "./components/Battle";
import Library from "./components/Library";
import Settings from "./components/Settings";
import {
  BookIcon,
  BookOutlineIcon,
  SwordsIcon,
  SwordsIconOutline,
  SettingsIcon,
  SettingIconOutline,
} from "./components/Icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let SpecificIcon;

            if (route.name === "Battle") {
              SpecificIcon = focused ? SwordsIcon : SwordsIconOutline;
            }

            if (route.name === "Settings") {
              SpecificIcon = focused ? SettingsIcon : SettingIconOutline;
            }

            if (route.name === "Library") {
              SpecificIcon = focused ? BookIcon : BookOutlineIcon;
            }

            return <SpecificIcon />;
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Battle" component={Battle} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
