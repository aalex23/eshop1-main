
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import FavoritesPage from './components/Favoris';
import NavB from './components/NavB';
import Footer from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import Login from './components/LoginRegister/Login'
import Cart from './components/Cart';
import axios from 'axios';
import Register from './components/LoginRegister/Register';
import ShopContextProvider from './components/Contexts/ShopContext';
import Products from './components/Products';
import ViewMore from './components/ViewMore';
import Profile from './components/Profile';
import ProtectedRoute from './AdminPrivateRoute';
import AddProduct from './components/AddProduct';
import ViewProducts from './components/DeleteProduct';


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axios.interceptors.response.use(undefined,
  function axiosRetryInterceptor(err) {
    if (err.response.status === 403) {
      window.location.reload()
    }

    return Promise.reject(err);
  }
);


const App = () => {
  
  return (
    <ShopContextProvider>
    <Router>
      <NavB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!localStorage.getItem('auth_token')?<Login /> : <Navigate to={'/'} />} />
        <Route path="/favorites" element={localStorage.getItem('auth_token')?<FavoritesPage /> : <Navigate to={'/'} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/view-more/:id" element={<ViewMore />} />
        <Route path="/cart" element={localStorage.getItem('auth_token')?<Cart /> : <Navigate to={'/'} />} />
        <Route path="/register" element={!localStorage.getItem('auth_token')?<Register /> : <Navigate to={'/'} />} />
        <Route path="/profile" element={localStorage.getItem('auth_token')?<Profile /> : <Navigate to={'/'} />} />
        <Route path='/admin/*' element={
            <ProtectedRoute>
              <Routes>
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="delete-product" element={<ViewProducts />} />
              </Routes>
            </ProtectedRoute>
          } />
      </Routes>
      <Footer />
    </Router>
    </ShopContextProvider>
  );
};

export default App;
