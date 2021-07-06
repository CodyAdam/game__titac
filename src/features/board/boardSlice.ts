import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface BoardState {
  scoreToWin: number,
  score: { p1: Array<string>, p2: Array<string> }
  turn: 1 | 2
  winner: false | 1 | 2
  grid: Array<Tile>
}

export interface Tile {
  slotsIndex: number,
  value: Array<1 | 2>
}

function updateScore(state: BoardState): { p1: Array<string>, p2: Array<string> } {
  let p1: Array<string> = [];
  let p2: Array<string> = [];
  return { p1, p2 };
}

function getWinner(state: BoardState): false | 1 | 2 {
  if (state.score.p1.length >= state.scoreToWin)
    return 1;
  else if (state.score.p2.length >= state.scoreToWin)
    return 2
  else return false;
}

const initialState: BoardState = {
  scoreToWin: 1,
  score: { p1: [], p2: [] },
  turn: 1,
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
      if (state.grid[cell].slotsIndex < 3) {
        state.grid[cell].slotsIndex++;
        state.grid[cell].value.push(player);
        state.turn = player === 1 ? 2 : 1;
        state.winner = getWinner(state);
      }
    },
  }
});

export const { playAt } = boardSlice.actions;


export const selectGrid = (state: RootState) => state.board.present.grid;

export default boardSlice.reducer;