import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/products';
import Header from './components/header';
import ProductDetail from './pages/product-detail';
import NotFound from './pages/not-found';
import { getBasket } from './redux/basketSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasket());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className='pt-5'>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
