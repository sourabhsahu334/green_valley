import { View, Text, TextInput } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../utils/GlobalStyles';

const SearchBox = ({search,setSearch,iconName,width}) => {
  return (
    <View style={[globalStyles.rowflex, globalStyles.searchBox,{width:width}]}>
    <MaterialIcons name="search" color="#9B9B9B" size={20} style= {{opacity:.8}} />
    <TextInput
      style={{width: "90%",color:"black"}}
      editable={false}
      placeholder="Search"
      value={search}
      onChangeText={(e)=>setSearch(e)}
      placeholderTextColor={'#9B9B9B'}
    />

  </View>
  )
}

export default SearchBox