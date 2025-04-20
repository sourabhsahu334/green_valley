import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { http } from '../utils/AxiosInstance'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { globalStyles } from '../utils/GlobalStyles'
import { useIsFocused } from '@react-navigation/native'

const Category = ({navigation}) => {
    const [data,setData]=useState()
    const [categories,setCategory]=useState([])
    const [loading,setLoading]=useState(false)
    const fetch = async()=>{
        try {
            setLoading(true)
            const {data} = await http.get('/',{params:{method:'categoryList',}})
            console.log(data,"cate");
            setCategory(data?.response)
           } catch (error) {
            console.log(error)
        }
        finally{setLoading(false)}
    }
    useEffect(()=>{
    fetch()
    },[])
    const focus = useIsFocused()
    useEffect(() => {
      const backAction = () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true; // prevent default behavior
        }
        return false; // allow default back behavior
      };
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    
      return () => backHandler.remove();
    }, [navigation,focus]);
    
  return (
    <View style={{flex:1,backgroundColor:'white',width:'100%'}}>
        <Header/>
        {loading?<ActivityIndicator color={'black'} size={'large'}/>:<FlatList data={categories} contentContainerStyle={{gap:10,rowGap:5,columnGap:5,paddingVertical:10}} numColumns={2} renderItem={({item})=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Products',{id:item?.categoryId})} style={{backgroundColor:'white',elevation:3,justifyContent:'center',alignItems:'center',padding:20,width:responsiveWidth(47),marginLeft:10}}>
             <Image source={{uri:item?.image}} style={{height:70,width:70}}/>
             <Text style={[globalStyles.text,{textAlign:'center',marginTop:10}]}>{item?.categoryName}</Text>
            </TouchableOpacity>
        )}/>}
    </View>
  )
}

export default Category