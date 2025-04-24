import React, { useEffect, useState, } from "react";
import {
  View,
  BackHandler,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import CustomModal from "../components/CustomModal";
import { CustomButton } from "../components/CustomButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from "../utils/GlobalStyles";
import { showToast } from "../components/Toast";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import moment from "moment";

const OrderDetail = ({navigation}) => {
  const route = useRoute();
  const { orderId } = route.params; // Order ID passed through route
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [modal3,setModal3]=useState(false)
  const [rating, setRating] = useState(0);

  const [loading, setLoading] = useState(true);
  const [feedback,setFeedback]=useState();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home', { screen: 'Orders' });
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove();
  }, []);


  const cancelOrder = async () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const { data } = await http.post(
                `https://radicalone.co.in/sabjihouse/activity.php?method=orderCancel&orderId=${orderId}`
              );
              console.log("Order Canceled:", data);
              showToast('Successfully canceled')
              fetchOrderDetails()
            } catch (error) {
              console.error("Error canceling order:", error);
            }
          },
        },
      ]
    );
  };

  const sendrating= async()=>{
    try {
      const {data} = await http.get("/",{params:{
        method:'orderRating',rating:4,orderId:orderId,feedback:rating
      }})
      setModal3(false)
      showToast('Successfully submit')
      console.log(data)
    } catch (error) {
      console.log(error)    
    }
   }
  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      const { data } = await http.get("/greenvalley/activity.php", {
        params: {
          method: "myorderDetail",
          orderId,
        },
      });
      if (data?.response) {
        setOrderDetails(data);
        console.log(data,"llll")
        setTotalAmount(data.total);
        // Set the order date (you can replace this with a date from the API if available)
        setOrderDate(new Date().toLocaleDateString("en-GB")); // Format: DD/MM/YYYY
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{uri:item.img}} style={{height:60,width:60,borderRadius:5}}/>
     <View style={{marginLeft:10}}>

     <Text style={styles.productName}>{item.productId}</Text>
      <Text style={styles.productDetail}>
        Quantity: {item.size}
      </Text>
      <Text style={styles.productTotal}>₹{item.total}</Text>
     </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  const handleStarPress = (index) => {
    setRating(index + 1); // Stars are 1-indexed
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Details</Text>
       
      
      <FlatList
        data={orderDetails?.response}
        renderItem={renderProduct}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
       <View>
          {orderDetails.status=="placed"&&<View>
          {orderDetails.status=="Cancel"?
            <CustomButton disabled={true}  onPressfuntion={cancelOrder} text={'Order Canceled'} style={{backgroundColor:'red',width:responsiveWidth(90),height:responsiveHeight(4.5),marginLeft:20,marginVertical:15,opacity:.6}}/>:
<CustomButton onPressfuntion={cancelOrder} text={'Cancel Order'} style={{backgroundColor:'red',width:responsiveWidth(90),height:responsiveHeight(4.5),marginLeft:20,marginVertical:15,opacity:.8}}/>}
          </View>}
          <CustomButton onPressfuntion={()=>setModal3(true)} text={'Give Feedback'} textColor={'black'} style={{marginLeft:'auto',marginRight:'auto',width:responsiveWidth(90),margin:5,backgroundColor:'white',borderWidth:1}}/>

        </View>
        }
        ListHeaderComponent={      
          <View>
            <View style={[globalStyles.box,{flexDirection:'column',alignItems:'flex-start',width:responsiveWidth(94),marginLeft:10}]}>
            <Text style={[globalStyles.text,{marginBottom:15}]}>Order No: {orderDetails?.orderNo}</Text>
            <Text style={styles.orderDate}>Order Date: {orderDate}</Text>
            <Text style={styles.orderDate}>Status : {orderDetails?.status.charAt(0).toUpperCase() + orderDetails?.status.slice(1)}
            </Text>
            <Text style={[globalStyles.text2,{opacity:.6}]}>{orderDetails?.address?.split('$')[0]}</Text>

            <Text style={[globalStyles.text2,{opacity:.6}]}>{orderDetails?.address?.split('$')[1]} ,{orderDetails?.address?.split('$')[2]} ,{orderDetails?.address?.split('$')[3]}</Text>
            <Text style={[globalStyles.text2,{opacity:.6}]}>Area : {orderDetails?.address?.split('$')[4]}</Text>
            <Text style={[globalStyles.text2,{opacity:.6}]}>Landmark : {orderDetails?.address?.split('$')[5] } </Text>
            
            <Text style={[globalStyles.text2,{opacity:.6}]}>Mobile No: {orderDetails?.address?.split('$')[6]}</Text>

            </View>
          
          </View>
      }
      />
      
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total Amount: ₹{totalAmount}</Text>
      </View>
      <CustomModal height={responsiveHeight(40)} visible={modal3} setVisible={setModal3} modalContent={<View>
          <Text style={[globalStyles.text]}>Rate us:</Text>
      <View style={[globalStyles.rowflex,{width:130,marginVertical:10}]}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStarPress(index)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={index < rating ? "star" : "star-o"}
              size={30}
              color={index < rating ? "#FFD700" : "#ccc"}
              // style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[globalStyles.text2]}>You rated: {rating} / 5</Text>
                <CustomButton onPressfuntion={()=>{
            sendrating()
          }} style={{marginTop:20,backgroundColor:theme.colors.primary}}  text={'Submit'}/>
        </View>}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 20,
    //fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 8,
    textAlign: "center",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  productContainer: {
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection:'row'
  },
  productName: {
    fontSize: 16,
    //fontWeight: "bold",
    color: "#333",
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  productTotal: {
    fontSize: 14,
    //fontWeight: "bold",
    color: theme.colors.primary,
    marginTop: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    //fontWeight: "bold",
    color: theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default OrderDetail;
