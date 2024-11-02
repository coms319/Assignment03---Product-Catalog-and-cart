import React, { useState, useEffect } from 'react';
import Catalog from './catalog';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

function App() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [viewer, setViewer] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const someResponse = await fetch('./products.json');
      const data = await someResponse.json();
      setCatalog(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = () => {
      let totalAmount = 0;
      for (let i = 0; i < cart.length; i++) {
        totalAmount += cart[i].price;
      }
      setCartTotal(totalAmount);
    };
    total();
  }, [cart]);

  const toggleCart = () => setShowCart(!showCart);

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">My Shop</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={toggleCart}>
              <FaShoppingCart /> <span className="ms-2">{cart.length}</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={showCart} onHide={toggleCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>

      <Catalog
        viewer={viewer}
        setViewer={setViewer}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        catalog={catalog}
      />
    </div>
  );
}

export default App;
