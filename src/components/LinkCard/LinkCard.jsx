

import React from 'react';
import styles from './LinkCard.module.css';

const LinkCard = ({ title = 'Links', links = [], onSelectIP = () => {}, selectedIP, data }) => {


  
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.scroll}>
        {links.length > 0 ? (
          links.map((ip, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className={`${styles.ipItem} ${ip === selectedIP ? styles.active : ''}`}
              onClick={() => onSelectIP(ip)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSelectIP(ip);
              }}
            >
              {ip}
            </div>
          ))
        ) : (
          <div className={styles.ipItem}>No links available</div>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
