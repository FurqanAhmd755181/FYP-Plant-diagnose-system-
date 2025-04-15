import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ModelMonitoring = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Model Monitoring</Text>

      {/* Model Accuracy Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Model Accuracy Over Time</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                data: [88, 90, 92, 93, 92],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#f9f9f9',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#f4f4f4',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(11, 93, 81, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 10,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>

      {/* Training Data Size */}
      <View style={styles.card}>
        <Text style={styles.title}>Training Data Size</Text>
        <BarChart
          data={{
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
              {
                data: [4000, 6500, 8000, 10245, 15000],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#f9f9f9',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#f4f4f4',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(11, 93, 81, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 10,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>

      {/* Last and Next Retraining */}
      <View style={styles.card}>
        <Text style={styles.title}>Last Retrained</Text>
        <Text style={styles.value}>Dec 20, 2024</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Next Retraining Scheduled</Text>
        <Text style={styles.value}>Jan 10, 2025</Text>
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
});

export default ModelMonitoring;
