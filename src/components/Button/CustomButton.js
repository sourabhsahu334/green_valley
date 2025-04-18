import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import theme from './theme'

export const CustomButton = ({ text, marginTop, onPressfuntion, loading, bg, width, style }) => {
  return (
    loading ? <ActivityIndicator style={{ marginTop: marginTop, }} size={"large"} 
    color={theme.colors.primary} /> : <TouchableOpacity onPress={onPressfuntion}
     style={{ backgroundColor: bg ? bg : theme.colors.buttonBG, opacity: .9, width: width ? width : "100%", height: 50, borderRadius: 5, justifyContent: "center", alignItems: "center", marginTop: marginTop ,...style}}>
      <Text style={{ fontSize: 17, color: "white", //fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
  )
}

