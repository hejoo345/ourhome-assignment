import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import styles from "./cartItem.module.css";
import { CartContext } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import { GoTrash } from "react-icons/go";

const CartItem = ({ item }) => {
  const {
    increaseCartItem,
    decreaseCartItem,
    changeQtyCartItem,
    deleteCartItem,
  } = useContext(CartContext);

  const handleQtyChange = e => {
    const inputValue = parseInt(e.target.value);
    if (isNaN(inputValue)) { // 숫자가 아닌 경우
      return false;
    }
    changeQtyCartItem(item, parseInt(e.target.value));
  };

  return (
    <tr className={styles.container}>
      <td className={styles.name}>
        <div>
          <img
            src={`https://mall.ourhome.co.kr//${item.product_img}`}
            alt={item.product_nm}
          />
        </div>
        <strong>{item.product_nm}</strong>
      </td>
      <td>
        <div className={styles.price}>
          <span>
            <strong>{formatPrice(item.event_mon)}</strong>원
          </span>
          <s>{formatPrice(item.sale_mon)}원</s>
        </div>
      </td>
      <td>
        <div className={styles.quantity}>
          <button onClick={() => increaseCartItem(item)}>
            <FaPlus />
          </button>
          <input value={item.qty} onChange={handleQtyChange}></input>
          <button onClick={() => decreaseCartItem(item)}>
            <FaMinus />
          </button>
        </div>
      </td>
      <td className={styles.totalPrice}>
        <strong>{formatPrice(item.event_mon * item.qty)}</strong>원
      </td>
      <td className={styles.trash}>
        <button onClick={() => deleteCartItem(item)}>
          <GoTrash />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
