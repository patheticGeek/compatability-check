import axios from "axios";
import cookie from "react-cookies";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

axiosClient.interceptors.request.use((config) => {
  console.log(
    `Request sent to ${config.method} ${config.url} with data ${config.data}`
  );

  const token = cookie.load("token");
  config.headers["authorization"] = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use((config) => {
  console.log(
    `Response from ${config.method} ${config.url} with status ${config.status} and data ${config.data}`
  );

  return config;
});

export default axiosClient;
