import React, { useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGrid, Tile, playAt, getSymbol } from './boardSlice';
import { Control } from './Control';
import { Lines } from './Lines';
import { socket } from '../../app/socket';

export function Board() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);
  const present = useAppSelector((state) => state.board.present);
  const turn = useAppSelector((state) => state.board.present.turn);
  const winner = useAppSelector((state) => state.board.present.winner);

  const header = winner ? (
    <h1 className={styles.header + ' ' + styles.winning}> Winner is {getSymbol(winner)}</h1>
  ) : turn === 1 ? (
    <h1 className={styles.header}>Player {getSymbol(1)} turn</h1>
  ) : (
    <h1 className={styles.header}>Player {getSymbol(2)} turn</h1>
  );

  useEffect(() => {
    if (!present.received) socket.emit('state', present);
  });

  const tiles = grid.map((tile: Tile, index: number) => {
    const items = tile.value.map((item, subIndex) => (
      <div className={styles.item + ' ' + (item.used ? styles.used : '')} key={index + subIndex}>
        {getSymbol(item.player)}
      </div>
    ));
    return (
      <div
        key={index}
        className={styles.cell + ' ' + (tile.value.length < 3 ? styles.notfull : '')}
        onClick={() => {
          if (!winner) {
            dispatch(playAt(index));
            socket.emit('ping', 'box clicked');
          }
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
      <div className={styles.subHeader}>Make 3 lines to win</div>
      {header}
      <div className={styles.grid}>
        <Lines />
        {tiles}
      </div>
      <Control />
    </div>
  );
}
