import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import AddBook from '../Screens/AddBook';
import SignIn from '../Screens/Signup';
import ManageBooks from '../Screens/ManageBooks';
import About from '../Screens/about';
import Profile from '../Screens/Profile';
import Contactpage from '../Screens/contactpage';
import Cart from '../Screens/Cart';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in on component mount
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  };

  const navItems = [
    { id: 1, text: 'Home', link: '/' },
    { id: 2, text: 'Profile', link: '/profile' },
    { id: 3, text: 'SellBook', link: '/managebook' },
    { id: 4, text: 'Wishlist', link: '/wishlist' },
    { id: 5, text: 'Cart', link: '/cart' },
    { id: 6, text: 'About', link: '/about' },
    { id: 7, text: 'Contactpage', link: '/contactpage' },
    { id: 8, text: 'Logout', link: '/logout', onClick: handleLogout },
    { id: 9, text: 'Login', link: '/login' },
    { id: 10, text: 'SignUp', link: '/signin' },
  ];

  const filteredNavItems = isLoggedIn
    ? navItems.filter(item => item.id <= 8)
    : navItems.filter(item => (item.id >= 9 || item.id === 1));

  return (
    <>
      <div className='flex justify-between items-center h-24 mx-auto px-4 text-black' style={{ backgroundColor: '#D8CAB4' }}>
        <img src="./assests/logo.png" className='h-32 w-auto' alt='Logo'/>
        <ul className='hidden md:flex'>
          {filteredNavItems.map(item => (
            <li key={item.id}>
              {item.onClick ? (
                <span
                  onClick={item.onClick}
                  className='p-4 hover:bg-[#000000] rounded-xl m-2 cursor-pointer duration-300 hover:text-white'
                >
                  {item.text}
                </span>
              ) : (
                <a
                  href={item.link}
                  className='p-4 hover:bg-[#000000] rounded-xl m-2 cursor-pointer duration-300 hover:text-white'
                >
                  {item.text}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#D8CAB4] ease-in-out duration-500'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* <h1 className='w-full text-3xl font-bold text-[#00df9a] text-left m-4'>REACT.</h1> */}
          <img src="./assests/logo.png" className='h-32 w-auto' alt='Logo'/>
          {filteredNavItems.map(item => (
            <li
              key={item.id}
              className='p-4 border-b rounded-xl hover:bg-[#000000] duration-300 hover:text-white cursor-pointer border-gray-600'
            >
              {item.onClick ? (
                <span onClick={item.onClick}>{item.text}</span>
              ) : (
                <a href={item.link}>{item.text}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/managebook" element={<ManageBooks />} />
        <Route path="/addbooks/:uId" element={<AddBook />} />
        <Route path="/addbooks" element={<AddBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactpage" element={<Contactpage />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signin" element={<SignIn onSignUp={() => setIsLoggedIn(true)} />} />
      </Routes>
    </>
  );
};

export default Navbar;
