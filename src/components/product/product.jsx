import React, { useContext, useState } from "react";
import styles from "./product.module.css";
import HoverMenu from "../hoverMenu/hoverMenu";
import { CartContext } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

const Product = ({ product, openModal }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const { addToCart } = useContext(CartContext);

  // 실온, 냉장, 냉동 구분
  const setTemp = product => {
    if (product.keep_temp === "temp1") {
      return styles.temp1;
    } else if (product.keep_temp === "temp2") {
      return styles.temp2;
    } else {
      return styles.temp3;
    }
  };

  // 상품에 마우스 올렸을 때
  const handleMouseOver = () => {
    setMouseOver(true);
  };

  // 상품에 마우스 내렸을 때
  const handleMouseOut = () => {
    setMouseOver(false);
  };

  // 장바구니 추가 이벤트
  const handleAddCart = () => {
    console.log(product);
    addToCart(product);
    openModal();
  };

  return (
    <li
      className={styles.container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p className={styles.ranking}>
        {product.ranking.toString().padStart(2, "0")}
      </p>
      <div className={styles.imgContainer}>
        <img
          src={`https://mall.ourhome.co.kr//${product.product_img}`}
          alt={product.product_nm}
        />
        <HoverMenu active={mouseOver} handleAddCart={handleAddCart} />
      </div>
      <div>
        <span className={styles.nm}>{product.product_nm}</span>
        <span className={styles.brif}>{product.product_brif}</span>
        <div className={styles.price}>
          <span className={styles.eventMon}>
            <strong>{formatPrice(product.event_mon)}</strong>원
          </span>
          <s>{formatPrice(product.sale_mon)}원</s>
          <span className={styles.rate}>{product.dis_rate}%</span>
        </div>
      </div>
      <div className={`${styles.option} ${setTemp(product)}`}>
        {product.keep_methode}
      </div>
    </li>
  );
};

export default Product;
