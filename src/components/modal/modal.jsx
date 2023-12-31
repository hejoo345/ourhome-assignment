import React from "react";
import styles from "./modal.module.css";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Modal = ({ colseModal }) => {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
    colseModal();
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>장바구니</span>
        <IoClose size={30} onClick={colseModal} />
      </div>
      <div className={styles.content}>
        <p className={styles.p1}>선택한 상품이 장바구니에 담겼습니다.</p>
        <p className={styles.p2}>장바구니로 이동하겠습니까?</p>
        <div className={styles.btnWrap}>
          <button className={styles.btn1} onClick={goToCart}>
            장바구니 확인하기
          </button>
          <button className={styles.btn2} onClick={colseModal}>
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
