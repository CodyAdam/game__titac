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