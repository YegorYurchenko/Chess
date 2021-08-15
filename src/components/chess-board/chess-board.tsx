import { FC, useState, useContext, useEffect, useRef } from "react";
import { SelectedPiece, SelectedPiecePosition } from '../../types';
import Context from '../../context';
import { Colors } from '../../enums';
import { Pawn, Knight, Bishop, Rook, Queen, King } from '../../chessPiece';

const ChessBoard: FC = () => {
    const [currentSelectedPiece, setCurrentSelectedPiece] = useState<SelectedPiece>("NoOne"); // Текущая выбранная фигура
    const [currentSelectedPiecePosition, setCurrentSelectedPiecePosition] = useState<SelectedPiecePosition>("No"); // Текущая выбранная позиция на доске
    const [availableSpaces, setAvailableSpaces] = useState<SelectedPiecePosition[]>([]); // Список доступных ходов для выбранной фигуры
    const { selectedColor, chessBoard, activeColor, movePiece } = useContext(Context);

    const chessPieceList = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const chessPieceListElement = chessPieceList.current;
        chessPieceListElement?.addEventListener("click", onChessPieceListClick);

        return () => {
            chessPieceListElement?.removeEventListener("click", onChessPieceListClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelectedPiece, availableSpaces]);

    /**
     * Обрабатываем каждое нажатие на шахматную доску
     * @param {Event} e - событие клика мыши
     * @return {void}
     */
    const onChessPieceListClick = (e: Event) => {
        const selectedChessItem = e.target as Element;

        // Если это фигура - то делаем её активной, иначе - делаем ход
        if (selectedChessItem.classList.contains("js-chess-piece")) {
            selectNewPiece(selectedChessItem as HTMLImageElement);
        } else {
            // Если выбранная позиция входит в список доступных ходов
            if (availableSpaces.includes(selectedChessItem.id as SelectedPiecePosition)) {
                moveToEmptySpace(selectedChessItem as HTMLLIElement);
            }
        }
    };

    /**
     * Запоминаем выбранное поле с фигурой активного цвета
     * @param {HTMLImageElement} selectedChessPiece - фигура, которую выбрал пользователь
     * @return {void}
     */
    const selectNewPiece = (selectedChessPiece: HTMLImageElement) => {
        const selectedChessPieceColor = selectedChessPiece.id.toLowerCase();

        if (selectedChessPieceColor.search(activeColor) >= 0) {
            const selectedChessPieceName: SelectedPiece = selectedChessPiece.id as SelectedPiece;
            const selectedChessPiecePosition: SelectedPiecePosition = selectedChessPiece.getAttribute('data-position') as SelectedPiecePosition;

            // Выбираем поле, фигуру и создаём список доступных ходов, НО если поле уже выбрано - сбросим выделения и очистим список
            if (selectedChessPiecePosition !== currentSelectedPiecePosition) {
                setCurrentSelectedPiecePosition(selectedChessPiecePosition);
                setCurrentSelectedPiece(selectedChessPieceName);
                setAvailableSpaces(getAvailableSpace(selectedChessPieceName, selectedChessPiecePosition));
            } else {
                setCurrentSelectedPiecePosition("No");
                setCurrentSelectedPiece("NoOne");
                setAvailableSpaces([]);
            }
        }
    };

    /**
     * Делаем ход на пустое поле
     * @return {void}
     */
    const moveToEmptySpace = (selectedEmptySpace: HTMLLIElement) => {
        if (currentSelectedPiecePosition.toLowerCase() !== "no") {
            const selectedEmptySpacePosition: SelectedPiecePosition = selectedEmptySpace.id as SelectedPiecePosition;

            // Делаем ход
            movePiece(currentSelectedPiecePosition, selectedEmptySpacePosition, currentSelectedPiece, chessBoard);

            // Обнуляем выбранную фигуру
            setCurrentSelectedPiecePosition("No");
            setCurrentSelectedPiece("NoOne");

            // Обнуляем выделенные возможные варианты хода
            setAvailableSpaces([]);
        }
    };
    
    /**
     * Получаем возможные ходы для выбранной фигуры
     * @param {SelectedPiece} selectedChessPieceName - название фигуры
     * @param {SelectedPiecePosition} selectedChessPiecePosition - положение фигуры
     * @return {SelectedPiecePosition[]} resultAvailableSpaces - список возможных ходов
     */
    const getAvailableSpace = (
        selectedChessPieceName: SelectedPiece,
        selectedChessPiecePosition: SelectedPiecePosition
    ): SelectedPiecePosition[] => {
        const chessPieceName = selectedChessPieceName
            .toLowerCase()
            .replace(/white/gi, "")
            .replace(/black/gi, "");

        let resultAvailableSpaces: SelectedPiecePosition[] = [];

        switch (chessPieceName) {
            case "pawn":
                resultAvailableSpaces = Pawn.getAvailableSpace(
                    selectedChessPiecePosition,
                    activeColor === selectedColor ? false : true,
                    chessBoard
                );
                break;
            case "knight":
                resultAvailableSpaces = Knight.getAvailableSpace(
                    selectedChessPiecePosition,
                    chessBoard
                );
                break;
            case "bishop":
                resultAvailableSpaces = Bishop.getAvailableSpace(
                    selectedChessPiecePosition,
                    chessBoard
                );
                break;
            case "rook":
                resultAvailableSpaces = Rook.getAvailableSpace(
                    selectedChessPiecePosition,
                    chessBoard
                );
                break;
            case "queen":
                resultAvailableSpaces = Queen.getAvailableSpace(
                    selectedChessPiecePosition,
                    chessBoard
                );
                break;
            case "king":
                resultAvailableSpaces = King.getAvailableSpace(
                    selectedChessPiecePosition,
                    chessBoard
                );
                break;
        }

        return resultAvailableSpaces;
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
                                {
                                    availableSpaces.includes(position.chessPosition as SelectedPiecePosition)
                                    &&
                                    <span className="chess-board__item-possible"></span>
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
