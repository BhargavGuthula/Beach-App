import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


const beaches = [
  { 
    id: '1', 
    name: 'Marina Beach', 
    city: 'Chennai', 
    image: 'https://www.google.com/imgres?q=marina%20beach&imgurl=https%3A%2F%2Fchennaitourism.travel%2Fimages%2Fplaces-to-visit%2Fheaders%2Fmarina-beach-chennai-tourism-entry-fee-timings-holidays-reviews-header.jpg&imgrefurl=https%3A%2F%2Fchennaitourism.travel%2Fmarina-beach-chennai&docid=nPzpl2ShYiBy6M&tbnid=wG4wV8EoRZB1gM&vet=12ahUKEwjA7rT3n6qIAxVDRmcHHW4rI_IQM3oECGUQAA..i&w=1280&h=640&hcb=2&ved=2ahUKEwjA7rT3n6qIAxVDRmcHHW4rI_IQM3oECGUQAA'},
  { 
    id: '2', 
    name: 'Juhu Beach', 
    city: 'Mumbai', 
    // image: 'https://example.com/juhu.jpg' 
    image: './src/Images/Juhu_Beach.jpg' 
  },
  { 
    id: '3', 
    name: 'Calangute Beach', 
    city: 'Goa', 
    image: './a' 
  },
  { 
    id: '4', 
    name: 'Kovalam Beach', 
    city: 'Kerala', 
    image: 'https://example.com/kovalam.jpg' 
  },
  { 
    id: '5', 
    name: 'Anjuna Beach', 
    city: 'Goa', 
    image: 'https://example.com/anjuna.jpg' 
  },
  { 
    id: '6', 
    name: 'Palolem Beach', 
    city: 'Goa', 
    image: 'https://exa mple.com/palolem.jpg' 
  },
  { 
    id: '7', 
    name: 'Varkala Beach', 
    city: 'Kerala', 
    image: 'https://example.com/varkala.jpg' 
  },
  { 
    id: '8', 
    name: 'Radhanagar Beach', 
    city: 'Andaman and Nicobar Islands', 
    image: 'https://example.com/radhanagar.jpg' 
  },
  { 
    id: '9', 
    name: 'Gokarna Beach', 
    city: 'Karnataka', 
    image: 'https://example.com/gokarna.jpg' 
  },
  { 
    id: '10', 
    name: 'Baga Beach', 
    city: 'Goa', 
    image: 'https://example.com/baga.jpg' 
  },
  { 
    id: '11', 
    name: 'Alleppey Beach', 
    city: 'Kerala', 
    image: 'https://example.com/alleppey.jpg' 
  },
  { 
    id: '12', 
    name: 'Elephant Beach', 
    city: 'Andaman and Nicobar Islands', 
    image: 'https://example.com/elephant.jpg' 
  },
  { 
    id: '13', 
    name: 'Paradise Beach', 
    city: 'Pondicherry', 
    image: 'https://example.com/paradise.jpg' 
  },
  { 
    id: '14', 
    name: 'Dhanushkodi Beach', 
    city: 'Tamil Nadu', 
    image: 'https://example.com/dhanushkodi.jpg' 
  },
  { 
    id: '15', 
    name: 'Varca Beach', 
    city: 'Goa', 
    image: 'https://example.com/varca.jpg' 
  }
];


const HomeScreen = ({ navigation }) => {
  const renderBeachItem = ({ item }) => (
    <TouchableOpacity style={styles.beachContainer} onPress={() => navigation.navigate('beachDetails', { beach: item })}>
      <Image source={{ uri: item.image }} style={styles.beachImage} />
      <View style={styles.textContainer}>
        <Text style={styles.beachName}>{item.name}</Text>
        <Text style={styles.beachCity}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={beaches}
        renderItem={renderBeachItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  list: {
    paddingBottom: 20,
  },
  beachContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  beachImage: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  beachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  beachCity: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
