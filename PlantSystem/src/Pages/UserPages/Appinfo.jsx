import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const AppInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your app logo
          style={styles.logo}
        />
        <Text style={styles.headerText}>Plant Disease Prediction System</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>About the App</Text>
        <Text style={styles.infoText}>
          The Plant Disease Prediction System is designed to help farmers and plant enthusiasts
          quickly identify potential diseases in plants using advanced image processing and AI technology.
          Simply upload a photo of the plant, and the app will provide a prediction and guidance on
          how to address the issue.
        </Text>

        <Text style={styles.sectionHeader}>Features</Text>
        <Text style={styles.infoText}>
          - Predict plant diseases using uploaded images.{"\n"}
          - Multilingual support for global accessibility.{"\n"}
          - Offline access to key features.{"\n"}
          - Community support for plant health tips.{"\n"}
          - Notifications for care reminders and updates.
        </Text>

        <Text style={styles.sectionHeader}>Contact Us</Text>
        <Text style={styles.infoText}>
          For support or feedback, please contact us at:{"\n"}
          Email: support@planthealthapp.com{"\n"}
          Phone: +1 234-567-890
        </Text>

        <Text style={styles.sectionHeader}>Credits</Text>
        <Text style={styles.infoText}>
          Developed by the Plant Health Innovations team.{"\n"}
          Special thanks to all contributors and beta testers who made this app possible.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AppInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 10,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
