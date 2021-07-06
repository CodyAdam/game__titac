import React from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGrid, Tile, playAt, getSymbol } from './boardSlice';
import { Control } from './Control';

export function Board() {
    const dispatch = useAppDispatch();
    const grid = useAppSelector(selectGrid);
    const turn = useAppSelector((state) => state.board.present.turn);
    const winner = useAppSelector((state) => state.board.present.winner);

    const header = winner ? (
        <h1 className={styles.header + ' ' + styles.winning}> Winner is {getSymbol(winner)}</h1>
    ) : turn === 1 ? (
        <h1 className={styles.header}>Player {getSymbol(1)} turn</h1>
    ) : (
        <h1 className={styles.header}>Player {getSymbol(2)} turn</h1>
    );

    const tiles = grid.map((tile: Tile, index: number) => {
        const items = tile.value.map((item, subIndex) => (
            <div className={styles.item + ' ' + (item.used ? styles.used : '')} key={index + subIndex}>
                {getSymbol(item.player)}
            </div>
        ));
        return (
            <div
                key={index}
                className={styles.cell + ' ' + (tile.value.length >= 3 ? styles.full : '')}
                onClick={() => {
                    if (!winner) dispatch(playAt(index));
                }}
            >
                <div className={styles.under}></div>
                <div className={styles.upper}>
                    <div className={styles.inside}>{items}</div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.subHeader}>First to 3 points win</div>
            {header}
            <div className={styles.grid}>{tiles}</div>
            <Control />
        </div>
    );
}
