import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const users = [
  { id: '1', name: 'John Doe', role: 'Farmer', status: 'Pending' },
  { id: '2', name: 'Jane Smith', role: 'Researcher', status: 'Active' },
  { id: '3', name: 'David Brown', role: 'Farmer', status: 'Active' },
  { id: '4', name: 'Emily White', role: 'Farmer', status: 'Pending' },
];

const UserManagement = () => {
  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userDetailsContainer}>
        <Ionicons
          name={item.status === 'Active' ? 'checkmark-circle-outline' : 'time-outline'}
          size={24}
          color={item.status === 'Active' ? '#0B5D51' : '#FFA500'}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userDetails}>Role: {item.role}</Text>
          <Text style={styles.userDetails}>Status: {item.status}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        {item.status === 'Pending' && (
          <TouchableOpacity style={styles.approveButton}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  approveButton: {
    backgroundColor: '#0B5D51',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UserManagement;
