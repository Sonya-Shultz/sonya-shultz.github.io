import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LogIn';
import {AdminPanel} from './pages/AdminPanel';
import Data from './pages/Data';
import Register from './pages/Register';
import NoPage from './pages/NoPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Data/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/admin' element={<AdminPanel/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='*' element={<NoPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
