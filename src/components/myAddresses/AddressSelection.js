import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { BASE_URL } from '../../../config';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const AddressSelection = ({navigation,setAddressId}) => {
    const isFocused=useIsFocused()
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const{userId}=useAuth()
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
//   const addresses = [
//     { id: 1, name: 'Shivam', phone: '+9189768965', address: '6/3, Mp nagar zone-1, Bhopal Mp, 462011' },
//     { id: 2, name: 'Shivam', phone: '+9189768965', address: '6/3, Mp nagar zone-1, Bhopal Mp, 462011' },
//     { id: 3, name: 'Shivam', phone: '+9189768965', address: '6/3, Mp nagar zone-1, Bhopal Mp, 462011' },
//     // Add more addresses as needed
//   ];


  const handleAddressSelect = (id) => {
    setSelectedAddressId(id === selectedAddressId ? null : id);
    // console.log('Selected address:', data.find(address => address.addressId === id));
    const ids=data.find(address => address.addressId === id)
    setAddressId(ids.addressId)
  };

  return (
    <View>
      <Text style={styles.heading}>Address Detail :</Text>
      {data?.map((address) => (
        <TouchableOpacity
          key={address.addressId}
          style={styles.addressContainer}
          onPress={() => handleAddressSelect(address.addressId)}>
          <Octicons
            name={selectedAddressId === address.addressId ? 'dot-fill' : 'dot'}
            size={responsiveFontSize(3)}
            color={selectedAddressId === address.addressId ? '#cf8059ff' : 'grey'}
          />
          <View style={styles.detail}>
            <Text style={styles.addressText}>{address.name}</Text>
            <Text style={styles.addressText}>{address.mobile}</Text>
            <Text style={styles.addressText}>{`${address.houseNo}, ${address.streetAddress}, ${address.landmark}, ${address.pincode}`}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addressContainer}>
        <AntDesign
          name="plus"
          size={responsiveFontSize(2.4)}
          color="#cf8059ff"
        />
        <TouchableOpacity onPress={()=>navigation.navigate("AddAddressForm")} style={styles.detail}>
          <Text
            style={{
              flex: 1,
              fontSize: responsiveFontSize(1.8),
              marginLeft: responsiveWidth(4),
              fontFamily: 'Poppins-Medium',
              fontWeight: '400',
              color: '#cf8059ff',
            }}>
            {data==null?"Please add address":"Add Another Address"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default AddressSelection;

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detail: {},
  heading: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#37474F',
  },
  addressText: {
    fontSize: responsiveFontSize(1.4),
    marginLeft: responsiveWidth(4),
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    color: '#37474F',
  },
});
