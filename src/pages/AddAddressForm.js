import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'axios';
// import { BASE_URL } from '../../config';
// import { useAuth } from '../context/AuthContext';
import AddressInput from '../component/input/AddressInput';
import IconButton from '../components/Button/IconButton';
// import IconButton from '../component/Button/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
// import Header from '../component/Header';
import { BASE_URL } from '../utils/AxiosInstance';


const AddAddressForm = () => {
  const [name, setName] = useState('');
  const [Mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { userId } = useAuth();
  const navigation=useNavigation();

  const handleAddAddress = () => {
    if (userId) {
      if (pincode.length !== 6) {
        Alert.alert('Invalid Pincode', 'Pincode must be 6 digits long');
        return;
      }
      if(name==""&&Mobile==""){
        return Alert.alert("Please Input name and mobile Number")
      }
      setIsLoading(true);
      const addAddressUrl = `${BASE_URL}method=addAddress&name=${name}&mobile=${Mobile}&userId=${userId}&houseNo=${houseNo}&streetAddress=${streetAddress}&landmark=${landmark}&pincode=${pincode}`;

      axios
        .get(addAddressUrl)
        .then(async (response) => {
          console.log('Response:', response.data);
          setIsLoading(false);
          // Alert.alert('Success', 'Address added successfully');
          navigation.navigate("MyAddresses")
          // Handle response according to your requirement
        })
        .catch(error => {
          setIsLoading(false);
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
    <KeyboardAvoidingView
      style={{ flex: 1 ,backgroundColor: "#ffffff",padding:10}}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        {/* <Header
          backgroundColor="#ffffffff"
          onBackPress={() => navigation.goBack()}
          title="Address"
        /> */}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingHorizontal: 12, marginTop: 20,  }}>

          <AddressInput
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <AddressInput
            placeholder="Enter your Mobile number"
            value={Mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
            maxLength={10}
          />
          <AddressInput
            placeholder="Enter your house number"
            value={houseNo}
            onChangeText={setHouseNo}
            keyboardType="numeric"
          />
          <AddressInput
            placeholder="Enter your street address"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
          <AddressInput
            placeholder="Enter your landmark"
            value={landmark}
            onChangeText={setLandmark}
          />
          <AddressInput
            placeholder="Enter your pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
           <View style={{ marginTop:15 }}>
        <IconButton
          text="Save Address"
          backgroundColor="#c43c02ff"
          onPress={handleAddAddress}
          icon={
            <AntDesign
              name="save"
              size={responsiveFontSize(2.3)}
              color="#e1e8faff"
            />
          }
          isLoading={isLoading}
        />
      </View>
        </View>
        
      </ScrollView>

     

    </KeyboardAvoidingView>
  );
};

export default AddAddressForm;
