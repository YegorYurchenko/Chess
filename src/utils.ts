import { IChessPieces } from './interfaces';

// Массив из 8 элементов (количество горизонтальных позиций на шахматной доске)
const rowChessPositions: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Начальная позиция фигур на шахматной доске
export const ChessPieces: IChessPieces[] = [];

for (let i = 1; i < 9; i++) {
    for (let j = 0; j < 8; j++) {
        const chessPiecePosition = {
            chessPosition: `${rowChessPositions[j]}${i}`,
            chessPiece: ""
        };

        ChessPieces.push(chessPiecePosition);
    }
}

export const ChessPiecesReverse = [...ChessPieces].reverse();
