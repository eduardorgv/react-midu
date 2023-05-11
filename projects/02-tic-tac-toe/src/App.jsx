import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { Square } from "./components/Square";
import { TURNS } from "./constants.js";
import { useState } from "react";
import { WinnerModal } from "./components/WinnerModal";
import confetti from "canvas-confetti";
import { resetGameStorage, saveGameToStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hay empate

  const updateBoard = (index) => {
    // Si en la posisión ya tiene un valor, o hay un ganador, no actualiza
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardamos la partida en el localstorage
    saveGameToStorage(newBoard, newTurn);

    // Revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
    
  };

  /**
   * The function resets the game by setting the board to null, the turn to X, and the winner to null.
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage();
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

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
