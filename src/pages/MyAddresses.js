import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import Header from '../component/Header'
// import MyAddressComponent from '../component/myAddresses/MyAddressComponent'
import MyAddressComponent from '../components/myAddresses/MyAddressComponent';
// import IconButton from '../component/Button/IconButton'
import IconButton from '../components/Button/IconButton';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
// import { useAuth } from '../context/AuthContext'
import axios from 'axios'
// import { BASE_URL } from '../../config'
import { useIsFocused } from '@react-navigation/native'
import { BASE_URL } from '../utils/AxiosInstance'

const MyAddresses = ({navigation}) => {
  const isFocused = useIsFocused();

  // const{userId}=useAuth()
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const getUserDetail = async () => {
  

  setLoading(true);
  if (userId) {
    await axios
      .get(`${BASE_URL}method=viewAddress&userId=${userId}`)
      .then(response => {
        console.log("response.data.response,",response.data.addressBook);
        setData(response.data.addressBook);
        setLoading(false);
      })
      .catch(error => {
        if (error.isAxiosError && !error.response) {
          // Network error
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          // Other errors
          console.error('Error adding item to cart:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false);
       
      });
  }
};
useEffect(()=>{
getUserDetail()
},[navigation,isFocused])
const handleDeleteAddress = (addressId) => {
  if (addressId) {
   
   
    const addAddressUrl = `${BASE_URL}method=deleteAddress&addressId=${addressId}`;

    axios
      .get(addAddressUrl)
      .then(async (response) => {
        console.log('Response:', response.data);
      getUserDetail()
        // Alert.alert('Success', 'Address added successfully');
      
      })
      .catch(error => {
      
        if (error.isAxiosError && !error.response) {
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          console.error('Error adding address:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
      });
  }
};
  return (
    <View style={styles.container}>
       {/* <Header
             backgroundColor= "#ffffff"

          onBackPress={() => console.log('back')}
          title="My Addresses"
          textColor="black"
        /> */}
        {data==null?<Text style={{alignSelf:"center",fontSize:responsiveFontSize(1.8)}}>Please add address</Text>:(data?.map((item)=>(

        <MyAddressComponent onPressDelete={()=>handleDeleteAddress(item.addressId)} key={item.addressId}  label="Home" address={`${item.houseNo}, ${item.streetAddress}, ${item.landmark}, ${item.pincode}`}/>
        )))}

        <View style={{ position:"absolute",bottom:10,left:0,right:0 ,paddingHorizontal:12}}>
          <IconButton
            text="Add New Address"
            backgroundColor="#c43c02ff"
            onPress={() => navigation.navigate("AddAddressForm")}
            icon={
              <Entypo
                name="plus"
                size={responsiveFontSize(2.3)}
                color="#e1e8faff"
              />
            }
          />
        </View>
    </View>
  )
}

export default MyAddresses

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor: "#ffffff",
  paddingHorizontal:12

}

})