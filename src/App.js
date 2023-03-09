import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Products from './pages/products';
import Header from './components/header';
import NotFound from './pages/not-found';

function App() {
  return (
    <BrowserRouter>
     <Header/>
    <Routes>
      <Route path='/' element={<Products/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
