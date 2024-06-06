
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';





const FavoritesPage = ({ favorites }) => {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
    
   

    if(!localStorage.getItem('auth_token')){  
        navigate('/shop')
    }
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/wishlist').then(res => {

            if (res.data.status === 200) {
                setWishlist(res.data.wishlist);
            }
            else if (res.data.status === 401) {
                navigate('/shop')
                toast(res.data.message)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function deleteItem(e, p_id) {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";
        axios.delete(`http://127.0.0.1:8000/api/delete-wishlist-item/${p_id}`).then(res => {
            if (res.data.status === 200) {
                toast(res.data.message)
                const updatedWishlist = wishlist.filter(item => item.id !== p_id);
                setWishlist(updatedWishlist);
                
            } else if (res.data.status === 404) {
                toast(res.data.message)
            }
            thisClicked.innerText = "Remove";
        });
    }

    return (
        <>
        
          
                    <div className="container  my-5 py-5">
                    <Table hover className='text-center ' size='lg'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody >

                            {wishlist.map((Item,i) => {
                                
                                const imagee = Item.product.image ?? ''; // Set imagee to an empty string if props.image is undefined
                                const upload = 'upload';
                                const imgsrc = imagee.toLowerCase().includes(upload.toLowerCase()) ? `http://127.0.0.1:8000/${imagee}`:  imagee;
                                return (
                                    <tr key={i} data-cart-id={Item.id} className='align-middle'>
                                        <td><img src={imgsrc} alt="" style={{ width: '100%', height: '150px', objectFit: 'contain' }} /></td>
                                        <td>{Item.product.title}</td>
                                        <td><button className='btn btn-danger' onClick={(e) => deleteItem(e, Item.id)}>Remove</button></td>
                                    </tr>
                                )
                            })}




                        </tbody>
                    </Table>
                    </div>

              
            

        </>



    )
};

export default FavoritesPage;

