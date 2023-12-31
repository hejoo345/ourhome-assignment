import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState(() => {
    const items = localStorage.getItem("cart_items");
    return items ? JSON.parse(items) : [];
  });

  // 장바구니의 상태가 바뀔 때마다 local Storage 업데이트
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = product => {
    // 장바구니에 이미 같은 상품이 있는지 확인
    const existInCart = cartState.find(
      item => item.product_id === product.product_id
    );
    if (existInCart) {
      const updatedCart = cartState.map(item => {
        if (item.product_id === product.product_id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCartState(updatedCart);
    } else {
      setCartState(prev => [...prev, { ...product, qty: 1 }]);
    }
  };

  const increaseCartItem = product => {
    const updatedCart = cartState.map(item => {
      if (item.product_id === product.product_id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCartState(updatedCart);
  };

  const decreaseCartItem = product => {
    const updatedCart = cartState.map(item => {
      if (item.product_id === product.product_id) {
        if (item.qty === 1) return item;
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCartState(updatedCart);
  };

  const changeQtyCartItem = (product, qty) => {
    const updatedCart = cartState.map(item => {
      if (item.product_id === product.product_id) {
        return { ...item, qty };
      }
      return item;
    });
    setCartState(updatedCart);
  };

  const deleteCartItem = product => {
    const updatedCart = cartState.filter(
      item => item.product_id !== product.product_id
    );
    setCartState(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        increaseCartItem,
        decreaseCartItem,
        changeQtyCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
