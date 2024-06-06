import React, { useContext } from 'react'
import { ShopContext } from './Contexts/ShopContext'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { MdFavorite,  MdShoppingCart } from 'react-icons/md';

function ViewMore() {
    const { shopData,fetchCartN } = useContext(ShopContext)
    const [products, setProducts] = React.useState(shopData)
    const {id} = useParams()
    const navigate = useNavigate()
    const productDetails = products?.find((p) => p.id === Number(id))


    function addToCart(){
        const data = {
          product_id: id,
          product_qty: 1,
        }
        axios.post('http://127.0.0.1:8000/api/add-to-cart',data).then(res=>{
          if(res.data.status === 201){
            toast(res.data.message,{
                type: 'success',
                autoClose: 2000

            })
            
            fetchCartN()
          }
          else if(res.data.status === 409){
            toast(res.data.message,{
                type: 'error',
            })     
              fetchCartN()
          }
          else if(res.data.status === 401){
            toast(res.data.message,{
                type: 'error',
            })
            navigate('/login')
          }
          else if(res.data.status === 404){
            toast(res.data.message,{
                type: 'error',
            })
          }
        })
      }
        
      function addToWishList(){
        const data = {
          product_id: id,
          }
          axios.post('http://127.0.0.1:8000/api/whishlist/add',data).then(res=>{
            if(res.data.status === 200){
                toast(res.data.message,{
                    type: 'success',
                    autoClose: 2000})
             
            }
            else if(res.data.status === 409){
                toast(res.data.message,{
                    type: 'error',
                })
              
            }
            else if(res.data.status === 401){
                
                toast(res.data.message,{
                    type: 'error',
                    })
                }
            else if(res.data.status === 404){
                toast(res.data.message,{
                    type: 'error',
                    })
            }
    
          })
        }



  return (
    <div className="container">
        <div className="row my-5">
            <div className="col-md-6" >
                <img src={productDetails.image} className='vmimg mx-5' />
            </div>
            <div className="col-md-6 d-flex flex-column gap-5">
                <div className='d-flex flex-column gap-3'>
                  <h1>
                      {productDetails.title}
                  </h1>
                  <h3>{productDetails.price}da</h3>
                  zid product information hna 
                </div>
                <div className='d-flex flex-column gap-3 py-5'>
                  <Button variant="success" onClick={addToCart}>
                    <MdShoppingCart /> Ajouter au panier
                  </Button>
                  <Button variant="outline-danger" onClick={addToWishList}>
                    <MdFavorite /> Ajouter aux favoris
                  </Button>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ViewMore