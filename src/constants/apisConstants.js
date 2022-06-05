const JWT_TOKEN = "JWT_TOKEN";
const API_SUCCESS = 200;
const API_BAD_REQUEST = 400;
const API_URL = "https://mas-api.azurewebsites.net/api/mas/v1/";

export let JWT_TOKEN_VALUE = "";

export const getJWToken = () => {
  return (JWT_TOKEN_VALUE = localStorage.getItem(JWT_TOKEN));
};

export { JWT_TOKEN, API_SUCCESS, API_BAD_REQUEST, API_URL };
