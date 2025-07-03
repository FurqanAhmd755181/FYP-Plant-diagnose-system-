import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ModelMonitoring = () => {
  // Generate labels for 50 epochs
  const accuracyLabels = Array.from({ length: 50 }, (_, i) => `E${i + 1}`);

  // Generate mock accuracy data (starts at 70%, increases slightly each epoch)
  const accuracyData = Array.from({ length: 50 }, (_, i) =>
    Math.min(70 + i * 0.6 + Math.random() * 2, 99).toFixed(2)
  );

  // Generate mock data size (e.g., for each batch of training)
  const dataSizeLabels = Array.from({ length: 10 }, (_, i) => `Batch ${i + 1}`);
  const dataSize = Array.from({ length: 10 }, () => Math.floor(100 + Math.random() * 100));

  const lastRetrained = '2025-06-01';
  const nextRetraining = '2025-06-20';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Model Monitoring</Text>

      {/* Accuracy Chart */}
      <View style={styles.card}>
        <Text style={styles.title}>Model Accuracy Over 50 Epochs</Text>
        <LineChart
          data={{
            labels: accuracyLabels.filter((_, i) => i % 5 === 0), // show every 5th label
            datasets: [{ data: accuracyData.map(Number) }],
          }}
          width={screenWidth - 32}
          height={250}
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      {/* Data Size */}
      <View style={styles.card}>
        <Text style={styles.title}>Training Data Size</Text>
        <BarChart
          data={{
            labels: dataSizeLabels,
            datasets: [{ data: dataSize }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      {/* Retraining Info */}
      <View style={styles.card}>
        <Text style={styles.title}>Last Retrained</Text>
        <Text style={styles.value}>{lastRetrained}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Next Retraining Scheduled</Text>
        <Text style={styles.value}>{nextRetraining}</Text>
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#f9f9f9',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#f4f4f4',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(11, 93, 81, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 10,
  },
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
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default ModelMonitoring;
