import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <header className={styles['header']}>
        <h1 className={styles["header__title"]}>ECHO READER beta</h1>
      </header>
    </div>
  );
};

export default Header;
