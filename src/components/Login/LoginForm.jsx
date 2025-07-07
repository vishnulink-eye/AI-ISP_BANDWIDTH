import React, { useState } from 'react';
import styles from './Login.module.css';
import { TextField, Button, Tabs, Tab, Checkbox, FormControlLabel } from '@mui/material';
import { Google, Windows } from '@mui/icons-material';

export default function LoginForm() {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.loginBox}>
      <h2>Sign in to LinkEye</h2>
      <p>Enter your details below</p>

      <Tabs value={tab} onChange={(e, val) => setTab(val)} className={styles.tabs}>
        <Tab label="Login With Password" />
        <Tab label="Login With OTP" />
      </Tabs>

      {tab === 0 ? (
        <>
          <TextField fullWidth label="Email address" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <div className={styles.options}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>
        </>
      ) : (
        <>
          <TextField fullWidth label="Email address" margin="normal" />
          <TextField fullWidth label="OTP" margin="normal" />
        </>
      )}

      <Button fullWidth variant="contained" className={styles.loginButton}>Login</Button>

      <div className={styles.divider}>Or Login with</div>
      <div className={styles.socialButtons}>
        <Button variant="outlined" startIcon={<Google />} className={styles.socialBtn}>Google</Button>
        <Button variant="outlined" startIcon={<Windows />} className={styles.socialBtn}>Microsoft</Button>
      </div>

      <p className={styles.needAccess}>
        Need access? <a href="#">Contact your administrator</a>
      </p>
    </div>
  );
}
