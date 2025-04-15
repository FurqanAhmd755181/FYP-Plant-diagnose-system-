import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "../Pages/UserPages/HomePage";
import MyPlantsScreen from "../Pages/UserPages/MyPlantsScreen";
import DrawerScreen from "../components/Drawer";
import Camera from "../components/Camera";
import { PhotoProvider } from "../components/PhotoContext"; // Import PhotoProvider

// Screens
function DiagnoseScreen() {
  return (
    <View style={styles.screen}>
      <Text>Diagnose Screen</Text>
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PhotoProvider> {/* Wrap the entire app with PhotoProvider */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Diagnose") {
              iconName = "medkit"; // Icon for Diagnose Screen
            } else if (route.name === "Camera") {
              iconName = "camera";
            } else if (route.name === "My Plants") {
              iconName = "leaf";
            } else if (route.name === "Setting") {
              iconName = "settings"; // Icon for Setting Screen
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4, // Add spacing between icon and label
          },
          tabBarIconStyle: {
            marginBottom: -4, // Adjust icon position
          },
          tabBarStyle: {
            backgroundColor: "#f0f8f5",
            paddingVertical: 8, // Increase height for better spacing
          },
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "#8c8c8c",
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Diagnose" component={DiagnoseScreen} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="My Plants" component={MyPlantsScreen} />
        <Tab.Screen name="Setting" component={DrawerScreen} />
      </Tab.Navigator>
    </PhotoProvider> // Ensure the context is provided here
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
