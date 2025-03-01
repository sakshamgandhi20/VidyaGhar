import './App.css';

import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';



function App() {
  return (
    <>
    <div className='App'>
      <BrowserRouter>
      <Main></Main>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
