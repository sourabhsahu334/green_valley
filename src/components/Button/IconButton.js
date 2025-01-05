import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const IconButton = ({ icon, text, onPress, backgroundColor, width, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width }, disabled && styles.disabled]}
      onPress={!disabled ? onPress : null}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>{text}</Text>
        <View style={styles.icon}>
          {icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5384edff',
    paddingVertical: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(3.7),
    borderRadius: 10,
    minWidth: 100, // Default minimum width
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#e1e8faff',
    fontSize: responsiveFontSize(2),
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: "Poppins-Medium"
  },
  icon: {
    marginLeft: responsiveWidth(2),
  },
  disabled: {
    opacity: 0.5, // Adjust opacity for disabled state
  },
  disabledText: {
    color: '#a5b1c2', // Adjust text color for disabled state
  },
});

export default IconButton;
