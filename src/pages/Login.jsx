import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import { http } from "../utils/AxiosInstance";
import theme from "../utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../utils/GlobalStyles";

const Login = ({ navigation }) => {
  const [screen, setScreen] = useState("login"); // login, otp, register
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const otpRefs = useRef([]); // References for OTP input bo

  useEffect(() => {
    const backAction = () => {
      if (screen === "otp" || screen === "register") {
        setScreen("login");
        setMobileNumber("");
        setOtp("");
        setName("");
        setEmail("");
        return true;
      } else {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [screen]);

  const handleNext = async () => {
    try {
      const { data } = await http.get("/", {
        params: {
          method: "login",
          mobile: mobileNumber,
        },
      });
      console.log(data)
      if (data?.response?.status === 1) {
        alert(data?.response?.otp)
        setScreen("otp");
      } else if (data?.response.status === 2) {
        setScreen("register");
      } else {
        Alert.alert("Error", "Invalid response from the server.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to communicate with the server.");
    }
  };

  const handleRegister = async () => {
    try {
      const { data } = await http.get("/",{params: {
        method:'register',
        name,
        email,
        mobile: mobileNumber,
      }});
      console.log(data,"datx")
      if (data?.response?.status==1) {
        Alert.alert("Success", "Registration successful. Proceed to login.");
        setScreen("otp");
      } 
      // else {
      //   Alert.alert("Error", data.message || "Registration failed.");
      // }
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Failed to communicate with the server.");
    }
  };
  const handleOtpChange = (value, index) => {
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Move to the next input if value is entered
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (nativeEvent, index) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  
  const handleVerify = async () => {
    try {
      const { data } = await http.get("/",{params: {
        method:'otpVerify',
        // name,
        // email,
        otp,
        mobile: mobileNumber,
      }});
      console.log(data,"datx")
      if (data?.response?.status==1) {
        // Alert.alert("Success", "Registration successful. Proceed to login.");
        // setScreen("otp");
        AsyncStorage.setItem('UserID',data?.response?.userId)
        navigation.navigate('Home')
      } 
      // else {
      //   Alert.alert("Error", data.message || "Registration failed.");
      // }
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Failed to communicate with the server.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>सब्ज़ी HousE</Text>
      </View>

      {screen === "login" && (
        <View style={styles.content}>
           <Image
        // animation="bounceIn"
        // duration={5000}
        source={require('../../assets/icon.jpeg')}
        style={{width: 200, height: 200, resizeMode: 'contain',borderRadius:200,marginBottom:30,marginTop:30}}
      />
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile No."
            placeholderTextColor={"rgba(0,0,0,.6)"}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}

{screen === "otp" && (
  <View style={styles.content}>
    <Text style={styles.verifyText}>VERIFY MOBILE NUMBER</Text>
    <Text style={styles.otpDescription}>
      OTP has been sent to your mobile number, please enter it
    </Text>
    <View style={styles.otpContainer}>
      {[...Array(4)].map((_, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          ref={(el) => (otpRefs.current[index] = el)} // Store refs dynamically
          maxLength={1}
          keyboardType="numeric"
          value={otp[index] || ""}
          onChangeText={(value) => handleOtpChange(value, index)}
          onKeyPress={({ nativeEvent }) => handleOtpBackspace(nativeEvent, index)}
        />
      ))}
    </View>
    <Text style={[globalStyles.text2,{marginVertical:10}]}>Didn't receive OTP?</Text>
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.smallButton} onPress={() => handleNext()}>
        <Text style={styles.buttonText}>RESEND</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallButton} onPress={() => handleVerify()}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


      {screen === "register" && (
        <View style={styles.content}>
          <Text style={styles.verifyText}>REGISTER</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor={"rgba(0,0,0,.6)"}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor={"rgba(0,0,0,.6)"}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile No."
            placeholderTextColor={"rgba(0,0,0,.6)"}
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as before...
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor:theme.colors.primary,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 28,
    //fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    //fontWeight: "bold",
  },
  verifyText: {
    fontSize: 20,
    //fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  smallButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Login;
