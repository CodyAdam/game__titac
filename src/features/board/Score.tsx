import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getSymbol } from './boardSlice';
import styles from './Score.module.css';

export function Score(props: { player: 1 | 2; small: boolean }) {
  const score = useAppSelector((state) =>
    props.player === 1 ? state.board.present.score.p1.length : state.board.present.score.p2.length,
  );

  const turn = useAppSelector((state) => state.board.present.turn);

  if (props.small)
    return (
      <div className={`${styles.smallContainer} ${turn === props.player ? styles.turn : ''}`}>
        <div className={styles.smallHeader}>{getSymbol(props.player)}</div>
        <div className={styles.smallHeader}>{score}</div>
      </div>
    );
  else
    return (
      <div className={`${styles.container} ${turn === props.player ? styles.turn : ''}`}>
        <div className={styles.header}>{getSymbol(props.player)}</div>
        <div className={styles.header}>{score}</div>
      </div>
    );
}
