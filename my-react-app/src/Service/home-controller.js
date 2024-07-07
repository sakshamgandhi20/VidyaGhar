import { publicAxios,privateReq } from "./axios-config";

const doShowAllBooks = (obj) => {
  return publicAxios.post("/addBook/showAll", obj);
};

const doAddToCart = (obj) => {
  return privateReq.post("/cart/addToCart", obj);
};

const doShowBookInCart = () => {
  return privateReq.post("/cart/showCart");
};

const doRemovePrdt = (obj) => {
  return privateReq.post('/cart/removePrdt', obj)
}

export { doShowAllBooks, doAddToCart, doShowBookInCart, doRemovePrdt };
