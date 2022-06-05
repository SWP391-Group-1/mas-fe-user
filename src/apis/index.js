import axios from "axios";
import { API_URL } from "../constants/apisConstants";

const defaultInstance = axios.create({
  baseURL: API_URL,
});

export const loadToken = () => {
  const token = localStorage.getItem("JWT_TOKEN");
  defaultInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export { defaultInstance };
