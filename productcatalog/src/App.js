import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from './cart';
import Catalog from './catalog';
import Summary from './summary';

function App() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
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

  const handleIndexClick = () => {
    setViewer(0);
  };

  const handleCartClick = () => {
    setViewer(1);
  };

  const handleSummaryClick = () => {
    setViewer(2);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand role="button" onClick={handleIndexClick}>
            My Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="outline-light" onClick={handleCartClick}>
              <FaShoppingCart /> <span className="ms-2">{cart.length}</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Catalog
        viewer={viewer}
        setViewer={setViewer}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        catalog={catalog}
      />

      <Cart
        viewer={viewer}
        setViewer={setViewer}
        cart={cart}
        setCart={setCart}
        cartTotal={cartTotal}
        setCartTotal={setCartTotal}
        removeFromCart={removeFromCart}
      />

      <Summary viewer={viewer} setViewer={setViewer} />
    </div>
  );
}

export default App;
