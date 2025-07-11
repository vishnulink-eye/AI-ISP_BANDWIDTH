
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import LinkCard from '../../components/LinkCard/LinkCard';
import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
import styles from './Dashboard.module.css';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ email }) => {
  const [overProvisioned, setOverProvisioned] = useState({});
  const [underProvisioned, setUnderProvisioned] = useState({});
  const [selectedIP, setSelectedIP] = useState('');
  const navigate = useNavigate();

  // Conditional file loading based on email
  const overFiles = email === 'admin@decathlon.com'
    ? import.meta.glob('../../Over-Provisioned-decathlon/*.json', { eager: true })
    : import.meta.glob('../../Over-Provisioned/*.json', { eager: true });

  const underFiles = email === 'admin@decathlon.com'
    ? import.meta.glob('../../Under-Provisioned-decathlon/*.json', { eager: true })
    : import.meta.glob('../../Under-Provisioned/*.json', { eager: true });

  useEffect(() => {
    const extractIPData = (fileMap) => {
      const ipDataMap = {};

      Object.entries(fileMap).forEach(([path, mod]) => {
        const ip = path.split('/').pop().replace('.json', '');
        const jsonData = Array.isArray(mod.default) ? mod.default[0] : mod.default;

        if (email === 'admin@decathlon.com') {
          const aiAnalysis = jsonData?.ai_analysis || '';

          const locationMatch = aiAnalysis.match(/\*\*Location\*\*: (.+)/);
          const vendorMatch = aiAnalysis.match(/\*\*Vendor\*\*: (.+)/);
          const linkTypeMatch = aiAnalysis.match(/\*\*Link Type\*\*: (.+)/);

          const location = locationMatch?.[1]?.trim();
          const vendor = vendorMatch?.[1]?.trim();
          const linkType = linkTypeMatch?.[1]?.trim();

          if (linkType !== 'ILL') return; 

          if (location && vendor) {
            const label = `${location} - ${vendor} (${ip})`;
            ipDataMap[label] = jsonData;
          }
        } else {
          ipDataMap[ip] = jsonData;
        }
      });

      return ipDataMap;
    };

    setOverProvisioned(extractIPData(overFiles));
    setUnderProvisioned(extractIPData(underFiles));
  }, [email]);

  const handleIPSelect = (ip) => {
    setSelectedIP(ip);
  };

  const handleClose = () => {
    setSelectedIP('');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const selectedData = overProvisioned[selectedIP] || underProvisioned[selectedIP];

  return (
    <div className={styles.container}>
      {/* Logout Icon */}
      <div className={styles.logoutContainer}>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div>
        <Header email={email} />
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



// import React, { useEffect, useState } from 'react';
// import Header from '../../components/Header/Header';
// import LinkCard from '../../components/LinkCard/LinkCard';
// import RecommendationsCard from '../../components/RecommendationsCard/RecommendationsCard';
// import styles from './Dashboard.module.css';
// import Papa from 'papaparse';

// const Dashboard = () => {
//   const [mapping, setMapping] = useState({});
//   const [overPDFs, setOverPDFs] = useState({});
//   const [underPDFs, setUnderPDFs] = useState({});
//   const [selectedIP, setSelectedIP] = useState('');

//   const overFiles = import.meta.glob('/src/over_provisioned_links/*.pdf', {
//     eager: true,
//     query: '?url',
//     import: 'default'
//   });
  
//   const underFiles = import.meta.glob('/src/under_provisioned_links/*.pdf', {
//     eager: true,
//     query: '?url',
//     import: 'default'
//   });

//   const csvFile = new URL('../../public_ip.csv', import.meta.url).href;

//   useEffect(() => {
//     const loadCSV = async () => {
//       try {
//         const response = await fetch(csvFile);
//         const csvText = await response.text();
//         const parsed = Papa.parse(csvText, { header: true });

//         const map = {};
//         parsed.data.forEach((row) => {
//           const wanId = row.isp_wan_id?.trim();
//           const ip = row.public_ip?.trim();
//           if (wanId && ip) {
//             map[wanId] = ip;
//           }
//         });

//         setMapping(map);
//       } catch (error) {
//       }
//     };

//     const extractPDFMap = (fileMap, label) => {
//       const pdfMap = {};
//       Object.entries(fileMap).forEach(([path, url]) => {
//         const filename = path.split('/').pop().replace('.pdf', '');
//         const match = filename.match(/\d+$/);
//         if (match) {
//           const wanId = match[0];
//           pdfMap[wanId] = url;
//         }
//       });
//       return pdfMap;
//     };

//     loadCSV();
//     setOverPDFs(extractPDFMap(overFiles, 'Over Provisioned'));
//     setUnderPDFs(extractPDFMap(underFiles, 'Under Provisioned'));
//   }, []);

//   const getWanIdByIp = (ip) => {
//     const entry = Object.entries(mapping).find(([wanId, publicIp]) => publicIp === ip);
//     const wanId = entry?.[0] || '';
//     return wanId;
//   };

//   const handleIPSelect = (ip) => {
//     setSelectedIP(ip);
//   };

//   const handleClose = () => {
//     setSelectedIP('');
//   };

//   const overIPs = Object.entries(mapping)
//     .filter(([wanId]) => overPDFs[wanId])
//     .map(([_, ip]) => ip);

//   const underIPs = Object.entries(mapping)
//     .filter(([wanId]) => underPDFs[wanId])
//     .map(([_, ip]) => ip);

//   const wanIdFromIp = getWanIdByIp(selectedIP);
//   const selectedPDF = overPDFs[wanIdFromIp] || underPDFs[wanIdFromIp];

  

//   return (
//     <div className={styles.container}>
//       <div>
//         <Header />
//         <div className={styles.cards}>
//           <LinkCard
//             title="Over Provisioned Links"
//             links={overIPs}
//             selectedIP={selectedIP}
//             onSelectIP={handleIPSelect}
//           />
//           <LinkCard
//             title="Under Provisioned Links"
//             links={underIPs}
//             selectedIP={selectedIP}
//             onSelectIP={handleIPSelect}
//           />
//         </div>

//         {selectedIP && selectedPDF && (
//   <div className={styles.recommendationWrapper}>
//     <RecommendationsCard ip={selectedIP} pdfUrl={selectedPDF} onClose={handleClose} />
//   </div>
// )}
//       </div>
//       <p className={styles.footer}>AI Team@2025</p>
//     </div>
//   );
// };

// export default Dashboard;


