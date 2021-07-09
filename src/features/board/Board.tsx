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
  ) : present.fake ? (
    <h1 className={styles.header}>
      {`${getSymbol(turn)} place a `}
      <span className={styles.used}>{getSymbol(3)}</span>
    </h1>
  ) : (
    <h1 className={styles.header}>{`${getSymbol(turn)} place a ${getSymbol(turn)}`}</h1>
  );
  useEffect(() => {
    if (!present.received && socket && socket.connected) socket.emit('state', present);
  });

  const tiles = grid.map((tile: Tile, index: number) => {
    const items = tile.value.map((item, subIndex) => {
      const symbol: string = item.used ? getSymbol(3) : getSymbol(item.player);
      return (
        <div className={styles.item + ' ' + (item.used ? styles.used : '')} key={index + subIndex}>
          {symbol}
        </div>
      );
    });
    return (
      <div
        key={index}
        className={styles.cell + ' ' + (tile.value.length < 3 ? styles.notfull : '')}
        onClick={() => {
          if (!winner) {
            dispatch(playAt(index));
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
