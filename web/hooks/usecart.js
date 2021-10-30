import { useEffect, useState, createContext, useContext } from 'react';

import { initiateCheckout } from '../fetch/payments.js'

import products from '../products.json';

const defaultCart = {
  products: {},
};

  
export const CartContext = createContext();


  
export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  // localstore - refresh browser
  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('nextjs_store');
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if ( data ) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('nextjs_store', data);
  }, [cart])

  const cartItems = Object.keys(cart.products).map(key => {

    // product init
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerUnit: product.price
    }
  });
  // subtotal init
  const subtotal = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity;
    },
    0
  );

  //console.log(subtotal);

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  //console.log('The cart is:', cart);
  //console.log(products);
  console.log('items', cartItems);

  // Add Cart
  function addToCart({ id }) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cart;
    });
  }

  // checkout to stripes API
  function checkout(id) {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }
    return {cart, updateCart, subtotal, quantity, addToCart,checkout}
}

// Use access cart
export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}