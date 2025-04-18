import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import theme from '../utils/theme';

export const CustomButton = ({
  text,
  marginTop,
  onPressfuntion,
  loading,
  style,
  bg,
  disabled,
  width,
  textColor,
}) => {
  return loading ? (
    <ActivityIndicator
      style={{marginTop: marginTop}}
      size={'large'}
      color={theme.colors.primary}
    />
  ) : (
    <TouchableOpacity
    disabled={disabled}
      onPress={onPressfuntion}
      style={{
        backgroundColor: bg ? bg : theme.colors.buttonBG,
        opacity: 0.9,
        width: width ? width : '100%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop,
        paddingHorizontal:17,
        ...style
      }}>
      <Text
        style={{
          fontSize: 17,
          color: textColor ? textColor : 'white',
          // fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
