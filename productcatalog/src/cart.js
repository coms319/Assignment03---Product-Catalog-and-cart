import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

const Cart = ({
  viewer,
  setViewer,
  cart,
  setCart,
  cartTotal,
  setCartTotal,
  removeFromCart,
}) => {
  return (
    <>
      {viewer === 1 && (
        <Container>
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
                      <p className="text-muted mb-0">${el.price.toFixed(2)}</p>
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
      )}
    </>
  );
};

export default Cart;
