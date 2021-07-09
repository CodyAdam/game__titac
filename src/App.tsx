import React, { useEffect, useState } from 'react';
import { Board } from './features/board/Board';
import { Score } from './features/board/Score';
import { Banner } from './features/banner/Banner';
import { Multi } from './features/multi/Multi';

import styles from './App.module.css';

function App() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  let isMobile: boolean = width <= 768;

  if (isMobile)
    return (
      <div className={styles.app}>
        <Multi />
        <Board />
        <div className={styles.row + ' ' + styles.score + ' ' + styles.small}>
          <Score player={1} small={true} />
          <Score player={2} small={true} />
        </div>
      </div>
    );
  else
    return (
      <div className={styles.app}>
        <Multi />
        <Banner />
        <div className={styles.row}>
          <Score player={1} small={false} />
          <Board />
          <Score player={2} small={false} />
        </div>
      </div>
    );
}

export default App;
