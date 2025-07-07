import React, { useState } from 'react';
import styles from './Login.module.css';
import { Button, TextField, Tabs, Tab, Checkbox, FormControlLabel, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WifiIcon from '@mui/icons-material/Wifi';
import RouterIcon from '@mui/icons-material/Router';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import BarChartIcon from '@mui/icons-material/BarChart';
import GridViewIcon from '@mui/icons-material/GridView';

import logo from '../../assets/linkeye_logo 1.png'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [passwordOrOtp, setPasswordOrOtp] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setPasswordOrOtp('');
    setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    setError('');
    if (tab === 0) {
      if (email === 'admin@linkeye.ai' && passwordOrOtp === 'admin123') {
       
        onLoginSuccess(); 
        navigate('/');
      } else {
        setError('Invalid email or password.');
      }
    } else {
      if (email === 'admin@linkeye.ai' && passwordOrOtp === '123456') {
        
        onLoginSuccess(); 
        navigate('/');
      } else {
        setError('Invalid email or OTP.');
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.left}>
        <img src={logo} alt="LinkEye" className={styles.logo} />
        <h1>Hi, Welcome Back!</h1>
        <p>Let's get started. Sign in to continue.</p>
        <div className={styles.iconGrid}>
  <div className={styles.icon}><WifiIcon fontSize="medium" /></div>
  <div className={styles.icon}><RouterIcon fontSize="medium"/></div>
  <div className={styles.icon}><SecurityIcon fontSize="medium"/></div>
  <div className={styles.iconCenter}><SettingsIcon fontSize="medium" /></div>
  <div className={styles.icon}><DevicesIcon fontSize="medium" /></div>
  <div className={styles.icon}><StorageIcon fontSize="medium" /></div>
  <div className={styles.icon}><NetworkCheckIcon fontSize="medium"/></div>
  <div className={styles.icon}><BarChartIcon fontSize="medium"/></div>
  <div className={styles.icon}><GridViewIcon fontSize="medium"/></div>
</div>
        <h3><span>We simplify </span><strong>Network</strong></h3>
        <h3 className={styles.greenText}>Operations</h3>
        <p className={styles.subText}>Secure access to your network management system</p>
      </div>

   
<div className={styles.right}>
  <h2>Sign in to LinkEye</h2>
  <p>Enter your details below</p>

  <div className={styles.formWrapper}>
    <Tabs
      value={tab}
      onChange={handleTabChange}
      className={styles.tabs}
      aria-label="Login Tabs"
      centered
    >
      <Tab label="Login With Password" />
      <Tab label="Login With OTP" />
    </Tabs>

    <TextField
      label="Email address"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      variant="outlined"
      className={styles.textField}
      InputLabelProps={{ shrink: true }}
    />

    <TextField
      label={tab === 0 ? 'Password' : 'OTP'}
      type={tab === 0 ? (showPassword ? 'text' : 'password') : 'text'}
      fullWidth
      margin="normal"
      value={passwordOrOtp}
      onChange={(e) => setPasswordOrOtp(e.target.value)}
      variant="outlined"
      className={styles.textField}
      InputLabelProps={{ shrink: true }}
      InputProps={tab === 0 ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: '#94a3b8' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      } : {}}
    />

    {error && <p className={styles.errorText}>{error}</p>}

    <div className={styles.actions}>
      <FormControlLabel
        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />}
        label="Remember me"
      />
      <span className={styles.forgot}>Forgot password?</span>
    </div>

    <Button fullWidth variant="contained" onClick={handleLogin} className={styles.loginBtn}>
      Login
    </Button>
  </div>

  <div className={styles.divider}>Or Login with</div>

  <div className={styles.oauthButtons}>
    <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth className={styles.oauthButton}>
      Google
    </Button>
    <Button variant="outlined" startIcon={<MicrosoftIcon />} fullWidth className={styles.oauthButton}>
      Microsoft
    </Button>
  </div>

  <p className={styles.footer}>
    Need access? <span onClick={() => alert('Contact administrator clicked!')}>Contact your administrator</span>
  </p>
</div>


    </div>
  );
};

export default Login;