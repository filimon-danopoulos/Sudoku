import {
  OptionActions,
  CHANGE_DIFFICULTY,
  NEW_GAME,
  VALIDATE_SOLUTION,
  TOGGLE_CELL,
  SET_DIGIT,
  REMOVE_DIGIT,
  NAVIGATE_CELLS,
  DIRECTION,
  TOGGLE_NOTE_MODE,
  REDO,
  UNDO,
  MODE,
  TOGGLE_NIGHT_MODE,
  RESET_SUDOKU,
  FILL_CANDIDATES,
  CLEAR_CANDIDATES,
  TOGGLE_SETTING_USE_NOTES as TOGGLE_SETTING_NOTES_ENABLED,
  TOGGLE_SETTING_MARK_COMPLETED,
  TOGGLE_SETTING_PROGRESS,
  TOGGLE_EXIT_PROMPT,
} from './types';
import { DIFFICULTY } from '../models/Difficulty';

export function changeDifficulty(difficulty: DIFFICULTY): OptionActions {
  return {
    type: CHANGE_DIFFICULTY,
    payload: difficulty,
  };
}

export function createNewGame(): OptionActions {
  return {
    type: NEW_GAME,
  };
}

export function validateSolution(): OptionActions {
  return {
    type: VALIDATE_SOLUTION,
  };
}

export function toggleCell(row: number, column: number): OptionActions {
  return {
    type: TOGGLE_CELL,
    payload: {
      row,
      column,
    },
  };
}

export function setDigit(digit: number, force: boolean = false): OptionActions {
  return {
    type: SET_DIGIT,
    payload: {
      digit,
      force,
    },
  };
}

export function removeDigit(): OptionActions {
  return {
    type: REMOVE_DIGIT,
  };
}

export function navigateCells(direction: DIRECTION): OptionActions {
  return {
    type: NAVIGATE_CELLS,
    payload: {
      direction,
    },
  };
}

export function setMode(mode: MODE): OptionActions {
  return {
    type: TOGGLE_NOTE_MODE,
    payload: {
      mode,
    },
  };
}

export function undo(): OptionActions {
  return {
    type: UNDO,
  };
}

export function redo(): OptionActions {
  return {
    type: REDO,
  };
}

export function toggleNightMode(): OptionActions {
  return {
    type: TOGGLE_NIGHT_MODE,
  };
}

export function resetSudoku(): OptionActions {
  return {
    type: RESET_SUDOKU,
  };
}

export function fillCandidates(): OptionActions {
  return {
    type: FILL_CANDIDATES,
  };
}

export function clearCandidates(): OptionActions {
  return {
    type: CLEAR_CANDIDATES,
  };
}

export function toggleNotesEnabled(): OptionActions {
  return {
    type: TOGGLE_SETTING_NOTES_ENABLED,
  };
}

export function toggleMarkCompleted(): OptionActions {
  return {
    type: TOGGLE_SETTING_MARK_COMPLETED,
  };
}

export function toggleProgress(): OptionActions {
  return {
    type: TOGGLE_SETTING_PROGRESS,
  };
}

export function toggleExitPrompt(): OptionActions {
  return {
    type: TOGGLE_EXIT_PROMPT,
  };
}
