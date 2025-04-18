import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const prodUrl = `https://radicalone.co.in/sabjihouse/activity.php`
export const BASE_URL ='https://radicalone.co.in/sabjihouse/activity.php?'
export const http = axios.create({
  baseURL: prodUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 30000,
});

http.interceptors.request.use(
  async (config) => {
    // Construct the complete URL with query parameters
    const data = await AsyncStorage.getItem('UserID');
    config.params = {
      ...config.params,
      // locale: lang||"en",
      // sort: 'updatedAt:desc'
      userId:data
    };

    const url = new URL(config.baseURL + config.url);
    if (config.params) {
      Object.keys(config.params).forEach(key =>
        url.searchParams.append(key, config.params[key])
      );
    }

    // Print the complete URL
    console.log("Complete URL:", url.toString());

    return config;
  },
  (error) => {
    console.error("Error in request:", error);
    return Promise.reject(error);
  }
);
