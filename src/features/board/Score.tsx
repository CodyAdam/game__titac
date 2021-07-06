import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getSymbol } from './boardSlice';
import styles from './Board.module.css';

export function Score(props: { player: 1 | 2 }) {
    const score = useAppSelector((state) =>
        props.player === 1 ? state.board.present.score.p1.length : state.board.present.score.p2.length,
    );

    return (
        <div className={styles.scoreContainer}>
            <div className={styles.scoreHeader}>{getSymbol(props.player)}</div>
            <div className={styles.scoreHeader}>{score}</div>
        </div>
    );
}
