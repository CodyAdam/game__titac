import React, { useRef, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import styles from './Lines.module.css';

const H = 1000;
const W = 1000;

export type Direction = 'tr' | 'mr' | 'br' | 'lc' | 'mc' | 'rc' | 'brtl' | 'bltr';

interface DirectionLines {
  tr: { pt1: [-1, -1]; pt2: [1, -1]; values: Array<1 | 2> };
  mr: { pt1: [-1, 0]; pt2: [1, 0]; values: Array<1 | 2> };
  br: { pt1: [-1, 1]; pt2: [1, 1]; values: Array<1 | 2> };
  lc: { pt1: [-1, -1]; pt2: [-1, 1]; values: Array<1 | 2> };
  mc: { pt1: [0, -1]; pt2: [0, 1]; values: Array<1 | 2> };
  rc: { pt1: [1, -1]; pt2: [1, 1]; values: Array<1 | 2> };
  bltr: { pt1: [-1, 1]; pt2: [1, -1]; values: Array<1 | 2> };
  brtl: { pt1: [-1, -1]; pt2: [1, 1]; values: Array<1 | 2> };
}

const COEF: number = 365;
function sortLines(p1: Array<Direction>, p2: Array<Direction>): DirectionLines {
  const sorted: DirectionLines = {
    tr: { pt1: [-1, -1], pt2: [1, -1], values: [] },
    mr: { pt1: [-1, 0], pt2: [1, 0], values: [] },
    br: { pt1: [-1, 1], pt2: [1, 1], values: [] },
    lc: { pt1: [-1, -1], pt2: [-1, 1], values: [] },
    mc: { pt1: [0, -1], pt2: [0, 1], values: [] },
    rc: { pt1: [1, -1], pt2: [1, 1], values: [] },
    bltr: { pt1: [-1, 1], pt2: [1, -1], values: [] },
    brtl: { pt1: [-1, -1], pt2: [1, 1], values: [] },
  };

  p1.forEach((line: Direction) => {
    sorted[line].values.push(1);
  });
  p2.forEach((line: Direction) => {
    sorted[line].values.push(2);
  });
  return sorted;
}

export function Lines() {
  const p1 = useAppSelector((state) => state.board.present.score.p1);
  const p2 = useAppSelector((state) => state.board.present.score.p2);
  const lines = sortLines(p1, p2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const c = canvas.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, H, W);

    Object.keys(lines).forEach((dir): void => {
      const { pt1, pt2, values } = lines[dir as Direction];
      let [x1, y1] = pt1 as Array<number>;
      let [x2, y2] = pt2 as Array<number>;
      [x1, y1, x2, y2] = [x1 * COEF + W / 2, y1 * COEF + H / 2, x2 * COEF + W / 2, y2 * COEF + H / 2];

      const delta = 40;

      values.forEach((elem, index) => {
        c.beginPath();
        c.moveTo(
          x1 + (index - (values.length === 1 ? 0 : 1)) * delta * (dir === 'brtl' ? -1 : 1),
          y1 + (index - (values.length === 1 ? 0 : 1)) * delta,
        );
        c.lineWidth = 30;
        c.strokeStyle = elem === 1 ? '#FFF100' : '#0078D7';
        c.lineTo(
          x2 + (index - (values.length === 1 ? 0 : 1)) * delta * (dir === 'brtl' ? -1 : 1),
          y2 + (index - (values.length === 1 ? 0 : 1)) * delta,
        );
        c.closePath();
        c.stroke();
      });
    });
  });
  return <canvas ref={canvasRef} className={styles.canvas} height={H} width={W} />;
}
