import React, { useEffect, useState } from "react";
import styles from "./products.module.css";
import Product from "../product/product";
import Spinner from "../spinner/spinner";
import Modal from "../modal/modal";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  // 상품 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const result = await response.json();
        setProduct(result.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 모달창 띄우기
  const openModal = () => {
    setModalActive(true);
    document.body.style.overflow = "hidden";
  };

  // 모달창 닫기
  const colseModal = () => {
    setModalActive(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div>
      {products.length !== 0 ? (
        <ul className={styles.products}>
          {products.map(product => (
            <Product
              key={product.product_id}
              product={product}
              openModal={openModal}
            />
          ))}
        </ul>
      ) : (
        <Spinner />
      )}

      {modalActive && (
        <div className={styles.modalContainer}>
          <Modal colseModal={colseModal} />
        </div>
      )}
    </div>
  );
};

export default Products;
