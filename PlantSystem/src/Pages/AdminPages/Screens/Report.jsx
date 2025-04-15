import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const reports = [
  { id: '1', title: 'Daily Usage', value: '245 Predictions' },
  { id: '2', title: 'Weekly Usage', value: '1,645 Predictions' },
  { id: '3', title: 'Monthly Usage', value: '6,245 Predictions' },
  { id: '4', title: 'Prediction Accuracy', value: '92%' },
  { id: '5', title: 'Most Common Disease', value: 'Leaf Blight' },
  { id: '6', title: 'Total Users', value: '1,254 Users' },
  { id: '7', title: 'Successful Predictions', value: '98%' },
  { id: '8', title: 'Failed Predictions', value: '2%' },
  { id: '9', title: 'Last Update', value: '24th Dec 2024' },
];

const Report = () => {
  const renderReport = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports Overview</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderReport}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
    textAlign: 'center',
  },
});

export default Report;
