import React from 'react';
import { Navbar, Nav, Button, Container, Row } from 'react-bootstrap';
import {
  IoChevronBackCircleSharp,
  IoChevronForwardCircleSharp,
} from 'react-icons/io5';

const Cart = ({
  viewer,
  setViewer,
  cart,
  setCart,
  cartTotal,
  setCartTotal,
  addToCart,
  removeFromCart,
}) => {
  const handleBackwardsClick = () => {
    setViewer(0);
  };

  const handleForwardClick = () => {
    setViewer(2);
  };

  return (
    <>
      {viewer === 1 && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Nav className="me-auto">
                <Button variant="outline-light" onClick={handleBackwardsClick}>
                  <IoChevronBackCircleSharp /> Return
                </Button>
              </Nav>
              <Nav className="ms-auto">
                <Button variant="outline-light" onClick={handleForwardClick}>
                  <IoChevronForwardCircleSharp /> Summary
                </Button>
              </Nav>
            </Container>
          </Navbar>
          <Container className="py-4">
            <Row>
              {Object.keys(cart).length > 0 ? (
                <>
                  {Object.values(cart).map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3"
                    >
                      <img
                        src={item.image}
                        width={50}
                        alt={item.title}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0">{item.title}</p>
                        <p className="text-muted mb-0">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-muted mb-0">Quantity: {quantity}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="danger"
                          className="mx-1"
                          onClick={() => removeFromCart(item)}
                        >
                          -
                        </Button>
                        <Button
                          variant="primary"
                          className="mx-1"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <h5>Total: ${cartTotal.toFixed(2)}</h5>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;
