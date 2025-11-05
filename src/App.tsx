import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductList } from './pages/ProductList/ProductList';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';
import { CreateProduct } from './pages/CreateProduct/CreateProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
