import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const DataUpload = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setFileName(result.name);
        Alert.alert('Success', `${result.name} has been uploaded successfully!`);
      }
    } catch (error) {
      Alert.alert('Error', 'File upload failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Upload</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload Dataset</Text>
      </TouchableOpacity>
      {fileName && (
        <Text style={styles.uploadedFile}>Uploaded File: {fileName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#0B5D51',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedFile: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
});

export default DataUpload;
