import React from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGrid, Tile, playAt } from './boardSlice';
import { Control } from './Control';

export function Board() {
    const dispatch = useAppDispatch();
    const grid = useAppSelector(selectGrid);
    const turn = useAppSelector((state) => state.board.present.turn);
    const winner = useAppSelector((state) => state.board.present.winner);

    const header = winner ? (
        <h1 className={styles.header}>Winner is {winner}</h1>
    ) : turn === 1 ? (
        <h1 className={styles.header}>Player 1 turn</h1>
    ) : (
        <h1 className={styles.header}>Player 2 turn</h1>
    );

    const tiles = grid.map((tile: Tile, index: number) => (
        <div key={index} className={styles.cell}>
            <div className={styles.under}></div>
            <div
                className={styles.upper}
                onClick={() => {
                    if (!winner) dispatch(playAt(index));
                }}
            >
                <span className={styles.inside}>{tile.value.join(' ')}</span>
            </div>
        </div>
    ));

    return (
        <div className={styles.container}>
            {header}
            <div className={styles.grid}>{tiles}</div>
            <Control />
        </div>
    );
}
