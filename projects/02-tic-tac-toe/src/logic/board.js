import { WINNER_COMBOS } from "../constants";

/**
 * The function checks if there is a winner in a tic-tac-toe board and returns the winning player ('X'
 * or 'O') or null if there is no winner.
 * @param boardToCheck - The parameter `boardToCheck` is an array representing the current state of a
 * tic-tac-toe board. It contains 9 elements, each representing a cell on the board. The elements can
 * be either "X", "O", or null (if the cell is empty). The function `
 * @returns The function `checkWinnerFrom` returns either the symbol ('X' or 'O') of the winner if
 * there is one, or `null` if there is no winner.
 */
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    // Revisamos todas las combinaciones ganadoras para ver si 'X' u 'O' ganó
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // Si no hay ganador
  return null;
};

/**
 * The function checks if every square in a given board is filled with a non-null value.
 * @returns The function `checkEndGame` is returning a boolean value. It checks if every square in the
 * `newBoard` array is not equal to `null`. If every square is not `null`, then it returns `true`,
 * indicating that the game has ended. If any square is `null`, then it returns `false`, indicating
 * that the game is still ongoing.
 */
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
