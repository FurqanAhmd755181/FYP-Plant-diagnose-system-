// src/navigation/AdminDrawer.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import Admin Screens
import Dashboard from '../Screens/Dashboard';
import UserManagement from '../Screens/UserManagement';
import DataUpload from '../Screens/Upload';
import ModelMonitoring from '../Screens/ModelMonitoring';
import Reports from '../Screens/Report';

// Import a custom drawer content component if needed
// import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#0B5D51',
        drawerInactiveTintColor: '#aaa',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        drawerLabelStyle: {
          marginLeft: -16,
          fontSize: 16,
        },
      }}
      // content={(props) => <CustomDrawerContent {...props} />} // Use custom drawer if needed
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="User Management"
        component={UserManagement}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Data Upload"
        component={DataUpload}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cloud-upload-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Model Monitoring"
        component={ModelMonitoring}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
