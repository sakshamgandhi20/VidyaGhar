import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import { doShowAllBooks } from '../Service/home-controller';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Cart from './Cart';

function Home() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  async function doShowCards() {
    var serverMsg = await doShowAllBooks();
    if (serverMsg.data.status === true) {
      if (serverMsg.data.result) {
        setData(serverMsg.data.result);
      } else {
        alert("No record");
      }
    } else {
      alert(serverMsg.data.err);
    }
  }

  useEffect(() => {
    doShowCards();
  }, []);



  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    // Handle checkout process
    alert('Proceeding to checkout');
  };

  return (
    <>
      <Carousel></Carousel>
      <div className="grid grid-cols-4 gap-4">
        {data.slice(0, 13).map((prodt, index) => (
          <Card key={index} {...prodt} />
        ))}
      </div>
      {/* <Cart cartItems={cartItems} removeFromCart={removeFromCart} proceedToCheckout={proceedToCheckout} /> */}
      <Footer />
    </>
  );
}

export default Home;
