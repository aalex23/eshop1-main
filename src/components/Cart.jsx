import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { ShopContext } from './Contexts/ShopContext';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const { fetchCartN } = useContext(ShopContext)
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  var totalCartPrice = 0
 

  if(!localStorage.getItem('auth_token')){
      navigate('/products')
  }
  

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/cart').then(res => {

          if (res.data.status === 200) {
              setCart(res.data.cart);
              

          }
          else if (res.data.status === 401) {
              navigate('/shop')
              toast(res.data.message)
          }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleIncrement(cart_id) {
      setCart(cart => {
          const itemIndex = cart.findIndex(item => item.id === cart_id);
          if (itemIndex !== -1) {
              const updatedItem = { ...cart[itemIndex], quantity: cart[itemIndex].quantity + 1 };
              const updatedCart = [...cart.slice(0, itemIndex), updatedItem, ...cart.slice(itemIndex + 1)];
              return updatedCart;
          }
          return cart;

      })
      updateQuantity(cart_id, 'inc')
  }

  function handleDecrement(cart_id) {
      setCart(cart => {
          const itemIndex = cart.findIndex(item => item.id === cart_id);
          if (itemIndex !== -1) {
              const updatedItem = { ...cart[itemIndex], quantity: Math.max(1, cart[itemIndex].quantity - 1) };
              const updatedCart = [...cart.slice(0, itemIndex), updatedItem, ...cart.slice(itemIndex + 1)];
              
              return updatedCart;
          }
          return cart;

      })
      updateQuantity(cart_id, 'dec')
  }

  function updateQuantity(cart_id, scope) {
      axios.put(`http://127.0.0.1:8000/api/cart-update-qt/${cart_id}/${scope}`).then(res => {
          if (res.data.status === 200) {
              toast(res.data.message);
          }
          else if(res.data.status === 400){
              toast(res.data.message);
          }
      })
  }

  function deleteItem(e, cart_id) {
      e.preventDefault();
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Removing";
      axios.delete(`http://127.0.0.1:8000/api/delete-cart-item/${cart_id}`).then(res => {
          if (res.data.status === 200) {
              toast(res.data.message)
              fetchCartN();
              // Remove the item from the cart
              const updatedCart = cart.filter(item => item.id !== cart_id);
              setCart(updatedCart);
              // Recalculate the total
              let newTotal = 0;
              updatedCart.forEach(item => {
                  newTotal += item.product.price * item.quantity;
              });
              totalCartPrice = newTotal; // Update the total variable
          } else if (res.data.status === 404) {
            toast(res.data.message)
          }
          thisClicked.innerText = "Remove";
      });
  }

  function checkOut(){
      navigate('/')
      fetchCartN();
  }

  return (
      <>
      
                  <div className="container my-5 py-5">
                  <Table hover className='text-center ' size='lg'>
                      <thead >
                          <tr >
                              <th>Image</th>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                              <th>Remove</th>
                          </tr>
                      </thead>
                      <tbody >

                          {cart.map((Item,i) => {
                              Item.product.new_price > 0 ? totalCartPrice += Item.product.new_price * Item.quantity : totalCartPrice += Item.product.price * Item.quantity
                              const imagee = Item.product.image ?? ''; // Set imagee to an empty string if props.image is undefined
                              const upload = 'upload';
                              const imgsrc = imagee.toLowerCase().includes(upload.toLowerCase()) ? `http://127.0.0.1:8000/${imagee}`:  imagee;
                              return (
                                  <tr key={i} data-cart-id={Item.id} className='align-middle'>
                                      <td><img src={imgsrc} alt="" style={{ width: '100%', height: '150px', objectFit: 'contain' }} /></td>
                                      <td>{Item.product.title}</td>
                                      <td width='15%'>
                                          <div className="input-group">
                                              <button type='button' className='input-group-text' onClick={() => handleDecrement(Item.id)}>-</button>
                                              <div className='form-control text-center' >{Item.quantity}</div>
                                              <button type='button' className='input-group-text' onClick={() => handleIncrement(Item.id)}>+</button>
                                          </div>
                                      </td>
                                      <td>{Item.product.new_price > 0 ? Item.product.new_price : Item.product.price}da</td>
                                      <td>
                                          {Item.product.new_price > 0 ?  Item.product.new_price * Item.quantity : Item.product.price * Item.quantity}da

                                      </td>
                                      <td><button className='btn btn-danger'  onClick={(e) => deleteItem(e, Item.id)}>Remove</button></td>

                                  </tr>
                              )
                          })}




                      </tbody>
                      
                  </Table>
                  
                      <div className="row ">
                      <div className="col-md-8"></div>
                      <div className="col-md-4">
                          <div className="card card-body mt-3">
                              <h4>Total: <span className='float-end'>{totalCartPrice}da</span></h4>
                              <hr/>
                              <button onClick={checkOut} className='btn btn-primary'>Checkout</button>
                          </div>
                      </div>
                  </div>
                  </div>

                  <ToastContainer 
                  autoClose={1000}
                  hideProgressBar={true}
                  />



                  </>
          
  )
}

export default Cart

