import { IChessPieces } from '../interfaces';
import insertChessPieces from './insertChessPieces';

/**
 * Получаем шахматную доску с начальным расположением фигур
 * @param {boolean} reverse - повернуть доску? (если первые ходят чёрные фигуры)
 * @return {IChessPieces[][]} resultChessBoard
 */
const getResultChessBoard = (reverse = false): IChessPieces[][] => {
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

    let resultChessBoard = insertChessPieces(JSON.parse(JSON.stringify(chessPieces)));

    if (reverse) {
        resultChessBoard = JSON.parse(JSON.stringify(resultChessBoard)).reverse();
    }

    return resultChessBoard;
};

export default getResultChessBoard;
