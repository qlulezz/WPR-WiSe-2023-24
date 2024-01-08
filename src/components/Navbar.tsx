import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "./ui/Button";
import { useSelector } from "react-redux";
import { CartItem, RootState, User } from "../services/state/reducer";

export default function Navbar() {
  const location = useLocation();

  const cart: CartItem[] = useSelector((state: RootState) => {
    return state.cart;
  });
  const user: User = useSelector((state: RootState) => {
    return state.user;
  });

  return (
    <nav>
      <ul>
        <li>
          {location.pathname === "/" ? (
            <Link to="/">
              <i className="fas fa-bags-shopping" />
              <p>Web-Programmierung React - Shop</p>
            </Link>
          ) : (
            <Link to="/">
              <i className="fas fa-arrow-left" />
              <p>Artikel durchstöbern</p>
            </Link>
          )}
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart" />
            <p className={styles.cart_title}>Warenkorb ({cart.length})</p>
            <p className={styles.cart_count}>({cart.length})</p>
          </Link>
        </li>
        {user.email ? (
          <li>
            <Link to="/orders">
              <p>{user.email}</p>
              <i className="fas fa-user" />
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
