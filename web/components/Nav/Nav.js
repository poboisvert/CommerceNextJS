import { useCart } from '../../hooks/usecart';

const Nav = () => {
  // Fetch data from context
  const { subtotal, checkout } = useCart();
  return (
    <nav>
      <p>
        Quick Checkout
      </p>
      <p>
        <button onClick={checkout}>
          ${subtotal.toFixed(2)}
        </button>
      </p>
    </nav>
  )
}

export default Nav;