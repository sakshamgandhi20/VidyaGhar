import { publicAxios,privateReq } from "./axios-config";

const doShowBookInCart = () => {
  return privateReq.post("/cart/showCart");
};

const doRemovePrdt = (obj) => {
  return privateReq.post('/cart/removePrdt', obj)
}

const doCheckOut = (obj) => {
  return privateReq.post('/cart/checkCart', obj)
}

export { doShowBookInCart, doRemovePrdt, doCheckOut };
