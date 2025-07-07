import React, { useState } from 'react';
import styles from './Login.module.css';
import { TextField, Button, Tabs, Tab, Checkbox, FormControlLabel, useMediaQuery } from '@mui/material';

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLogin = () => {
    // ✅ Working login logic simulation
    if (!email || !password) return alert('Please enter email and password');
    // Simulate successful login
    alert(`Logged in as ${email}`);
    // Redirect or update app state here
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Hi, Welcome Back!</h1>
        <p>Let's get started. Sign in to continue.</p>
        <div className={styles.slogan}>
          We simplify <span>Network</span>
          <br />
          <strong>Operations</strong>
        </div>
        <p className={styles.subtext}>Secure access to your network management system</p>
      </div>

      <div className={styles.right}>
        <div className={styles.loginBox}>
          <h2>Sign in to LinkEye</h2>
          <p>Enter your details below</p>

          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            className={styles.tabs}
            variant={isMobile ? 'fullWidth' : 'standard'}
          >
            <Tab label="Login With Password" />
            <Tab label="Login With OTP" disabled />
          </Tabs>

          {tab === 0 && (
            <>
              <TextField
                fullWidth
                label="Email address"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={styles.options}>
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label="Remember me"
                />
                <a href="#" className={styles.forgot}>Forgot password?</a>
              </div>
              <Button
                fullWidth
                variant="contained"
                className={styles.loginButton}
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          )}

          <div className={styles.divider}>Or Login with</div>

          <div className={styles.socialButtons}>
            <Button variant="outlined" disabled className={styles.socialBtn}>
              Google
            </Button>
            <Button variant="outlined" disabled className={styles.socialBtn}>
              Microsoft
            </Button>
          </div>

          <p className={styles.needAccess}>
            Need access? <a href="#">Contact your administrator</a>
          </p>
        </div>
      </div>
    </div>
  );
}
