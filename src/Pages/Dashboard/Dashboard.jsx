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



// import React, { useEffect, useState } from 'react';
// import Header from '../../components/Header/Header';
// import LinkCard from '../../components/LinkCard/LinkCard';
// import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
// import styles from './Dashboard.module.css';

// const Dashboard = () => {
//   const [overProvisioned, setOverProvisioned] = useState({});
//   const [underProvisioned, setUnderProvisioned] = useState({});
//   const [selectedIP, setSelectedIP] = useState('');

//   const overFiles = import.meta.glob('../../over_provisioned/*.json', { eager: true });
//   const underFiles = import.meta.glob('../../under_provisioned/*.json', { eager: true });

//   useEffect(() => {
//     const extractIPData = (fileMap) => {
//       const ipDataMap = {};
//       Object.entries(fileMap).forEach(([path, mod]) => {
//         const ip = path.split('/').pop().replace('.json', '');
//         const jsonData = mod.default;
//         ipDataMap[ip] = Array.isArray(jsonData) ? jsonData[0] : jsonData;
//       });
//       return ipDataMap;
//     };

//     setOverProvisioned(extractIPData(overFiles));
//     setUnderProvisioned(extractIPData(underFiles));
//   }, []);

//   const handleIPSelect = (ip) => {
//     setSelectedIP(ip);
//   };

//   const handleClose = () => {
//     setSelectedIP('');
//   };

//   const selectedData = overProvisioned[selectedIP] || underProvisioned[selectedIP];

//   return (
//     <div className={styles.container}>
//       <div>
//         <Header />
//         <div className={styles.cards}>
//           <LinkCard
//             title="Over provisioned Links"
//             links={Object.keys(overProvisioned)}
//             selectedIP={selectedIP}
//             onSelectIP={handleIPSelect}
//           />
//           <LinkCard
//             title="Under Provisioned Links"
//             links={Object.keys(underProvisioned)}
//             selectedIP={selectedIP}
//             onSelectIP={handleIPSelect}
//           />
//         </div>

        // {selectedIP && selectedData && (
        //   <div className={styles.recommendationWrapper}>
        //     <RecommendationsCard ip={selectedIP} data={selectedData} onClose={handleClose} />
        //   </div>
        // )}
//       </div>

//       <p className={styles.footer}>AI Team@2025</p>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import LinkCard from '../../components/LinkCard/LinkCard';
import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
import styles from './Dashboard.module.css';
import Papa from 'papaparse';

const Dashboard = () => {
  const [mapping, setMapping] = useState({});
  const [overPDFs, setOverPDFs] = useState({});
  const [underPDFs, setUnderPDFs] = useState({});
  const [selectedIP, setSelectedIP] = useState('');

  const overFiles = import.meta.glob('/src/over_provisioned_links/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default'
  });
  
  const underFiles = import.meta.glob('/src/under_provisioned_links/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default'
  });

  const csvFile = new URL('../../public_ip.csv', import.meta.url).href;

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(csvFile);
        const csvText = await response.text();
        const parsed = Papa.parse(csvText, { header: true });

        const map = {};
        parsed.data.forEach((row) => {
          const wanId = row.isp_wan_id?.trim();
          const ip = row.public_ip?.trim();
          if (wanId && ip) {
            map[wanId] = ip;
          }
        });

        console.log("🧩 CSV Mapping (WAN ID => IP):", map);
        setMapping(map);
      } catch (error) {
        console.error('❌ Failed to load CSV:', error);
      }
    };

    const extractPDFMap = (fileMap, label) => {
      const pdfMap = {};
      Object.entries(fileMap).forEach(([path, url]) => {
        const filename = path.split('/').pop().replace('.pdf', '');
        const match = filename.match(/\d+$/);
        if (match) {
          const wanId = match[0];
          pdfMap[wanId] = url;
        }
      });
      console.log(`📁 Extracted ${label} PDFs (WAN ID => URL):`, pdfMap);
      return pdfMap;
    };

    loadCSV();
    setOverPDFs(extractPDFMap(overFiles, 'Over Provisioned'));
    setUnderPDFs(extractPDFMap(underFiles, 'Under Provisioned'));
  }, []);

  const getWanIdByIp = (ip) => {
    const entry = Object.entries(mapping).find(([wanId, publicIp]) => publicIp === ip);
    const wanId = entry?.[0] || '';
    console.log(`🔍 Selected IP: ${ip} ➡️ Mapped WAN ID: ${wanId}`);
    return wanId;
  };

  const handleIPSelect = (ip) => {
    setSelectedIP(ip);
  };

  const handleClose = () => {
    setSelectedIP('');
  };

  const overIPs = Object.entries(mapping)
    .filter(([wanId]) => overPDFs[wanId])
    .map(([_, ip]) => ip);

  const underIPs = Object.entries(mapping)
    .filter(([wanId]) => underPDFs[wanId])
    .map(([_, ip]) => ip);

  const wanIdFromIp = getWanIdByIp(selectedIP);
  const selectedPDF = overPDFs[wanIdFromIp] || underPDFs[wanIdFromIp];

  console.log("📡 Over Provisioned IPs:", overIPs);
  console.log("📡 Under Provisioned IPs:", underIPs);

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <div className={styles.cards}>
          <LinkCard
            title="Over Provisioned Links"
            links={overIPs}
            selectedIP={selectedIP}
            onSelectIP={handleIPSelect}
          />
          <LinkCard
            title="Under Provisioned Links"
            links={underIPs}
            selectedIP={selectedIP}
            onSelectIP={handleIPSelect}
          />
        </div>

        {selectedIP && selectedPDF && (
  <div className={styles.recommendationWrapper}>
    <RecommendationsCard ip={selectedIP} pdfUrl={selectedPDF} onClose={handleClose} />
  </div>
)}
      </div>
      <p className={styles.footer}>AI Team@2025</p>
    </div>
  );
};

export default Dashboard;


