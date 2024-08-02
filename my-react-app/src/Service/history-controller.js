import { publicAxios,privateReq } from "./axios-config";

const doFetchOrdderHistory = () => {
    return privateReq.get("/history/fetchHistory");
  };

  export {doFetchOrdderHistory};