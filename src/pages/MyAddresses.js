import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyAddressComponent from '../components/myAddresses/MyAddressComponent'
import IconButton from '../components/Button/IconButton'
import Entypo from 'react-native-vector-icons/Entypo'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import axios from 'axios'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { BASE_URL, http } from '../utils/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import { CustomButton } from '../components/CustomButton'
import CustomModal from '../components/CustomModal'
import AddAddressForm from './AddAddressForm'

const MyAddresses = ({ address, setAddress, onPress, onClose }) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [addmodal, setmodal] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getUserDetail = async () => {
    try {
      setLoading(true)
      const userId = await AsyncStorage.getItem('UserID');
      
      const {data} = await http.get(`/`,{params:{
        method:"viewAddress",userId:userId
      }})
      console.log(data,"obbbb",userId,"o")
      setLoading(false)
      setData(data?.response)
    } catch (error) {
      setLoading(false)
      console.log(error,"onnn")
    }
  }

  useEffect(() => {
    getUserDetail()
  }, [navigation, isFocused])

  const handleDeleteAddress = (addressId) => {
    if (addressId) {
      const addAddressUrl = `${BASE_URL}method=deleteAddress&addressId=${addressId}`

      axios
        .get(addAddressUrl)
        .then(async (response) => {
          console.log('Response:', response.data)
          getUserDetail()
        })
        .catch(error => {
          if (error.isAxiosError && !error.response) {
            Alert.alert('Network Error', 'Please check your internet connection.')
          } else {
            console.error('Error adding address:', error)
            Alert.alert('Error', 'Something went wrong. Please try again later.')
          }
        })
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setAddress(item?.addressId)}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <View style={[globalStyles.circle, { backgroundColor: address == item?.addressId ? 'black' : 'white' }]} />
      <MyAddressComponent
        onPressDelete={async () => { await handleDeleteAddress(item.addressId); getUserDetail() }}
        label={item.name+", "+item.mobile}
        address={`${item.houseNo}, ${item.address}, ${item.landmark}`}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      

      <FlatList
      style={{flexGrow:1}}
      ListHeaderComponent={
        <CustomButton
        text="Add New Address"
        style={{ marginTop: 10, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }}
        textColor="black"
        backgroundColor={theme.colors.primary}
        onPressfuntion={() => { setmodal(true) }}
      />
      }
      contentContainerStyle={{flexGrow:1,paddingBottom:100,marginTop:10}}
        data={data}
        keyExtractor={(item) => item.addressId.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(1.8) }}>
            Please add address
          </Text>
        }
      />

      <CustomModal
      type={'bottom'}
        height={responsiveHeight(100)}
        name={'Add New Address'}
        visible={addmodal}
        setVisible={setmodal}
        modalContent={<AddAddressForm setModal={setmodal} getUserDetail={getUserDetail} />}
      />

      <View style={{ position: "absolute", bottom: 10, left: 0, right: 0, paddingHorizontal: 12 }}>
      
        <IconButton
          text="Next"
          textColor="black"
          backgroundColor={theme.colors.primary}
          onPress={() => onPress()}
          icon={
            <Entypo
              name="forward"
              size={responsiveFontSize(2.3)}
              color="black"
            />
          }
        />
      </View>
    </View>
  )
}

export default MyAddresses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12
  }
})
