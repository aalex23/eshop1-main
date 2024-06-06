import React, { useState } from 'react';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LoginPage() {

  const navigate = useNavigate();
  
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  

  function handleChange(e) {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    })
  }

  function loginUser(e) {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
          axios
            .post(`http://127.0.0.1:8000/api/login`, data)
            .then((res) => {
              if(res.data.status === 200)
              {
                localStorage.setItem('auth_token', res.data.token)
                localStorage.setItem('auth_name', res.data.username)
                localStorage.setItem('role',res.data.role)
                navigate('/');
                toast.success(res.data.message);
                
                  navigate('/')

                window.location.reload();
              }
              else if(res.data.status === 401)
              { 
                
                toast.error(res.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
              else
              {
                setLoginInput({
                  ...loginInput,
                  error_list: res.data.validation_errors, 
                });
              }
          })
    })
  }
  
  return (
    <Container className="py-5 my-5">
      <h2 className="text-center my-5">Se connecter</h2>
      <Row className="justify-content-center w-100">
      <Col xs={12} md={6} lg={4}>
      <Form onSubmit={loginUser}>
        <Form.Group controlId="formBasicEmail" className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control  placeholder="Enter votre Email" name='email'  value={loginInput.email} onChange={handleChange}/>
          <span className="errorspan">{loginInput.error_list.email}</span> 
        </Form.Group>
        

        <Form.Group controlId="formBasicPassword" className='my-3'>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={loginInput.password} onChange={handleChange}/>
          <span className="errorspan">
            {loginInput.error_list.password}
          </span>
        </Form.Group>
        
        
        <Button variant="primary" type="submit" >
          Se connecter
        </Button>
        <p className="text-center">Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
      
      </Form>
      </Col>
      </Row>
      
      <ToastContainer/>
      </Container>
     
     
  );
}

export default LoginPage;


