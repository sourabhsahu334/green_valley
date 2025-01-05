import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
const Button = ({ onPress, text, textColor, bgColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: bgColor?bgColor:"#c43c02ff" }]}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: responsiveHeight(1),
    justifyContent:"center",
    marginTop: responsiveHeight(1),
    height:responsiveHeight(5)
  },
  buttonText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
    fontFamily:"Poppins-Medium"
  },
});

export default Button;
