import React from 'react';
import { doAddToCart } from '../Service/home-controller';
const Card = (obj) => {
    const { _id, ...dataWithoutId } = obj;
    const data = { ...dataWithoutId, userEmail: localStorage.getItem("userEmail") };
        async function addToCart(){
        var serverMsg = await doAddToCart(data);
        if (serverMsg.data.status === true){
            alert("saved....");
            
        }
        else
            alert(serverMsg.data.err);
    }
  return (
    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-transform transform hover:scale-105">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
        <img
          className="absolute top-0 right-0 h-full w-full object-cover"
          src={`http://localhost:2005/uploadbook/${obj.bookPath}`}
          alt="product image"
        />
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity group-hover:animate-ping group-hover:opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
          />
        </svg>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-slate-900">Book Name: {obj.bookName}</h5>
          <p className="text-sm text-slate-700">Author: {obj.authorName}</p>
          <p className="text-sm text-slate-700">Standard: {obj.standard}</p>
          <p className="text-sm text-slate-700">Edition: {obj.edition}</p>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">${obj.price}</span>
          </p>
        </div>
        <button
          type='button'
          onClick={addToCart}
        //   onClick={()=>{console.log(data)}}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
