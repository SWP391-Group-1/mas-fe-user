import { defaultInstance, loadToken } from ".";

const login = (email, password) => {
  return defaultInstance.post("accounts/login-admin", {
    email: email,
    password: password,
  });
};

export const authAPis = {
  login,
};
