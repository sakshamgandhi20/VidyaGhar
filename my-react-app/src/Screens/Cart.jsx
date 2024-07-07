import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doShowBookInCart } from '../Service/home-controller';
import { fetchCartList, removePrdtFromCart } from '../Store/Slice/slice';
import {useDispatch, useSelector} from 'react-redux'

function Cart() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cartlist.items)
  const cartStatus = useSelector((state)=> state.cartlist.status)
  const cartError = useSelector((state)=> state.cartlist.error)
  // console.log({cartItems})
  // const [data, setData] = useState([]);
  // const [email, setEmail] = useState({
  //   userEmail: localStorage.getItem("userEmail")
  // });
  // setData(myData);
  // async function doFetch() {
  //   console.log(email);
  //   var serverMsg = await doShowBookInCart(email);
  //   // console.log(serverMsg.data);
  //   if (serverMsg.data.status === true) {
  //     if (serverMsg.data.result) {
  //       setData(serverMsg.data.result);
  //       // const calculateTotalPrice = () => {
  //       //   const total = data.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
  //       //   setTotalPrice(total);
  //       // };
  //       // console.log(serverMsg.data);
  //     }
  //      else {
  //       alert("No record");
  //     }
  //   } else {
  //     alert(serverMsg.data.err);
  //   }
  // }
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);
  useEffect(() => {
    // doFetch()
    if(cartStatus === 'idle')
      dispatch(fetchCartList());
    // fetchCartList()
    // const calculateTotalPrice = () => {
    //   const total = data.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
    //   setTotalPrice(total);
    // };
    // calculateTotalPrice();
    // console.log(data.price)
    // console.log(totalPrice)
  }, [cartStatus, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
       {cartStatus === 'loading' && <p>Loading....</p>} 
       {cartStatus === 'failed' && <p>{cartError}</p>}
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 object-cover rounded"
                      src={`http://localhost:2005/uploadbook/${item.bookPath}`}
                      alt="product"
                    />
                    <div className="ml-4">
                      <h5 className="text-lg font-semibold">{item.bookName}</h5>
                      <p className="text-sm text-gray-700">Author: {item.authorName}</p>
                      <p className="text-sm text-gray-700">Edition: {item.edition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{item.price}</p>
                    <button
                      className="mt-2 text-red-600 hover:underline"
                    onClick={() => dispatch(removePrdtFromCart({uId:item.uId}))}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">Total Price: {totalPrice}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              // onClick={(e)=> console.log({cartItems})}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Cart;
