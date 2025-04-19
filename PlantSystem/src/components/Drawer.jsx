import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import SignInScreen from "../Pages/AuthPages/SigninPage";
import SignUpScreen from "../Pages/AuthPages/SinupPage";
import PrivacyPolicyScreen from "../Pages/UserPages/PrivacyPolicy";
import TermsOfUseScreen from "../Pages/UserPages/TermsOfUse";
import AppInfoScreen from "../Pages/UserPages/Appinfo";

const Drawer = createDrawerNavigator();

const SettingsScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: "General Settings",
      data: [
        { name: "Set Language", icon: "language" },
        { name: "Care Notification", icon: "notifications" },
        { name: "Allow to Access", icon: "lock" },
        { name: "Autosave Photos to Album", icon: "photo" },
        { name: "Clear Cache", icon: "delete" },
      ],
    },
    {
      title: "Support",
      data: [
        { name: "Encourage Us", icon: "favorite" },
        { name: "Help", icon: "help" },
        { name: "Suggestion", icon: "feedback" },
        { name: "How to Take a Picture", icon: "camera-alt" },
        { name: "Suggest Plant to Be Added", icon: "nature" },
      ],
    },
    {
      title: "Account",
      data: [
        {
          name: "Sign in",
          icon: "account-circle",
          action: () => navigation.navigate("SignIn"),
        },
        {
          name: "Sign Up",
          icon: "person-add",
          action: () => navigation.navigate("SignUp"),
        },
      ],
    },
    {
      title: "Legal",
      data: [
        {
          name: "Privacy Policy",
          icon: "policy",
          action: () => navigation.navigate("PrivacyPolicy"),
        },
        {
          name: "Terms of Use",
          icon: "description",
          action: () => navigation.navigate("TermsOfUse"),
        },
      ],
    },
    {
      title: "About the App",
      data: [
        {
          name: "App Info",
          icon: "info",
          action: () => navigation.navigate("Appinfo"),
        },
        { name: "Rate App", icon: "star" },
        { name: "Tell Friends", icon: "share" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={item.action ? item.action : () => {}}
          >
            <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
            <View style={styles.divider} />
          </View>
        )}
      />
    </View>
  );
};

export default function DrawerScreen() {
  return (
    <Drawer.Navigator initialRouteName="Settings">
      <Drawer.Screen name="SignIn" component={SignInScreen} />
      <Drawer.Screen name="SignUp" component={SignUpScreen} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Drawer.Screen name="Appinfo" component={AppInfoScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    marginTop: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    fontSize: 16,
    color: "#555",
  },
});
