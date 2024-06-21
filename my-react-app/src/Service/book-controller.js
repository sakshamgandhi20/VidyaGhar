import { publicAxios } from "./axios-config";

const doSaveBookDetails = (obj)=>{
    return publicAxios.post("/addBook/save",obj,{headers:{'Content-Type':"multipart/form-data"}})
}

const doUpdateBookDetails = (obj)=>{
    return publicAxios.post("/addBook/updateBook",obj,{headers:{'Content-Type':"multipart/form-data"}})
}

const doShowBooks = (obj)=>{
    return publicAxios.post("/addBook/fetch",obj)
}

const doDeleteBook = (obj)=>{
    return publicAxios.post("/addBook/remove",obj)
}

const doSerachBookDetail = (uId)=>{
    return publicAxios.get("/addBook/searchBook?uId="+uId)
}
export {doSaveBookDetails,doShowBooks,doDeleteBook,doSerachBookDetail,doUpdateBookDetails}