import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../cartItem/cartItem";
import { FaPlus } from "react-icons/fa";
import { FaEquals } from "react-icons/fa";
import styles from "./cartList.module.css";
import { formatPrice } from "../../utils/formatPrice";

const CartList = () => {
  const { cartState } = useContext(CartContext);
  const [priceInfo, setPriceInfo] = useState({
    totalPrice: 0,
    shippingFee: 0,
    payment: 0,
  });

  useEffect(() => {
    const totalPrice = cartState.reduce(
      (total, item) => total + item.event_mon * item.qty,
      0
    );
    const shippingFee = totalPrice > 30000 ? 0 : 3000;
    const payment = totalPrice + shippingFee;

    const newPriceInfo = { totalPrice, shippingFee, payment };
    setPriceInfo(newPriceInfo);
  }, [cartState]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th>상품명</th>
            <th>구매가</th>
            <th>수량</th>
            <th>금액</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartState.map(item => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={styles.priceInfo}>
              <span className={styles.txt}>총 금액</span>
              <span className={styles.price}>
                <strong>{formatPrice(priceInfo.totalPrice)}</strong>원
              </span>
              <FaPlus />
              <span className={styles.txt}>배송비</span>
              <span className={styles.price}>
                <strong>{formatPrice(priceInfo.shippingFee)}</strong>원
              </span>
              <span className={styles.txt2}>(3만원이상 구매시 무료배송)</span>
              <FaEquals />
              <span className={styles.txt}>결제 금액</span>
              <span className={styles.price}>
                <strong>{formatPrice(priceInfo.payment)}</strong>원
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartList;
