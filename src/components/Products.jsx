import React, { useContext } from 'react'
import { ShopContext } from './Contexts/ShopContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { MdFavorite,  MdShoppingCart } from 'react-icons/md';
import Searchbar from './Searchbar';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';


function Products() {
    const { shopData,fetchCartN } = useContext(ShopContext)
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = React.useState(shopData)
    const navigate = useNavigate()

    function addToCart(productId){
        const data = {
          product_id: productId,
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
        
      function addToWishList(productId){
        const data = {
          product_id: productId,
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
    <Container className="mt-5">
        <Searchbar />
      <Row>
        
        {products.map(product => (
          <Col key={product.id} md={6} lg={4} xl={3} className='mb-2'>
            <Card className="h-100 d-flex flex-column card-hover ">
              <Card.Img variant="top" src={product.image} alt={product.title} className='productImage' />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text className="text-truncate">descreption</Card.Text>
                <Button variant="primary" as={Link} to={`/view-more/${product.id}`} className="mt-auto">
                  Voir les détails
                </Button>
                <Button variant="success" className="mt-2"  onClick={() => addToCart(product.id)}>
                  <MdShoppingCart /> Ajouter au panier
                </Button>
                <Button variant="outline-danger" className="mt-2" onClick={() => addToWishList(product.id)}>
                  <MdFavorite /> Ajouter aux favoris
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer/>
    </Container>
  )
}

export default Products