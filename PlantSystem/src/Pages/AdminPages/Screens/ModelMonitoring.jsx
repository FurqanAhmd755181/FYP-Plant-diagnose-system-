import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const BACKEND_URL = 'http://192.168.1.17:5000'; // Replace with your local IP if different

const ModelMonitoring = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [plotUri, setPlotUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics
        const res = await fetch(`${BACKEND_URL}/api/model/statistics`);
        const json = await res.json();
        setStats(json);

        // Set plot image URI
        setPlotUri(`${BACKEND_URL}/api/model/plot`);
      } catch (error) {
        console.error('Error fetching monitoring data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0B5D51" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: 'red' }}>Failed to load stats.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Model Monitoring</Text>

      {/* Plot Image */}
      <View style={styles.card}>
        <Text style={styles.title}>Accuracy & Loss Graph</Text>
        {plotUri && (
          <Image
            source={{ uri: plotUri }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Statistics */}
      <View style={styles.card}>
        <Text style={styles.title}>Total Epochs</Text>
        <Text style={styles.value}>{stats.total_epochs}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Final Training Accuracy</Text>
        <Text style={styles.value}>{stats.final_training_accuracy}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Final Validation Accuracy</Text>
        <Text style={styles.value}>{stats.final_validation_accuracy}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Final Training Loss</Text>
        <Text style={styles.value}>{stats.final_training_loss}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Final Validation Loss</Text>
        <Text style={styles.value}>{stats.final_validation_loss}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Best Validation Accuracy</Text>
        <Text style={styles.value}>{stats.best_validation_accuracy}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Lowest Validation Loss</Text>
        <Text style={styles.value}>{stats.lowest_validation_loss}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 64,
    height: 250,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default ModelMonitoring;
