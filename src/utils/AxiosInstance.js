import axios from "axios";

const prodUrl = `https://sellpe.in/greenvalley/activity.php`;
export const BASE_URL ='https://www.radicalone.co.in/kestrel/activity.php?';
export const http = axios.create({
  baseURL: prodUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 3000,
});

http.interceptors.request.use(
  async (config) => {
    // Construct the complete URL with query parameters
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
