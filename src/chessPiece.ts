import { ChessBoardPieces } from "./enums";
import { SelectedPiecePosition } from './types';
import { IChessPieces } from './interfaces';

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
        let row = 0; // Строка, где находится выбранная фигура
        let column = 0; // Столбец, где находится выбранная фигура

        // Найдём фигуру в массиве
        chessBoard.forEach((chessBoardRow, rowIdx) => {
            chessBoardRow.forEach((el, columnIdx) => {
                if (el.chessPosition === position) {
                    row = rowIdx;
                    column = columnIdx;
                }
            });
        });

        // Список доступных ходов
        const resultAvailableSpaces: SelectedPiecePosition[] = [];

        for (let i = 1; i <= 2; i++) {
            // Если ходит соперник, то инвертируем направление хода
            const possiblePawRowPosition = reverse ? chessBoard[row - i] : chessBoard[row + i];

            if (possiblePawRowPosition && possiblePawRowPosition[column].chessPiece === "") {
                resultAvailableSpaces.push(possiblePawRowPosition[column].chessPosition as SelectedPiecePosition);
            } else {
                break;
            }
        }

        return resultAvailableSpaces;
    }
}
