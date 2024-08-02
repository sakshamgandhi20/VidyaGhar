import { publicAxios,privateReq } from "./axios-config";

const doShowAllBooks = (obj) => {
  return publicAxios.post("/addBook/showAll", obj);
};

const doAddToCart = (obj) => {
    return privateReq.post("/cart/addToCart", obj);
  };

export {doShowAllBooks, doAddToCart}