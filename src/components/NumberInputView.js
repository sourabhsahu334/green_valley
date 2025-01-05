import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NumberInputView = ({ onChangeText, value, onPress }) => {

  const handleInputChange = (text) => {
    // Validate input to allow only 10 digits
    if (/^\d{0,10}$/.test(text)) {
      onChangeText(text);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="phone-outline" size={responsiveWidth(5)} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Number"
          onChangeText={handleInputChange}
          value={value}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f1f2ff',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingVertical: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    marginRight: 40,
  },
});

export default NumberInputView;
