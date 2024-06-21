import './App.css';


// import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Screens/Signup';
import Login from './Screens/Login';
import AddBook from './Screens/AddBook';
import { BrowserRouter } from 'react-router-dom';
// import Navbars from './components/Navbars';
import Navbar from './components/Navbar';



function App() {
  return (
    <>
    <div className='App'>
      <BrowserRouter>
      {/* <SignIn></SignIn> */}
      {/* <Login></Login> */}
      {/* <AddBook></AddBook> */}
      {/* <Navbars></Navbars> */}
      <Navbar></Navbar>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
