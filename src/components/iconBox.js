import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';
import theme from '../utils/theme';
const IconBox = ({iconName}) => {
  return (
    <View style={{height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:7,backgroundColor:theme.colors.primaryOpacity}}>
    <MaterialCommunityIcons name={iconName} size={20} color={theme.colors.primary}/>

    </View>
  )
}

export default IconBox