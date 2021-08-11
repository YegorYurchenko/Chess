import { FC, useContext } from "react";
import Context from '../../context';

const ChessBoard: FC = () => {
    const { chessBoard } = useContext(Context);

    return (
        <div className="chess-board">
            <ul className="chess-board__list">
                {chessBoard.map(position => (
                    <li key={position.chessPosition} className="chess-board__item">
                        <span className="chess-board__item-inner">{position.chessPosition}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChessBoard;
