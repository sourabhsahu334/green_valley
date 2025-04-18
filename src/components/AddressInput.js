import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const AddressInput = ({ placeholder, value, onChangeText, keyboardType, maxLength }) => {
  return (
    <View style={{ backgroundColor: "#f0f1f2ff", borderRadius: 7, marginTop: 15 }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.6)"
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={true} // Enable multiline text input so it wraps text
        style={{
          fontSize: responsiveFontSize(1.9),
          paddingLeft: 10,
          paddingVertical: 10,
          textAlignVertical: 'top' // Ensures text starts at the top (especially on Android)
        }}
      />
    </View>
  );
};

export default AddressInput;
