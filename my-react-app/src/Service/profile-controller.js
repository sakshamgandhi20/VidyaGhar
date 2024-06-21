import { publicAxios,privateReq } from "./axios-config";

const doSaveUserProfile = (obj)=>{
    return publicAxios.post("/profile/save",obj)
}

const doUpdateeUserProfile = (obj)=>{
    return publicAxios.post("/profile/update",obj)
}

const doSearchUserProfile = (item)=>{
    return privateReq.get("/profile/find?email="+item)
}

export {doSaveUserProfile,doSearchUserProfile,doUpdateeUserProfile}