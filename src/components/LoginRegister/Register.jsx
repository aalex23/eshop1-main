import React, { useState } from 'react';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list:[]
  })

  function handleChange(e){
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value
    })
  }

  function registerUser(e){
    e.preventDefault()
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password
    }
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
      axios.post('http://127.0.0.1:8000/api/register', data).then(res =>{
        if(res && res.data && res.data.status === 200){
            toast.success(res.data.message)
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          navigate('/')
          window.location.reload();
        }
        else{
            toast.error("Something went wrong")
          const errorList = res && res.data ? res.data.validation_errors : 'Unknown error';
          setRegisterInput({...registerInput, error_list: errorList })
        }
      }).catch(error => {
        console.error('Registration Error:', error);
      });
    }).catch(error => {
        console.error('CSRF Cookie Error:', error);
    });
}

  return (
    <Container className="py-5 my-5">
        <h2 className="text-center my-5">Creer un compte</h2>
        <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
        <Form onSubmit={registerUser}>
        <Form.Group controlId="formBasicEmail"  className='my-3'>
            <Form.Label>Nom</Form.Label>
            <Form.Control  placeholder="Enter votre nom" name='name' value={registerInput.name}  onChange={handleChange}/>
            <span className="errorspan">{registerInput.name}</span>
        </Form.Group>
       

        <Form.Group controlId="formBasicEmail"  className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control  placeholder="Enter votre Email" name='email'  value={registerInput.email} onChange={handleChange}/>
            <span className="errorspan">{registerInput.error_list.email}</span>
        </Form.Group>
        

        <Form.Group controlId="formBasicPassword"  className='my-3'>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' value={registerInput.password} onChange={handleChange}/>
            <span className="errorspan">{registerInput.error_list.password}</span>
        </Form.Group>
       
        
        <Button variant="primary" type="submit">
            S'inscrire
        </Button>

        <p>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
        
        </Form>
        </Col>
        </Row>
        
        <ToastContainer/>
    </Container>
  )
}

export default Register