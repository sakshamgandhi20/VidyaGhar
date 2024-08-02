import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCartList, removePrdtFromCart } from '../Store/Slice/slice';
import {useDispatch, useSelector} from 'react-redux'
import { doCheckOut } from '../Service/cart-controller';

function Cart() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cartlist.items)
  const cartStatus = useSelector((state)=> state.cartlist.status)
  const cartError = useSelector((state)=> state.cartlist.error)
  
  const [totalPrice, setTotalPrice] = useState(0);

  async function doCheckOutCart(){
    var serverMsg = await doCheckOut({totalPrice: totalPrice});
    if(serverMsg.data.status){
      alert(serverMsg.data.msg);
      navigate('/')
    }
    else{
      alert(serverMsg.data.err);
    }
  }

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);
  useEffect(() => {
    
    if(cartStatus === 'idle')
      dispatch(fetchCartList());
    
  }, [cartStatus, dispatch]);

  return (
    <div className="container mx-auto p-4 ">
      <div className='flex flex-row items-center justify-between mb-4'>
      <h1 className="text-2xl font-bold ml-auto">Shopping Cart</h1>
      <button
              type="button"
              onClick={() => navigate('/orderhistory')}
              className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               Order History
            </button>
      </div>
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
                    <div className="ml-4 text-left">
                      <h5 className="text-lg font-semibold">{item.bookName}</h5>
                      <p className="text-sm text-gray-700">Author: {item.authorName}</p>
                      <p className="text-sm text-gray-700">Category: {item.category}</p>
                      <p className="text-sm text-gray-700">Edition: {item.edition}</p>
                      <p className="text-sm text-gray-700">Seller Email: {item.sellerEmail}</p>
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
              onClick={()=>doCheckOutCart()}
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
