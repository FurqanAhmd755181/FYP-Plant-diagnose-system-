import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { PhotoContext } from "../../components/PhotoContext";

const MyPlantsScreen = () => {
  const { photoUri } = useContext(PhotoContext);

  console.log(photoUri); // Debugging to check the URI

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 My Plants 🌿</Text>
      {photoUri ? (
        <View style={styles.card}>
          <Image
            source={{ uri: photoUri }} // Ensure the URI is being passed correctly
            style={styles.image}
          />
          <Text style={styles.description}>
            This is your most recently captured plant. 🌱
          </Text>
        </View>
      ) : (
        <View style={styles.noPhotoContainer}>
          <Text style={styles.noPhotoText}>
            No photo captured yet. 🌻
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8f5", // Light, plant-themed background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  noPhotoContainer: {
    alignItems: "center",
    padding: 20,
  },
  noPhotoText: {
    fontSize: 18,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default MyPlantsScreen;
