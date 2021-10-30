import '../styles/globals.css';

import Nav from '../components/Nav/Nav';

import { CartContext, useCartState } from '../hooks/usecart';

function MyApp({ Component, pageProps }) {
  // state
  const cart = useCartState();

  return (
    <CartContext.Provider value={cart}>
      <Nav />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
export default MyApp;
