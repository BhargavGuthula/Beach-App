import React, { useState } from 'react';
require('dotenv').config()
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function Beachbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: "system",
                content: "You are assisting bhargav, greet him everytime. You will be provided with questions related to beach geolocations and your task is to give a small informative text, longitude and latitude. Give me google map location. Only give things related to beach else say you are not sure about the information."
              },
              {
                role: "user",
                content: input
              }
            ],
          }),
        });

        const data = await response.json();
        const botMessageContent = data.choices[0].message.content;

        // Extract coordinates if available
        const latLonRegex = /latitude:\s*(-?\d+.\d+).*longitude:\s*(-?\d+.\d+)/i;
        const match = botMessageContent.match(latLonRegex);
        if (match) {
          const latitude = parseFloat(match[1]);
          const longitude = parseFloat(match[2]);

          // Navigate to map screen with coordinates
          navigation.navigate('BeachMap', { latitude, longitude });
        }

        const botMessage = { text: botMessageContent, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
      }

      setInput('');
    }
  };

  const renderMessage = (message, index) => {
    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.text.split(urlRegex);

    return (
      <View key={index} style={styles[message.sender]}>
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <Text
              key={i}
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL(part)}
            >
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust as needed
    >
      <ScrollView style={styles.messagesContainer}>
        {messages.map(renderMessage)}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  messagesContainer: {
    flex: 1,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default Beachbot;
