import React, { useEffect, useState } from "react";
import Product from "../product/product";
import styles from "./products.module.css";
import Modal from "../modal/modal";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  // 상품 리스트 불러오기
  useEffect(() => {
    const fetchData = () => {
      fetch("/data.json")
        .then(res => res.json())
        .then(res => {
          setProduct(res.products);
        })
        .catch(e => console.error(e));
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
      <ul className={styles.products}>
        {products.map(product => (
          <Product
            key={product.product_id}
            product={product}
            openModal={openModal}
          />
        ))}
      </ul>
      {modalActive ? (
        <div className={styles.modalContainer}>
          <Modal colseModal={colseModal} />
        </div>
      ) : null}
    </div>
  );
};

export default Products;
