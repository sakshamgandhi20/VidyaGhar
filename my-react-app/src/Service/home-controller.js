import { publicAxios } from "./axios-config";

const doShowAllBooks = (obj) => {
  return publicAxios.post("/addBook/showAll", obj);
};

const doAddToCart = (obj) => {
  return publicAxios.post("/cart/addToCart", obj);
};

const doShowBookInCart = (obj) => {
  return publicAxios.post("/cart/showCart", obj);
};

export { doShowAllBooks, doAddToCart, doShowBookInCart };
