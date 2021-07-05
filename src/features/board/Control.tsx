import React from 'react';
import styles from './Board.module.css';

export function Control() {
    return (
        <div className={styles.controlBar}>
            <button className={styles.controlButton}>undo</button>
            <button className={styles.controlButton}>redo</button>
            <button className={styles.controlButton}>reset</button>
        </div>
    );
}
