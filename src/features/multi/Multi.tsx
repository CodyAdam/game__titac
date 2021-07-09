import React, { useState } from 'react';
import styles from './Multi.module.css';
import { socket, connect } from '../../app/socket';

export function Multi() {
  const [ip, setIp] = useState('localhost:8080');
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
