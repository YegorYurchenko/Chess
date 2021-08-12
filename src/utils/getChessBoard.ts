import { IChessPieces } from '../interfaces';
import insertChessPieces from './insertChessPieces';

// Массив из 8 элементов (количество горизонтальных позиций на шахматной доске)
const rowChessPositions: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Начальная позиция фигур на шахматной доске
const chessPieces: IChessPieces[][] = [];

for (let i = 1; i < 9; i++) {
    const temporaryChessPieces: IChessPieces[] = [];
    for (let j = 0; j < 8; j++) {
        const chessPiecePosition = {
            chessPosition: `${rowChessPositions[j]}${i}`,
            chessPiece: ""
        };

        temporaryChessPieces.push(chessPiecePosition);
    }

    chessPieces.push(temporaryChessPieces);
}

// Начальная позиция фигур, если выбраны белые
export const resultChessPieces: IChessPieces[][] = insertChessPieces(JSON.parse(JSON.stringify(chessPieces)));

// Перевернём доску, если выбраны чёрные
export const resultChessPiecesReverse: IChessPieces[][] = JSON.parse(JSON.stringify(resultChessPieces)).reverse();

