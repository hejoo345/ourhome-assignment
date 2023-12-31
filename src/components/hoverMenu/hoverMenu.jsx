import React from "react";
import styles from "./hoverMenu.module.css";
import { FaCartPlus } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoBagAddOutline } from "react-icons/io5";

const HoverMenu = ({ active, handleAddCart }) => {
  return active ? (
    <div className={`${styles.container} ${styles.active}`}>
      <button onClick={handleAddCart}>
        <FaCartPlus size={20} />
      </button>
      <button>
        <GoHeart size={20} />
      </button>
      <button>
        <IoBagAddOutline size={20} />
      </button>
    </div>
  ) : null;
};

export default HoverMenu;
