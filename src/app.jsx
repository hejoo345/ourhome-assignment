import styles from "./app.module.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Products from "./components/products/products";
import CartList from "./components/cartList/cartList";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className={styles.app}>
          <header>
            <ul className={styles.tabMenu}>
              <li>
                <NavLink
                  to="/product"
                  className={({ isActive }) => {
                    return isActive ? `${styles.active}` : "";
                  }}
                >
                  베스트 상품
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => {
                    return isActive ? `${styles.active}` : "";
                  }}
                >
                  장바구니
                </NavLink>
              </li>
            </ul>
          </header>
          <main>
            <Routes>
              <Route path="/product" Component={Products} />
              <Route path="/cart" Component={CartList} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
