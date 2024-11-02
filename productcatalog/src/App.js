import React, { useState, useEffect } from 'react';
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

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

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

  return (
    <>
      <Catalog
        viewer={viewer}
        setViewer={setViewer}
        cart={cart}
        setCart={setCart}
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
    </>
  );
}

export default App;
