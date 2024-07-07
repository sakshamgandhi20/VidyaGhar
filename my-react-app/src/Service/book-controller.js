import { publicAxios, privateReq } from "./axios-config";

const doSaveBookDetails = (obj) => {
  return privateReq.post("/addBook/save", obj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const doUpdateBookDetails = (obj) => {
  return publicAxios.post("/addBook/updateBook", obj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const doShowBooks = () => {
  return privateReq.get("/addBook/fetch");
};

const doDeleteBook = (obj) => {
  return publicAxios.post("/addBook/remove", obj);
};

const doSerachBookDetail = (uId) => {
  return publicAxios.get("/addBook/searchBook?uId=" + uId);
};
export {
  doSaveBookDetails,
  doShowBooks,
  doDeleteBook,
  doSerachBookDetail,
  doUpdateBookDetails,
};
