export type Sudoku = Array<Array<number>>;

export type Difficulty = "easy" | "medium" | "hard" | null;

export type Position = [number, number];

export interface StoreState {
  filledSudoku: Sudoku;
  playerSudoku: Sudoku;
  bkPlayerSudoku: Sudoku;
  incorrectFieldsArr: Position[];
  selected: [number, number] | [];
  fastModeEnabled: boolean;
  fastModeNum: number;
  history: { pos: Position; num: number }[];
  isSolved: boolean;
  difficulty: Difficulty;
  time: number;
  isPaused: boolean;
}
