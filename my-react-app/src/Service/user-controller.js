import { publicAxios, privateReq } from "./axios-config";

const doSignUp = (obj) => {
  return publicAxios.post("/user/save", obj);
};

const doLogin = (obj) => {
  return publicAxios.post("/user/login", obj);
};

export { doSignUp, doLogin };
