import { useReducer } from "react";
import genSudoku from "./utils/genSudoku";

import type { StoreState, Position, Difficulty } from "./types";

const reducer = (
  state: StoreState,
  action: { type: string; payload?: any },
) => {
  // Get an array of incorrectly filled fields (player mistakes)
  const getIncorrectFields = (): Position[] => {
    const { filledSudoku, playerSudoku, bkPlayerSudoku } = state;
    const incorrectFields: Position[] = [];

    bkPlayerSudoku.forEach((row, r) =>
      row.forEach((initialValue, c) => {
        const playerValue = playerSudoku[r][c];
        const correctValue = filledSudoku[r][c];

        if (playerValue === 0) return; // Skip if player did not fill that field
        if (initialValue !== 0) return; // Skip if it's not a changeable field

        // Compare player filled and correct value
        if (playerValue !== correctValue) {
          incorrectFields.push([r, c]);
        }
      }),
    );

    return incorrectFields;
  };

  // Get is field editable by position
  const getIsEditable = (pos: Position): boolean =>
    state.bkPlayerSudoku[pos[0]][pos[1]] === 0;

  switch (action.type) {
    case "RESET_STATE": {
      const emptySudoku = new Array(9).fill(new Array(9).fill(0));

      return {
        ...state,
        filledSudoku: emptySudoku,
        playerSudoku: emptySudoku,
        bkPlayerSudoku: emptySudoku,
        incorrectFieldsArr: [],
        selected: [] as [],
        history: [],
        isSolved: false,
        difficulty: null,
        time: 0,
        isPaused: false,
      };
    }

    case "START_SUDOKU": {
      const difficulty: Difficulty = action.payload;

      const [filledSudoku, playerSudoku] = genSudoku(difficulty);
      const bkPlayerSudoku = JSON.parse(JSON.stringify(playerSudoku));

      return {
        ...state,
        filledSudoku,
        playerSudoku,
        bkPlayerSudoku,
        incorrectFieldsArr: [],
        selected: [] as [],
        history: [],
        isSolved: false,
        time: 0,
        isPaused: false,
        difficulty,
      };
    }

    case "RESET_SUDOKU": {
      return {
        ...state,
        incorrectFieldsArr: [],
        selected: [],
        playerSudoku: state.bkPlayerSudoku,
      };
    }

    case "CLEAR_SELECTED": {
      return { ...state, incorrectFieldsArr: [], selected: [] };
    }

    case "SELECT_FIELD": {
      const pos = action.payload;

      // current number of the selected field, used to set the active fast mode number; if it is player editable field set it to null to prevent unintentional changes
      const selectedNum = getIsEditable(pos)
        ? null
        : state.playerSudoku[pos[0]][pos[1]];

      return {
        ...state,
        incorrectFieldsArr: [],
        selected: pos,
        fastModeNum:
          state.fastModeEnabled && selectedNum
            ? selectedNum
            : state.fastModeNum,
      };
    }

    case "DESELECT": {
      return { ...state, selected: [] as [] };
    }

    case "SET_SELECTED_FIELD_VALUE": {
      const { payload: newValue } = action;

      // Return if no field selected
      if (!state.selected || !state.selected.length) return state;

      // Prevent static (initially filled) fields from being updated
      if (state.bkPlayerSudoku[state.selected[0]][state.selected[1]])
        return state;

      // Prevent unnecessary moves
      const oldValue = state.playerSudoku[state.selected[0]][state.selected[1]];
      if (oldValue === newValue) return state;

      // Handle invalid value
      if (newValue < 0 || newValue > 9) {
        throw new Error("Invalid value set to field");
      }

      return {
        ...state,
        history: [...state.history, { pos: state.selected, num: oldValue }],
        playerSudoku: state.playerSudoku.map((row, r) =>
          row.map((col, c) =>
            r === state.selected[0] && c === state.selected[1] ? newValue : col,
          ),
        ),
      };
    }

    case "UNDO_MOVE": {
      if (state.history.length === 0) return state; // Return if history does not exist

      const { pos, num } = state.history[state.history.length - 1]; // Get last move position and value

      return {
        ...state,
        history: state.history.slice(0, -1),
        playerSudoku: state.playerSudoku.map((row, r) =>
          row.map((col, c) => (r === pos[0] && c === pos[1] ? num : col)),
        ),
      };
    }

    case "VALIDATE_PLAYER_FIELDS": {
      // Get all incorrectly filled fields
      const incorrectFieldsArr = getIncorrectFields();

      // Check if sudoku is correctly solved, if it is return state with isSolved set to true
      // Check if any invalid fields are found
      if (incorrectFieldsArr.length === 0) {
        if (
          // Check if any unfilled fields are found
          state.playerSudoku.find(
            (row) => row.find((field) => field === 0) === 0,
          ) === undefined
        ) {
          return { ...state, isSolved: true };
        }
      }

      return { ...state, incorrectFieldsArr };
    }

    case "SET_FASTMODE_NUM": {
      return { ...state, fastModeNum: action.payload };
    }

    case "TOGGLE_FASTMODE": {
      return { ...state, fastModeEnabled: !state.fastModeEnabled };
    }

    case "SET_TIME": {
      return { ...state, time: action.payload };
    }

    case "TOGGLE_PAUSE": {
      if (state.isSolved || !state.difficulty) return state; // Prevent pausing if game isn't in progress
      return { ...state, isPaused: !state.isPaused };
    }

    default:
      return state;
  }
};

export default function Store() {
  const emptySudoku = new Array(9).fill(new Array(9).fill(0));

  const [state, dispatch] = useReducer(reducer, {
    filledSudoku: emptySudoku, // solved sudoku
    playerSudoku: emptySudoku, // unsolved sudoku (for player to solve)
    bkPlayerSudoku: emptySudoku, // backup initial state of sudoku
    incorrectFieldsArr: [], // array of incorrectly filled fields by player
    selected: [], // position of selected field
    fastModeEnabled: false, // fast mode enabled boolean
    fastModeNum: 0, // selected number to fill with (when fast mode is enabled)
    history: [], // array of previous changed fields and their values
    isSolved: false, // is solved boolean
    difficulty: null, // sudoku difficulty (dictates how many fields are unsolved)
    time: 0, // final time provided by timer component when paused or finished game
    isPaused: false, // is paused boolean
  });

  return { state, dispatch };
}
