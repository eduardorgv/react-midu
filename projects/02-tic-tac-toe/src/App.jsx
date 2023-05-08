import { Square } from "./Square";
import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hay empate

  const updateBoard = (index) => {
    // Si en la posisión ya tiene un valor, o hay un ganador, no actualiza
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Revisamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
    
  };

  const checkWinner = (boardToCheck) => {
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
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  /**
   * The function resets the game by setting the board to null, the turn to X, and the winner to null.
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó:"}</h2>

            {winner !== false && (
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
            )}

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
