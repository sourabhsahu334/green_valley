import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import axios from 'axios';
// import { BASE_URL } from '../../config';
// import { useAuth } from '../context/AuthContext';
import AddressInput from '../components/AddressInput';
import IconButton from '../components/Button/IconButton';
// import IconButton from '../component/Button/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
// import Header from '../component/Header';
import { BASE_URL, http } from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeader from '../components/PageHeader';
import theme from '../utils/theme';
import CustomDropdown from '../components/Dropdown';
import { showToast } from '../components/Toast';

const AddAddressForm = ({ setModal, getUserDetail }) => {
  const [name, setName] = useState('');
  const [Mobile, setMobile] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState();
  const [areas, setAreas] = useState([]);
  const [pincode, setPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { userId } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const getAera = async () => {
      try {
        const { data } = await http.get('/', {
          params: {
            method: 'areaList'
          }
        });
        setAreas(data?.response);
        console.log(data?.response, "///");
      } catch (error) {
        console.log(error);
      }
    }
    getAera();
  }, []);

  const handleAddAddress = async () => {
    const userId = await AsyncStorage.getItem('UserID') || 1;
    console.log('userds', userId);
    if (userId) {
      if (pincode.length !== 6) {
        Alert.alert('Invalid Pincode', 'Pincode must be 6 digits long');
        return;
      }
      if (!area) {
        return showToast('Please select area');
      }
      if (name === "" && Mobile === "") {
        return Alert.alert("Please Input name and mobile Number");
      }
      setIsLoading(true);
      const addAddressUrl = `${BASE_URL}method=AddAddress&name=${name}&area=${area?.value}&mobile=${Mobile}&userId=${userId}&houseNo=${houseNo}&address=${streetAddress}&landmark=${landmark}&pincode=${pincode}`;

      axios
        .get(addAddressUrl)
        .then(async (response) => {
          console.log('Response:', response.data);
          setIsLoading(false);
          Alert.alert('Success', 'Address added successfully');
          // navigation.navigate("Cart")
          setModal(false);
          getUserDetail();
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
      style={{ flex: 1, backgroundColor: "#ffffff", padding: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 30}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
        <CustomDropdown 
            placeholderText={"Select Your Area"} 
            dropdownStyles={{ marginTop: 20, marginBottom: 0 }} 
            value={area} 
            setValue={setArea} 
            data={areas ? areas.map((te) => { return { label: te?.area, value: te?.area } }) : []} 
          />
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
            // keyboardType="numeric"
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
          {/* <AddressInput
            placeholder="Enter your Area"
            value={landmark}
            onChangeText={setLandmark}
          /> */}
          
          <AddressInput
            placeholder="Enter your pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
          <View style={{ marginTop: 15 }}>
            <IconButton
              text="Save Address"
              backgroundColor={theme.colors.primary}
              onPress={handleAddAddress}
              icon={
                <AntDesign
                  name="save"
                  size={responsiveFontSize(2.3)}
                  color='white'
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
