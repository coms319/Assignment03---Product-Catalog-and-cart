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
              {cart.length > 0 ? (
                <>
                  {cart.map((el, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <img
                        src={el.image}
                        width={50}
                        alt={el.title}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0">{el.title}</p>
                        <p className="text-muted mb-0">
                          ${el.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(el)}
                      >
                        -
                      </Button>
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
