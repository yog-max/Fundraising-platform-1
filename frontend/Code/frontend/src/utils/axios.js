// axios.js
import Axios from "axios";

// Create an Axios instance with the base URL and withCredentials
const axios = Axios.create({
  baseURL: "http://localhost:5500/api", // Replace with your base URL
  timeout: 10000, // You can set a timeout
  headers: {
    "Content-Type": "application/json", // Default headers if needed
  },
  withCredentials: true, // Include credentials such as cookies in the requests
});

export default axios;
