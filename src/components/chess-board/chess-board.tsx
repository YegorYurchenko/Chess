import { FC, useContext } from "react";
import Context from '../../context';
import { Colors } from '../../enums/enums';

const ChessBoard: FC = () => {
    const { selectedColor, chessBoard } = useContext(Context);

    const chessBoardClasses = ["chess-board__list"];
    const chessBoardColumnClasses = ["chess-board__column"];
    const chessBoardRowClasses = ["chess-board__row"];
    
    // Если выбран чёрный цвет фигур, то перевернём доску
    if (selectedColor === Colors.Black) {
        chessBoardClasses.push(classes.reverse);
        chessBoardColumnClasses.push(classes.reverse);
        chessBoardRowClasses.push(classes.reverse);
    }

    return (
        <div className="chess-board">
            <ul className={chessBoardClasses.join(" ")}>
                {chessBoard.map(row => {
                    return row.map(position => (
                        <li key={position.chessPosition} className="chess-board__item">
                            {position.chessPiece && <img src={`/images/${position.chessPiece}.png`} alt={position.chessPiece} className="chess-board__item-piece-img" />}
                        </li>
                    ));
                })}
            </ul>
            <span className={chessBoardColumnClasses.join(" ")}>
                {[8, 7, 6, 5, 4, 3, 2, 1].map(item => <span key={`column-${item}`} className="chess-board__column-item">{item}</span>)}
            </span>
            <span className={chessBoardRowClasses.join(" ")}>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map(item => <span key={`row-${item}`} className="chess-board__row-item">{item}</span>)}
            </span>
        </div>
    );
};

// Классы для CSS
const classes = {
    reverse: "reverse"
};

export default ChessBoard;
