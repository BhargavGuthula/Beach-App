import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: '1', title: 'All Beaches', screen: 'AllBeaches' },
    { id: '2', title: 'About the App', screen: 'AboutApp' },
    { id: '3', title: 'Customize App', screen: 'Info' },
    { id: '4', title: 'Settings', screen: 'Info' },
    { id: '5', title: 'Personal Info', screen: 'Info' },
    { id: '6', title: 'Privacy Policy', screen: 'PrivacyPolicy' },
    { id: '7', title: 'Logout', screen: 'Info' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.menuItem, theme === 'dark' && styles.darkMenuItem]} 
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={[styles.menuText, theme === 'dark' && styles.darkMenuText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      {/* Profile Circle */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual profile image URI
          style={styles.profileImage}
        />
      </View>

      {/* Toggle Theme Button */}
      <TouchableOpacity 
        style={[styles.toggleButton, theme === 'dark' && styles.darkToggleButton]}
        onPress={toggleTheme}
      >
        <Text style={[styles.toggleButtonText, theme === 'dark' && styles.darkToggleButtonText]}>
          Toggle Theme
        </Text>
      </TouchableOpacity>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  menuContainer: {
    flexGrow: 1,
  },
  menuItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkMenuItem: {
    backgroundColor: '#333',
    borderBottomColor: '#444',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  darkMenuText: {
    color: '#fff',
  },
  toggleButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  darkToggleButton: {
    backgroundColor: '#0056b3',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  darkToggleButtonText: {
    color: '#ddd',
  }
});

export default SettingsScreen;
