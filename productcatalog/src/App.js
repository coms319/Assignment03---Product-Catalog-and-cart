import React, { useState, useEffect } from 'react';
import Cart from './cart';
import Catalog from './catalog';
import Summary from './summary';

function App() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
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
      let totalQuantity = 0;
      for (const key in cart) {
        totalAmount += cart[key].item.price * cart[key].quantity;
        totalQuantity += cart[key].quantity;
      }
      setCartTotal(totalAmount);
      setQuantity(totalQuantity);
    };
    total();
  }, [cart]);

  const addToCart = (el) => {
    setCart((prevCart) => {
      const existingItem = prevCart[el.id];

      return {
        ...prevCart,
        [el.id]: existingItem
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : { item: el, quantity: 1 },
      };
    });
  };

  const removeFromCart = (el) => {
    setCart((prevCart) => {
      const existingItem = prevCart[el.id];

      if (!existingItem) return prevCart; // Item doesn't exist, no change

      if (existingItem.quantity > 1) {
        // Decrease quantity by 1
        return {
          ...prevCart,
          [el.id]: { ...existingItem, quantity: existingItem.quantity - 1 },
        };
      } else {
        // Remove item from cart
        const newCart = { ...prevCart };
        delete newCart[el.id];
        return newCart;
      }
    });
  };

  return (
    <>
      <Catalog
        viewer={viewer}
        setViewer={setViewer}
        cart={cart}
        cartTotal={cartTotal}
        quantity={quantity}
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
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />

      <Summary viewer={viewer} setViewer={setViewer} />
    </>
  );
}

export default App;
