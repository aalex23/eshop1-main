import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import axios from 'axios';
import { ShopContext } from './Contexts/ShopContext';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavB = () => {

  const { cartNumber } = useContext(ShopContext)
  const navigate = useNavigate()

  function logout(e){
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/logout`).then(res =>{
      if(res.data.status === 200){
        navigate('/')
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        window.location.reload();
      }
    })
  }

  return (
    <div className='container-fluid p-0'>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/" className="ms-3">
            <img
              src={`${process.env.PUBLIC_URL}/photos/logo1.png`}
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
     
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/products" className="mx-2">Products</Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-2">About Us</Nav.Link>
            </Nav>
      
            <Nav className="ml-auto d-flex align-items-center">
              
              <Button variant="outline-danger" as={Link} to={localStorage.getItem('auth_token')? "/favorites": "/login"} className="d-flex align-items-center mx-2">
                <MdFavoriteBorder size={20} />
              </Button>
              <Button variant="outline-light" as={Link} to={localStorage.getItem('auth_token')? "/profile":"/login"} className="d-flex align-items-center mx-2">
                <FaUser size={20} />
              </Button>
              <Button variant="outline-light" as={Link} to={localStorage.getItem('auth_token')? "/cart": "/login"} className="d-flex align-items-center mx-2">
                <FaShoppingCart size={20} />
                {cartNumber > 0 && (
                  <Badge bg="secondary" className="ms-2">
                    {cartNumber}
                  </Badge>
                )}
              </Button>
              
              {localStorage.getItem('auth_token') &&
              <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
                {localStorage.getItem('role') === "admin" &&
                  <>
                      <Nav.Link as={Link} to="/admin/add-product"  className="mx-2">Add product</Nav.Link>
                      <Nav.Link as={Link} to="/admin/delete-product"  className="mx-2">Delete Products</Nav.Link>
                      <NavDropdown.Divider />
                  </>
                }
              <Nav.Link onClick={logout}  className="mx-2">Logout</Nav.Link>
            </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavB;
