import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { globalStyles } from "../utils/GlobalStyles";
import PageHeader from "../components/PageHeader";
import { responsiveWidth } from "react-native-responsive-dimensions";
import moment from "moment";


const MyOrders = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const route = useRoute();
console.log(route.name,"name");
  const [isLoading, setIsLoading] = useState(true); // add loading state
  const focus = useIsFocused();


  useEffect(() => {
    const backAction = () => {
      console.log()
      // Directly exit the app without showing any alert
      if(route?.name=="Orders"){
        navigation.navigate('Main');
      }
      else{
        navigation.navigate('Orders');

      }
      // Return true to indicate that we've handled the event
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Clean up the event listener on unmount
    return () => backHandler.remove();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true); // show activity indicator
      const { data } = await http.get("/", {
        params: {
          method: "myorder",
          userId: 1,
        },
      });
      setProducts(data?.response);
      console.log(data.response,"oo");
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // hide activity indicator
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [focus]);

  const renderProduct = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetail", { orderId: item?.orderId })
      }
    >
      <View style={styles.productContainer}>
        {/* <Text style={[globalStyles.text]}>{index})</Text> */}
        <Image
          source={{ uri: item.img }}
          style={{ height: 70, width: 60, borderRadius: 4, marginRight: 10 }}
        />
        <View style={styles.productDetails}>
        <Text style={[globalStyles.text2,{width:responsiveWidth(50)}]}>Order Id: SH{item?.orderNo}</Text>
          <Text style={styles.productText}>{item.orderDate}</Text>

        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.totalPrice}>₹{item.totalAmount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.container3]}>
      <PageHeader name={"My Orders"} navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.productId?.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text
              style={[globalStyles.text2, { textAlign: "center", marginTop: 20 }]}
            >
              No orders here
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  list: {
    paddingHorizontal: 5,
    paddingBottom: 16,
    marginTop: 10,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  productText: {
    fontSize: 16,
    color: "#333",
  },
  actionContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  totalPrice: {
    fontSize: 16,
    //fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default MyOrders;
