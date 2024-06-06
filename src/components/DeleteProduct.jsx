import React from 'react'
import { useContext,useState } from 'react'
import { ShopContext } from './Contexts/ShopContext';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function ViewProducts() {
const { shopData } = useContext(ShopContext)
  const [products, setProducts] = useState(shopData)


  function deleteProduct(e,p_id){
    e.preventDefault()
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios.delete(`http://127.0.0.1:8000/api/delete-product/${p_id}`).then(res =>{
        if(res.data.status === 200){
            toast.success(res.data.message)
            const updatedProducts = products.filter(product => product.id !== p_id);
            setProducts(updatedProducts);
        }
        else if(res.data.status === 404){
           toast.error(res.data.message)
        }
        thisClicked.innerText = "Remove";
    })
  }

    return (
        <>

                    <div className="container mb-5 py-5 ">
                        <h1 className="text-center">Products</h1>
                        <div className="producttable">
                    <Table hover className='text-center' size='lg'>
                        <thead >
                            <tr >
                                <th>N°</th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Sub Cateogry</th>   
                                <th>Price</th>
                                <th width='15%'>New Price</th>
                                <th>Rating</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        
                        <tbody className=''>
                        

                            {products.map((product,i) => {
                                
                                const imagee = product.image ?? ''; // Set imagee to an empty string if props.image is undefined
                                const upload = 'upload';
                                const imgsrc = imagee.toLowerCase().includes(upload.toLowerCase()) ? `http://127.0.0.1:8000/${imagee}`:  imagee;
                                return (
                                    
                                    <tr key={i} data-cart-id={product.id} className='align-middle'>
                                        <td>{++i}</td>
                                        <td><img src={imgsrc} alt="" style={{ width: '100%', height: '150px', objectFit: 'contain' }} /></td>
                                        <td>{product.title}</td>
                                        <td>{product.subcategory.category.cat_title}</td>
                                        <td>{product.subcategory.subcat_title}</td>
                                       
                                        <td>{product.price}da</td>
                                        <td>
                                            {product.new_price > 0 ? `${product.new_price}da` : '/'}
                                        </td>
                                        <td>{product.rating}/5</td>
                                        <td><button className='btn btn-danger' onClick={(e) => deleteProduct(e, product.id)}>Remove</button></td>
                                       

                                    </tr>
                                )
                            })}



                        
                        </tbody>
                        
                        
                        
                    </Table>
                    </div>
                       
                    </div>
                    <ToastContainer/>
                    </>
            
    )
}

export default ViewProducts