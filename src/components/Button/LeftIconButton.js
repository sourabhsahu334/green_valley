import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const LeftIconButton = ({ icon, text, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.icon}>
          {icon}
        </View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5384edff',
    paddingVertical: responsiveWidth(1),
    paddingHorizontal: responsiveWidth(3.7),
    borderRadius:5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#e1e8faff',
    fontSize: responsiveFontSize(1.4),
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily:"Poppins-Medium"
  },
  icon: {
    marginLeft: responsiveWidth(1),
  }
});

export default LeftIconButton;
