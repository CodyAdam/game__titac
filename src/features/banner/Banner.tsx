import React from 'react';
import styles from './Banner.module.css';
export function Banner() {
  return (
    <div>
      <button className={styles.button}>
        <img src={process.env.PUBLIC_URL + '/banner.png'} alt='banner' className={styles.image}></img>
        <a rel='noreferrer' target='_blank' className={styles.info} href='https://github.com/CodyAdam/titac'>
          github.com/CodyAdam/titac
        </a>
      </button>
    </div>
  );
}
