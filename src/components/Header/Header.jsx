import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.header}>
    <h1>ISP Bandwidth Recommendation</h1>
    <div className={styles.subHeader}>
      <span>Customer: Titan</span>
      <span>Time Period: Quarter - 1</span>
    </div>
  </div>
);

export default Header;
