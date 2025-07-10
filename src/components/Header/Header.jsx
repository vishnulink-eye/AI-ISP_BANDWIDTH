import React from 'react';
import styles from './Header.module.css';

const emailToCustomer = {
  'admin@titan.com': 'Titan',
  'admin@decathlon.com': 'Decathlon',
  
  
};

const Header = ({ email }) => {
  const customerName = emailToCustomer[email] || 'Unknown Customer';

  return (
    <div className={styles.header}>
      <h1>ISP Bandwidth Recommendation</h1>
      <div className={styles.subHeader}>
        <span>Customer: {customerName}</span>
        <span>Time Period: Quarter - 1</span>
      </div>
    </div>
  );
};

export default Header;
