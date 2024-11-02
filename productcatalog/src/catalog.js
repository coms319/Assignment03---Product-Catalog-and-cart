import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

const Catalog = ({ viewer, setViewer, addToCart, removeFromCart, catalog }) => {
  return (
    <>
      {viewer === 0 && (
        <Container className="mt-4">
          <Row>
            {catalog.map((el) => (
              <Col key={el.id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={el.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {el.category}
                    </Card.Subtitle>
                    <Card.Text>${el.price.toFixed(2)}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(el)}
                      >
                        -
                      </Button>
                      <Button variant="primary" onClick={() => addToCart(el)}>
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Catalog;
