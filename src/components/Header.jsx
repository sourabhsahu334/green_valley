import { View, Text } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import { globalStyles } from '../utils/GlobalStyles'

const Header = () => {
  return (
    <View style={{height:50,backgroundColor:theme.colors.primary,justifyContent:'center',alignItems:'center'}}>
<Text style={[globalStyles.text,{color:'white'}]}>सब्ज़ी HousE</Text>
</View>
  )
}

export default Header