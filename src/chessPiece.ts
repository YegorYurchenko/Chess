import { ChessBoardPieces } from "./enums";
import { SelectedPiecePosition } from './types';
import { IChessPieces } from './interfaces';

enum diagonalMoveDirection {
    Right = 1,
    Left = -1
}

enum straightMoveDirection {
    No = 0,
    Right = 1,
    Left = -1
}

abstract class ChessPiece {
    constructor(
        protected type: ChessBoardPieces
    ) { }
}

export class Pawn extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.PawnWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        reverse: boolean,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        for (let i = 1; i <= 2; i++) {
            // Если ходит соперник, то инвертируем направление хода
            const possiblePawnRowPosition = reverse ? chessBoard[row - i] : chessBoard[row + i];

            if (possiblePawnRowPosition && possiblePawnRowPosition[column].chessPiece === "") {
                resultAvailableSpaces.push(possiblePawnRowPosition[column].chessPosition as SelectedPiecePosition);
            } else {
                break;
            }
        }

        return resultAvailableSpaces;
    }
}

export class Knight extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.KnightWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        [1, -1, 2, -2].forEach(pos1 => {
            const possibleKnightRowPosition = chessBoard[row + pos1];

            if (possibleKnightRowPosition) {
                [1, -1, 2, -2].forEach(pos2 => {
                    if (Math.abs(pos1) === Math.abs(pos2)) return;
                    
                    const possibleKnightPosition = possibleKnightRowPosition[column + pos2];

                    if (possibleKnightPosition && possibleKnightPosition.chessPiece === "") {
                        resultAvailableSpaces.push(possibleKnightPosition.chessPosition as SelectedPiecePosition);
                    }
                });
            }
        });

        return resultAvailableSpaces;
    }
}

export class Bishop extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.BishopWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Right, diagonalMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Right, diagonalMoveDirection.Left, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Left, diagonalMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Left, diagonalMoveDirection.Left, chessBoard));

        return resultAvailableSpaces;
    }
}

export class Rook extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.RookWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.No, straightMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.No, straightMoveDirection.Left, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.Right, straightMoveDirection.No, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.Left, straightMoveDirection.No, chessBoard));

        return resultAvailableSpaces;
    }
}

export class Queen extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.QueenWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        // Ходы по диагонали
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Right, diagonalMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Right, diagonalMoveDirection.Left, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Left, diagonalMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...diagonalMove(row, column, diagonalMoveDirection.Left, diagonalMoveDirection.Left, chessBoard));

        // Ходы по прямой
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.No, straightMoveDirection.Right, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.No, straightMoveDirection.Left, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.Right, straightMoveDirection.No, chessBoard));
        resultAvailableSpaces.push(...straightMove(row, column, straightMoveDirection.Left, straightMoveDirection.No, chessBoard));

        return resultAvailableSpaces;
    }
}

export class King extends ChessPiece {
    constructor() {
        super(ChessBoardPieces.KingWhite);
    }

    static getAvailableSpace(
        position: SelectedPiecePosition,
        chessBoard: IChessPieces[][]
    ): SelectedPiecePosition[] {
        // Найдём фигуру в массиве
        const [row, column] = getChessPiecePosition(position, chessBoard);

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        [0, 1, -1].forEach(pos1 => {
            const possibleKingRowPosition = chessBoard[row + pos1];

            if (possibleKingRowPosition) {
                [0, 1, -1].forEach(pos2 => {
                    const possibleKingPosition = possibleKingRowPosition[column + pos2];

                    if (possibleKingPosition && possibleKingPosition.chessPiece === "") {
                        resultAvailableSpaces.push(possibleKingPosition.chessPosition as SelectedPiecePosition);
                    }
                });
            }
        });

        return resultAvailableSpaces;
    }
}


/**
 * Поиск фигуры в массиве
 * @param {SelectedPiecePosition} position - позиция фигуры на доске
 * @param {IChessPieces[][]} chessBoard - доска
 * @return {number[]} строка и столбец массива
 */
const getChessPiecePosition = (
    position: SelectedPiecePosition,
    chessBoard: IChessPieces[][]
) => {
    let row = 0; // Строка, где находится выбранная фигура
    let column = 0; // Столбец, где находится выбранная фигура

    chessBoard.forEach((chessBoardRow, rowIdx) => {
        chessBoardRow.forEach((el, columnIdx) => {
            if (el.chessPosition === position) {
                row = rowIdx;
                column = columnIdx;
            }
        });
    });

    return [row, column];
};

/**
 * Поиск возможных ходов по выбранной диагонали
 * @param {number} row - cтрока, где находится выбранная фигура
 * @param {number} column - cтолбец, где находится выбранная фигура
 * @param {number} rowDirection - направление движение по диагонали (для строк)
 * @param {number} columnDirection - направление движение по диагонали (для столбцов)
 * @param {IChessPieces[][]} chessBoard - доска
 * @return {SelectedPiecePosition[]} массив возможных ходов по выбранному направлению диагонали
 */
const diagonalMove = (
    row: number,
    column: number,
    rowDirection: diagonalMoveDirection,
    columnDirection: diagonalMoveDirection,
    chessBoard: IChessPieces[][]
): SelectedPiecePosition[] => {
    const resultAvailableSpaces: SelectedPiecePosition[] = [];

    for (let pos = rowDirection; pos * rowDirection < 8; pos += rowDirection) {
        const possibleBishopRowPosition = chessBoard[row + pos];

        if (possibleBishopRowPosition) {
            const possibleBishopPosition = possibleBishopRowPosition[column + pos * columnDirection];

            if (possibleBishopPosition && possibleBishopPosition.chessPiece === "") {
                resultAvailableSpaces.push(possibleBishopPosition.chessPosition as SelectedPiecePosition);
            } else {
                break;
            }
        }
    }

    return resultAvailableSpaces;
};

/**
 * Поиск возможных ходов по выбранной прямой
 * @param {number} row - cтрока, где находится выбранная фигура
 * @param {number} column - cтолбец, где находится выбранная фигура
 * @param {number} rowDirection - направление движение по диагонали (для строк)
 * @param {number} columnDirection - направление движение по диагонали (для столбцов)
 * @param {IChessPieces[][]} chessBoard - доска
 * @return {SelectedPiecePosition[]} массив возможных ходов по выбранному направлению прямой
 */
const straightMove = (
    row: number,
    column: number,
    rowDirection: straightMoveDirection,
    columnDirection: straightMoveDirection,
    chessBoard: IChessPieces[][]
): SelectedPiecePosition[] => {
    const resultAvailableSpaces: SelectedPiecePosition[] = [];

    for (let pos = 1; pos < 8; pos++) {
        const possibleRookRowPosition = chessBoard[row + pos * rowDirection];

        if (possibleRookRowPosition) {
            const possibleRookPosition = possibleRookRowPosition[column + pos * columnDirection];

            if (possibleRookPosition && possibleRookPosition.chessPiece === "") {
                resultAvailableSpaces.push(possibleRookPosition.chessPosition as SelectedPiecePosition);
            } else {
                break;
            }
        }
    }

    return resultAvailableSpaces;
};
