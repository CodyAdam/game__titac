import React, { useState } from 'react';
import styles from './Multi.module.css';
import { connect } from '../../app/socket';

export function Multi() {
  const [ip, setIp] = useState('localhost:2222');
  const [connected, setConnected] = useState(false);

  return (
    <div className={styles.container}>
      <input
        type='text'
        value={ip}
        className={styles.input}
        onChange={(e) => {
          setIp(e.target.value);
        }}
      />
      <button
        className={`${styles.button} ${connected ? styles.connected : ''}`}
        onClick={() => {
          connect(ip, setConnected);
        }}
      >
        {connected ? 'connected' : 'connect'}
      </button>
    </div>
  );
}
