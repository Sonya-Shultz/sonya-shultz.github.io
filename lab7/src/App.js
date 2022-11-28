import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Choose from './pages/Choose';
import FirstPart from './pages/FirstPart';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import SecPart from './pages/SecPart';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Choose />} >
        <Route index element={<Home />} />
        <Route path="task1" element={<FirstPart />} />
        <Route path="task2" element={<SecPart />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
