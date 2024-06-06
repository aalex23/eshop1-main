import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {

  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
    promo: false,
    price: 0,
    newPrice: 0,
    rating: 0,
    subcatId: null
  })
  const [promo, setPromo] = useState(false)
  const [subcat, setSubcat] = useState([])
  const [picture, setPicture] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchallcategories()
  }, [])

  function fetchallcategories() {
    axios.get("http://127.0.0.1:8000/api/subcategories").then(res=>{
    if(res.data.status === 200){
      setSubcat(res.data.subcategories)
    }
  })
  }
 

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductInfo(prevProductInfo => {
      return (
        {
          ...prevProductInfo,
          [name]: value
        }
      )
    })
  };

  function handlechecked() {
    setPromo(prevPromo => !prevPromo)
  }

  const handleImageChange = (e) => {
    setPicture({ image: e.target.files[0] });
  };
 
  function addProduct(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('productName', productInfo.productName);
    formData.append('productDescription', productInfo.productDescription);
    formData.append('image', picture.image);
    formData.append('price', productInfo.price);
    formData.append('newPrice', productInfo.newPrice);
    formData.append('rating', productInfo.rating);
    formData.append('subcatId', productInfo.subcatId);

    let axiosConfig = {
      headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
      }
  };

    axios.post('http://127.0.0.1:8000/api/products/create',formData,axiosConfig).then(res=>{
        if(res.data.status === 200){
            toast.success(res.data.message)
          setErrors([])
        }
        else{
          
            toast.error(res.data.message)
          setErrors(res.data.errors)
        }
    })

    

  }

  return (
    <div className='container mb-5 py-5 '>
      <h1 className="text-center">Add Product</h1>
      <Form>
        <form action="" encType='multipart/form-data'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="ex yamaha c-40,.." name='productName' value={productInfo.productName} onChange={handleChange} />
          </Form.Group>
          <span className='errorspan'>{errors.productName}</span>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product description</Form.Label>
              <Form.Control as="textarea" type="text" placeholder="ex Blue guitare small size..." name='productDescription' value={productInfo.productDescription} onChange={handleChange} />
          </Form.Group>
          <span className='errorspan'>{errors.productDescription}</span>


          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" name='image' onChange={handleImageChange} />
          </Form.Group>
          <span className='errorspan'>{errors.image}</span>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='promo'
              className='mb-3'
              name='promo'
              onChange={handlechecked}
            />
            <Form.Label>Promotion?</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>price</Form.Label>
            <Form.Control type="number" name='price' value={productInfo.price} onChange={handleChange} />
          </Form.Group>
          <span className='errorspan'>{errors.price}</span>
          <Form.Group className="mb-3">
            <Form.Label>new price</Form.Label>
            <Form.Control type="number" name='newPrice' value={productInfo.newPrice} onChange={handleChange} disabled={promo ? false : true} />
          </Form.Group>
          <span className='errorspan'>{errors.newPrice}</span>

          <Form.Select aria-label="Default select example" className='mb-3' name='subcatId' value={productInfo.subcatId} onChange={handleChange}>
            <option value={0}>Subcategories</option>
            {subcat.map(subcategory => {
              return (
                <option value={subcategory.id} key={subcategory.id}>{subcategory.subcat_title}</option>
              )
            })}
          </Form.Select>
          <span className='errorspan'>{errors.subcatId}</span>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" name='rating' value={productInfo.rating} onChange={handleChange} min={0} max={5}/>
          </Form.Group>
          <span className='errorspan'>{errors.rating}</span>
         


          <Button className='mb-3' onClick={addProduct}>Submit form</Button>
        </form>
      </Form>
      <ToastContainer/>

    </div>
  )
}

export default AddProduct