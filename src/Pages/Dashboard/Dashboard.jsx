// import React, { useState } from 'react';
// import Header from '../../components/Header/Header';
// import LinkCard from '../../components/LinkCard/LinkCard';
// import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
// import styles from './Dashboard.module.css';

// const Dashboard = () => {
//   const [selectedIP, setSelectedIP] = useState('');

//   const overProvisioned = ['XX.XX.XXX.01', 'XX.XX.XXX.02', 'XX.XX.XXX.03'];
//   const underProvisioned = ['XX.XX.XXX.21', 'XX.XX.XXX.22'];

//   const handleIPSelect = (ip) => {
//     setSelectedIP(ip);
//   };
//   const handleClose = () => {
//     setSelectedIP('');
//   };

//   return (
//     <div className={styles.container}>
//   <div>
//     <Header />
//     <div className={styles.cards}>
//       <LinkCard title="Over provisioned Links" links={overProvisioned} onSelectIP={handleIPSelect} />
//       <LinkCard title="Under Provisioned Links" links={underProvisioned} onSelectIP={handleIPSelect} />
//     </div>

//     {selectedIP && (
//       <div className={styles.recommendationWrapper}>
//         <RecommendationsCard ip={selectedIP} onClose={handleClose} />
//       </div>
//     )}
//   </div>

//   <p className={styles.footer}>AI Team@2025</p>
// </div>

//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import LinkCard from '../../components/LinkCard/LinkCard';
import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [overProvisioned, setOverProvisioned] = useState({});
  const [underProvisioned, setUnderProvisioned] = useState({});
  const [selectedIP, setSelectedIP] = useState('');

  const overFiles = import.meta.glob('../../over_provisioned/*.json', { eager: true });
  const underFiles = import.meta.glob('../../under_provisioned/*.json', { eager: true });

  useEffect(() => {
    const extractIPData = (fileMap) => {
      const ipDataMap = {};
      Object.entries(fileMap).forEach(([path, mod]) => {
        const ip = path.split('/').pop().replace('.json', '');
        const jsonData = mod.default;
        ipDataMap[ip] = Array.isArray(jsonData) ? jsonData[0] : jsonData;
      });
      return ipDataMap;
    };

    setOverProvisioned(extractIPData(overFiles));
    setUnderProvisioned(extractIPData(underFiles));
  }, []);

  const handleIPSelect = (ip) => {
    setSelectedIP(ip);
  };

  const handleClose = () => {
    setSelectedIP('');
  };

  const selectedData = overProvisioned[selectedIP] || underProvisioned[selectedIP];

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <div className={styles.cards}>
          <LinkCard
            title="Over provisioned Links"
            links={Object.keys(overProvisioned)}
            selectedIP={selectedIP}
            onSelectIP={handleIPSelect}
          />
          <LinkCard
            title="Under Provisioned Links"
            links={Object.keys(underProvisioned)}
            selectedIP={selectedIP}
            onSelectIP={handleIPSelect}
          />
        </div>

        {selectedIP && selectedData && (
          <div className={styles.recommendationWrapper}>
            <RecommendationsCard ip={selectedIP} data={selectedData} onClose={handleClose} />
          </div>
        )}
      </div>

      <p className={styles.footer}>AI Team@2025</p>
    </div>
  );
};

export default Dashboard;
