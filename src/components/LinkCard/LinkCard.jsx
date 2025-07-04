// import React from 'react';
// import { Select, MenuItem } from '@mui/material';
// import styles from './LinkCard.module.css';

// const LinkCard = ({ title, links, onSelectIP }) => {
//   const handleChange = (event) => {
//     onSelectIP(event.target.value);
//   };

//   return (
//     <div className={styles.card}>
//       <h3 className={styles.title}>{title}</h3>
//       <div className={styles.scroll}>
//         {links.map((link, index) => (
//           <Select
//             key={index}
//             displayEmpty
//             value=""
//             onChange={handleChange}
//             fullWidth
//             className={styles.select}
//           >
//             <MenuItem value="">Select IP</MenuItem>
//             <MenuItem value={link}>{link}</MenuItem>
//           </Select>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LinkCard;


// import React from 'react';
// import styles from './LinkCard.module.css';

// const LinkCard = ({ title, links = [], onSelectIP, selectedIP }) => {
//   return (
//     <div className={styles.card}>
//       <h3 className={styles.title}>{title}</h3>
//       <div className={styles.scroll}>
//         {links.map((ip, index) => (
//           <div
//             key={index}
//             className={`${styles.ipItem} ${ip === selectedIP ? styles.active : ''}`}
//             onClick={() => onSelectIP(ip)}
//           >
//             {ip}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LinkCard;

import React from 'react';
import styles from './LinkCard.module.css';

const LinkCard = ({ title = 'Links', links = [], onSelectIP = () => {}, selectedIP }) => {
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
