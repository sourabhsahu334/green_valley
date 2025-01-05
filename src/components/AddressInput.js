import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const AddressInput = ({placeholder,value,onChangeText,keyboardType,maxLength}) => {
  return (
    <View style={{backgroundColor:"#f0f1f2ff",borderRadius:7,marginTop:15,}}>

        <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        // placeholderTextColor="white"
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={{fontSize:responsiveFontSize(1.9),paddingLeft:10}}
      />
    </View>
  )
  }
export default AddressInput

