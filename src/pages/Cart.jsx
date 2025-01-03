import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [comments, setComments] = useState("");

  const products = [
    {
      id: "1",
      name: "Bhindi",
      weight: "500Gm",
      quantity: 2,
      price: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Aloo",
      weight: "500Gm",
      quantity: 1,
      price: 40,
      image: "https://via.placeholder.com/50",
    },
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          {item.name}, {item.weight}
        </Text>
        <Text style={styles.productQuantity}>qty: {item.quantity}</Text>
        <Text style={styles.productPrice}>Rs. {item.price}/-</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />

      {/* Comments Section */}
      <TextInput
        style={styles.input}
        placeholder="Write any comments or instructions"
        value={comments}
        onChangeText={setComments}
      />

      {/* Delivery Time */}
      <Text style={styles.sectionHeader}>Delivery Time</Text>
      <Text style={styles.deliveryTime}>Tomorrow 4 PM - 6 PM</Text>

      {/* Payment Options */}
      <Text style={styles.sectionHeader}>Choose Payment Option</Text>
      <RadioButton.Group
        onValueChange={(value) => setPaymentMethod(value)}
        value={paymentMethod}
      >
        <View style={styles.radioItem}>
          <RadioButton value="UPI" />
          <Text>UPI (GPay/ PhonePay)</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="COD" />
          <Text>Cash On Delivery</Text>
        </View>
      </RadioButton.Group>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productList: {
    marginBottom: 10,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productQuantity: {
    fontSize: 14,
    color: "#777",
  },
  productPrice: {
    fontSize: 14,
    color: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  deliveryTime: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Cart;
