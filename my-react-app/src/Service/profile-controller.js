import { publicAxios, privateReq } from "./axios-config";

const doSaveUserProfile = (obj) => {
  return publicAxios.post("/profile/save", obj);
};

const doUpdateeUserProfile = (obj) => {
  return publicAxios.post("/profile/update", obj);
};

const doSearchUserProfile = () => {
  return privateReq.get("/profile/find");
};

export { doSaveUserProfile, doSearchUserProfile, doUpdateeUserProfile };
