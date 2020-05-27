import React, {useState} from 'react';
import Square from './square';
import r2h from '../img/r2h.png';
import fellowship from '../img/fellowships.png';
import ResetButton from './resetButton';
const Board = () => {
    const initialBoard = Array(9).fill(null);
    const [squares, setSquares] = useState(initialBoard);
    const [playerXIsNext, setPlayerXIsNext] = useState(true);

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={()=> handleClick(i)} />
    }

    const handleClick= (i)=>{
        const newSquares=[...squares];
        const winnerDeclared = Boolean(calculateWinner(squares));
        const filledSquare= Boolean(newSquares[i])
        if (winnerDeclared || filledSquare) return

        newSquares[i]=playerXIsNext ? "X" : "O"

        //these two functions are the only way to change state
        setSquares(newSquares)
        //will change true to false and vice versa
        setPlayerXIsNext(!playerXIsNext)

    }

    const isBoardFull= (squares)=>{
        for (let i =0; i <squares.length;i++){
            if (squares[i]=== null){
                return false
            }
        }

        return true

    }

    const calculateWinner =(squares) => {
         /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
       const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]; // shows all of the winning combinations ("lines")
    //iteriate over  lines

    for(let line of lines){
        const [a,b,c]= line;
        if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
            return squares[a]
        }
    }
    return null;
    }

    const winner=calculateWinner(squares);

    const getStatus=()=>{
        if (winner){
            return "Congrats Player " + winner
        } else if (isBoardFull(squares)){
            return "DRAW"

        }
        else{
            return "Next player is " + (playerXIsNext ? "X" : "O")
        }
    }

    const resetGame=()=>{
        setSquares(initialBoard)
        setPlayerXIsNext(true)
    }
    return (
        <>
            <main className={`main--container 
           ${(winner && getStatus() === "Congrats Player " + winner ||
           !winner && getStatus() === "DRAW") ? 
           (getStatus() === "DRAW" ? "draw" : "winner") : (playerXIsNext ? "X" : "O")}`}>
                
                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">
                    {getStatus()}
                </div>
                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <ResetButton onClick={resetGame}/>
                </div>
            </main>
        </>
    )
}
export default Board;