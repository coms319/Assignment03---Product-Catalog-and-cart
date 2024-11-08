import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Catalog = ({
  viewer,
  setViewer,
  cart,
  cartTotal,
  quantity,
  addToCart,
  removeFromCart,
  catalog,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleForwardClick = () => {
    setViewer(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredCatalog = catalog.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      {viewer === 0 && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Nav className="ms-auto">
                <Button variant="outline-light" onClick={handleForwardClick}>
                  <FaShoppingCart /> <span className="ms-2">{quantity}</span>
                </Button>
              </Nav>
            </Container>
          </Navbar>
          <Container className="mt-4">
            <Form>
              <Form.Group className="mb-3" controlId="searchBar">
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
              <Button variant="secondary" onClick={clearSearch} className="mb-4">
                Clear Search
              </Button>
            </Form>
            <Row>
              {filteredCatalog.map((el) => {
                const cartItem = cart[el.id];
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
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
                        <div className="d-flex justify-content-between align-items-center">
                          <Button
                            variant="danger"
                            onClick={() => removeFromCart(el)}
                          >
                            -
                          </Button>
                          <span>{quantity}</span>
                          <Button
                            variant="primary"
                            onClick={() => addToCart(el)}
                          >
                            +
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Catalog;
