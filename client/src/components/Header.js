import React from "react";
import styles from "./Header.module.css";
import StudentReadImg from '../components/StudentReadImg'

const Header = () => {
  return (
    <>
      <header className={styles['header']}>
      <StudentReadImg/>
        <h1 className={styles["header__title"]}>ECHO READER</h1>
      </header>
    </>
  );
};

export default Header;
