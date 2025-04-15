import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AdminDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* System Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Overview</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Users</Text>
            <Text style={styles.cardValue}>1,254</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Predictions</Text>
            <Text style={styles.cardValue}>3,457</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Users</Text>
            <Text style={styles.cardValue}>236</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Prediction Accuracy</Text>
            <Text style={styles.cardValue}>92%</Text>
          </View>
        </View>
      </View>

      {/* Prediction Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prediction Statistics</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Most Common Disease</Text>
            <Text style={styles.cardValue}>Leaf Blight</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Images Processed Today</Text>
            <Text style={styles.cardValue}>129</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Successful Predictions</Text>
            <Text style={styles.cardValue}>98%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Failed Predictions</Text>
            <Text style={styles.cardValue}>2%</Text>
          </View>
        </View>
      </View>

      {/* User Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Management</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Farmers</Text>
          <Text style={styles.cardValue}>850</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pending Approvals</Text>
          <Text style={styles.cardValue}>12</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
  },
});

export default AdminDashboard;
