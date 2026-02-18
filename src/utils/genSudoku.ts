// type Sudoku = Array<Array<number>>;
import type { Sudoku, Difficulty } from "../types";

export default function main(difficulty: Difficulty): Sudoku[] {
  // Define number of fields to erase by difficulty argument - easy, hard or medium - if invalid erase none
  const removeQty =
    difficulty === "easy"
      ? 10
      : difficulty === "medium"
        ? 15
        : difficulty === "hard"
          ? 20
          : 0;

  // Generate solved sudoku
  const filledSudoku = genFilledSudoku();

  // Generate unsolved sudoku
  const playerSudoku = genPlayerSudoku(removeQty, filledSudoku);

  return [filledSudoku, playerSudoku];
}

// return a shuffled array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Generate shuffled 1 to 9 array
function genShuffledOneToNine(): Array<number> {
  const oneToNine = new Array(9).fill(0).map((_, i) => i + 1);
  return shuffleArray(oneToNine);
}

// Fill a 3x3 cube with numbers 1 to 9
function fill3x3(startPos: 0 | 3 | 6, sudoku: Sudoku): void {
  const shuffledOneToNine = genShuffledOneToNine();
  let oneToNineIterator = 0;

  for (let i = startPos; i < startPos + 3; i++) {
    for (let j = startPos; j < startPos + 3; j++) {
      sudoku[i][j] = shuffledOneToNine[oneToNineIterator];
      oneToNineIterator++;
    }
  }
}

// Get is value valid for a row
function isRowNewNumValid(row: number, num: number, sudoku: Sudoku): boolean {
  let isValid = true;

  for (let col = 0; col < 9; col++) {
    if (sudoku[row][col] === num) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

// Get is value valid for a column
function isColNewNumValid(col: number, num: number, sudoku: Sudoku): boolean {
  let isValid = true;

  for (let row = 0; row < 9; row++) {
    if (sudoku[row][col] === num) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

// Get is value valid for a 3x3 cube
function is3x3NewNumValid(
  row: number,
  col: number,
  num: number,
  sudoku: Sudoku,
): boolean {
  let isValid = true;

  const rStart = row - (row % 3);
  const cStart = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (sudoku[rStart + i][cStart + j] === num) {
        isValid = false;
        break;
      }
    }
  }

  return isValid;
}

// Get is value valid for a specific field
function isNewNumValid(
  row: number,
  col: number,
  num: number,
  sudoku: Sudoku,
): boolean {
  return (
    isRowNewNumValid(row, num, sudoku) &&
    isColNewNumValid(col, num, sudoku) &&
    is3x3NewNumValid(row, col, num, sudoku)
  );
}

// Brute force fill all empty fields until valid
function forceFill(row: number, col: number, sudoku: Sudoku): boolean {
  let r = row;
  let c = col + 1;

  while (sudoku[r][c] !== 0) {
    c++;
    if (c > 8) {
      c = 0;
      r++;
    }
    if (r > 8) return true;
  }

  const shuffledOneToNine = genShuffledOneToNine();
  for (let i = 0; i < 9; i++) {
    if (isNewNumValid(r, c, shuffledOneToNine[i], sudoku)) {
      sudoku[r][c] = shuffledOneToNine[i];

      if (forceFill(r, c, sudoku)) {
        return true;
      }

      sudoku[r][c] = 0;
    }
  }

  return false;
}

// Generate solved sudoku
function genFilledSudoku(): Sudoku {
  const filledSudoku: Sudoku = Array.from({ length: 9 }, () =>
    new Array(9).fill(0),
  );

  // Fill diagonal 3x3 (from top left to bottom right)
  fill3x3(0, filledSudoku);
  fill3x3(3, filledSudoku);
  fill3x3(6, filledSudoku);

  // Brute force fill rest of the fields
  forceFill(0, 0, filledSudoku);

  return filledSudoku;
}

// Return deep cloned and unsolved sudoku by x fields
function genPlayerSudoku(removeQty: number, sudoku: Sudoku): Sudoku {
  const getRand1To9 = () => Math.floor(Math.random() * 9);

  const playerSudoku = JSON.parse(JSON.stringify(sudoku)); // deep clone filled sudoku
  let removedCount = 0;

  while (removedCount < removeQty) {
    const row = getRand1To9();
    const col = getRand1To9();

    if (playerSudoku[row][col] !== 0) {
      playerSudoku[row][col] = 0;
      removedCount++;
    }
  }

  return playerSudoku;
}
