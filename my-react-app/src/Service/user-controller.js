import { publicAxios, privateReq } from "./axios-config";

const doSignUp = (obj) => {
  return publicAxios.post("/user/save", obj);
};

const doLogin = (obj) => {
  return publicAxios.post("/user/login", obj);
};

const doForgotPassword = (item) => {
  return publicAxios.get("/user/forgotPassword?email="+item)
}

const doResetPassword = (obj) =>{
  return privateReq.post("/user/resetPassword",obj)
}

export { doSignUp, doLogin, doForgotPassword, doResetPassword };
