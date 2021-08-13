import { FC, useState, useContext, useEffect, useRef } from "react";
import Context from '../../context';
import { Colors, ChessBoardPositions } from '../../enums/enums';

type SelectedPiecePosition = keyof typeof ChessBoardPositions;

const ChessBoard: FC = () => {
    const [currentSelectedPiecePosition, setCurrentSelectedPiecePosition] = useState<SelectedPiecePosition>("No");
    const { selectedColor, chessBoard, activeColor } = useContext(Context);

    const chessPieceList = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const chessPieceListElement = chessPieceList.current;
        chessPieceListElement?.addEventListener("click", onChessPieceListClick);

        return () => {
            chessPieceListElement?.removeEventListener("click", onChessPieceListClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelectedPiecePosition]);

    const onChessPieceListClick = (e: Event) => {
        const selectedChessItem = e.target as Element;
        let selectedChessPiece;

        if (selectedChessItem.classList.contains("js-chess-piece")) {
            selectedChessPiece = selectedChessItem;
        } else {
            return;
        }

        const selectedChessPieceColor = selectedChessPiece.id.toLowerCase();

        if (selectedChessPieceColor.search(activeColor) >= 0) {
            const selectedChessPiecePosition: SelectedPiecePosition = selectedChessPiece.getAttribute('data-position') as SelectedPiecePosition;

            if (selectedChessPiecePosition !== currentSelectedPiecePosition) {
                setCurrentSelectedPiecePosition(selectedChessPiecePosition);
            } else {
                setCurrentSelectedPiecePosition("No");
            }
        }
    };

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
            <ul className={chessBoardClasses.join(" ")} ref={chessPieceList}>
                {chessBoard.map(row => {
                    return row.map(position => {
                        const chessBoardItemClass = ["chess-board__item"];
                        if (currentSelectedPiecePosition === position.chessPosition) chessBoardItemClass.push("active");

                        return (
                            <li key={position.chessPosition} id={position.chessPosition} className={chessBoardItemClass.join(" ")}>
                                {
                                    position.chessPiece
                                    &&
                                    <img src={`/images/${position.chessPiece}.png`}
                                        alt={position.chessPiece}
                                        id={position.chessPiece}
                                        data-position={position.chessPosition}
                                        className="chess-board__item-piece-img js-chess-piece" />
                                }
                            </li>
                        );
                    });
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
    active: "active",
    reverse: "reverse"
};

export default ChessBoard;
