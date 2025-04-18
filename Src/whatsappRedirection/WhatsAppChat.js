import {Linking, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const WhatsAppChat = () => {
  const phoneNumber = '+923216426123'; // Replace with the phone number you want to open the chat with

  const openWhatsAppChat = () => {
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.warn('WhatsApp is not installed on your device');
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openWhatsAppChat}>
        <View>
          <Text>Open WhatsApp Chat</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WhatsAppChat;
