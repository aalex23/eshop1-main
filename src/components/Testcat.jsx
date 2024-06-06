import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Gallery() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Categorie</h2>
      <Row className="justify-content-center">
        <Col md={3} className="mb-4">
          <Card as={Link} to="/products" className="border-0 shadow-sm">
            <Card.Img variant="top" src="/photos/LD0005842621_1.jpg" />
            <Card.Body>
              <Card.Title className="text-center">Carte Graphique</Card.Title>
              <Card.Text className="text-muted text-center">Voir les cartes graphique</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card as={Link} to="/products" className="border-0 shadow-sm">
            <Card.Img variant="top" src="/photos/h732.png" />
            <Card.Body>
              <Card.Title className="text-center">Ordinateurs</Card.Title>
              <Card.Text className="text-muted text-center">Voir les ordinateurs</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card as={Link} to="/products" className="border-0 shadow-sm">
            <Card.Img variant="top" src="/photos/amd-ryzen-5-3400G-001-1.jpg" />
            <Card.Body>
              <Card.Title className="text-center">Processeurs</Card.Title>
              <Card.Text className="text-muted text-center">Voir les processeurs</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Gallery;

