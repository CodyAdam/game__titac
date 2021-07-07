import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Direction } from './Lines';

export interface BoardState {
  score: { p1: Array<Direction>, p2: Array<Direction> }
  turn: 1 | 2
  winner: false | 1 | 2
  grid: Array<Tile>
}

export interface Tile {
  slotsIndex: number,
  value: Array<Item>
}

export interface Item { used: boolean, player: 1 | 2 }

const MAX_PER_TILE = 3;
const SCORE_TO_WIN = 3;

const initialState: BoardState = {
  score: { p1: [], p2: [] },
  turn: Math.random() < 0.5 ? 1 : 2,
  winner: false,
  grid: [
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
    { slotsIndex: 0, value: [] },
  ]
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    playAt: (state, action: PayloadAction<number>) => {
      const cell = action.payload;
      const player = state.turn;
      if (state.grid[cell].slotsIndex < MAX_PER_TILE) {
        state.grid[cell].slotsIndex++;
        state.grid[cell].value.push({ used: false, player });
        state.turn = player === 1 ? 2 : 1;
        const { score, grid } = getScoreGrid(state);
        state.score = score;
        state.grid = grid;
        state.winner = getWinner(state);
      }
    },
    reset: (state, action: PayloadAction<1 | 2>) => {
      state = { ...initialState }
      state.turn = action.payload;
      return state
    }
  }
});

export const { playAt, reset } = boardSlice.actions;

export const selectGrid = (state: RootState) => state.board.present.grid;

export default boardSlice.reducer;

// HELPERS

function getScoreGrid(state: BoardState): { score: { p1: Array<Direction>, p2: Array<Direction> }, grid: Array<Tile> } {
  const p1: Array<Direction> = state.score.p1;
  const p2: Array<Direction> = state.score.p2;
  let grid = state.grid;

  const lines: Array<{ name: Direction, indices: Array<number> }> = [{ name: "tr", indices: [0, 1, 2] },
  { name: "mr", indices: [3, 4, 5] },
  { name: "br", indices: [6, 7, 8] },
  { name: "lc", indices: [0, 3, 6] },
  { name: "mc", indices: [1, 4, 7] },
  { name: "rc", indices: [2, 5, 8] },
  { name: "brtl", indices: [0, 4, 8] },
  { name: "bltr", indices: [6, 4, 2] }
  ];

  lines.forEach(({ name, indices }) => {
    const lineFound = getLine(grid, indices);
    if (lineFound) {
      grid = setUsed(grid, indices, lineFound);
      if (lineFound === 1)
        p1.push(name);
      else p2.push(name)
    }
  })
  return { score: { p1, p2 }, grid };
}
function setUsed(grid: Array<Tile>, indices: Array<number>, player: 1 | 2): Array<Tile> {
  console.log("SetUsed Called");

  indices.forEach(index => {
    for (let i = 0; i < grid[index].value.length; i++) {
      const item = grid[index].value[i];
      if (item.player === player && !item.used) {
        console.log("         Used set to true at : " + index + "  " + i);

        grid[index].value[i].used = true
        break;
      }
    }
  })
  return grid;
}

function getLine(grid: Array<Tile>, indices: Array<number>,): false | 1 | 2 {
  const tiles: Array<Tile> = []
  indices.forEach(index => tiles.push(grid[index]));

  //check 1
  let found = true;
  tiles.forEach((tile) => {
    if (tile.slotsIndex === 0) found = false;

    if (!tile.value.find((item) => !item.used && item.player === 1))
      found = false;
  })
  if (found) return 1;

  //check 2
  found = true;
  tiles.forEach((tile) => {
    if (tile.slotsIndex === 0) found = false;

    if (!tile.value.find((item) => !item.used && item.player === 2))
      found = false;
  })
  if (found) return 2;


  return false;
}

function getWinner(state: BoardState): false | 1 | 2 {
  if (state.score.p1.length >= SCORE_TO_WIN)
    return 1;
  else if (state.score.p2.length >= SCORE_TO_WIN)
    return 2
  else return false;
}

export function getSymbol(player: 1 | 2): string {
  if (player === 1) return '🟡';
  else if (player === 2) return '🔵';
  else return '?';
}