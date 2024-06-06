import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartN, setCartN] = useState([])


  const fetchCartN = () =>{
    axios.get('http://127.0.0.1:8000/api/cart').then(res =>{
    setCartN(res.data.cart)})}

  useEffect(() => {
      fetchCartN();
  }, []);


  const cartNumber = localStorage.getItem('auth_token')? cartN.length : 0;


  function fetchProducts(){
    axios.get('http://127.0.0.1:8000/api/products').then(res =>{
    setShopData(res.data);
    setTimeout(() => {
      setLoading(false);
    }, "1000")
  })
  }
  

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <ShopContext.Provider value={{ shopData, loading, setShopData, cartNumber , fetchCartN, fetchProducts}}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

