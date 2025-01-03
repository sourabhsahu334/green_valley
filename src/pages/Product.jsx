import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import { http } from "../utils/AxiosInstance";

const Products = () => {
  const [cartItems, setCartItems] = useState({});
  const [categories,setCategory]=useState([])
  const [categoryid,setCategoryId]=useState()
  useEffect(()=>{
  fetchcate()
  },[])
  const fetchcate= async()=>{
    try {
      const {data} = await http.get('/',{params:{method:'categoryList',userId:1}})
      console.log(data);
      setCategory(data?.response)
    } catch (error) {
      console.log(error)
    }
  }
  const [products,setProducts]=useState()

  const fethrpdoc = async()=>{
    try {
      const {data} = await http.get('/',{params:{
        method:"",categoryId:  categoryid    }})
      console.log()
      setProducts(data?.response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  fethrpdoc()
  },[categoryid])

  const handleIncrement = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.id] || 0;

    return (
      <View style={styles.productContainer}>
        <View style={styles.imageBox}></View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
          <Text style={styles.productQuantity}>{item.quantityOptions[0]}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.totalPrice}>₹{(item.price * quantity).toFixed(2)}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDecrement(item.id)}
            >
              <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleIncrement(item.id)}
            >
              <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Garg Super Market</Text>
        <TextInput style={styles.searchBar} placeholder="Search for item..." />
      </View>

      {/* Tab Bar */}
      <View style={{height:40}}>
      <ScrollView style={{height:40,paddingVertical:5}} horizontal>
       {categories?.map((ite)=>(
        <Text style={[styles.tabText,ite.categoryId==categoryid&& {...styles.activeTab},{height:30,paddingHorizontal:15}]}>{ite.categoryName}</Text>
       ))}
      </ScrollView>
      </View>

      {/* Product List */}
      <View style={{flex:1,height:"100%"}}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      </View>

      {/* Footer Navigation */}
      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Home</Text>
        <Text style={styles.footerText}>Search</Text>
        <Text style={styles.footerText}>Ordr</Text>
        <Text style={styles.footerText}>Cart</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#E53935",
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTab: {
    color: "#E53935",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#E53935",
  },
  list: {
    paddingHorizontal: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  actionContainer: {
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#E53935",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eee",
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Products;
