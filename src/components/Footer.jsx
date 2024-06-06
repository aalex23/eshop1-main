import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Eshop</h5>
           
          </Col>
          <Col md={4}>
            <h5>Navigation</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="/about" className="text-white">À propos</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
              <Nav.Link href="/admin" className="text-white">Se connecter</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Suivez-nous</h5>
            <div className="d-flex">
              <Nav.Link href="https://www.facebook.com" className="text-white p-2">
                <FaFacebook size="2em" />
              </Nav.Link>
              <Nav.Link href="https://www.twitter.com" className="text-white p-2">
                <FaTwitter size="2em" />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com" className="text-white p-2">
                <FaInstagram size="2em" />
              </Nav.Link>
              <Nav.Link href="https://www.linkedin.com" className="text-white p-2">
                <FaLinkedin size="2em" />
              </Nav.Link>
            </div>
          </Col>
        </Row>
        <Row className="pt-3 border-top border-secondary">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Eshop. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
