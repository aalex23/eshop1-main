import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";

function Searchbar() {
  return (
    <div className='searchbar mx-auto '>
        <Form className="d-flex"></Form>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
        <FaSearch />
        </Button>
      </InputGroup>



    </div>
  )
}

export default Searchbar