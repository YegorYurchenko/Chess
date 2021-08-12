import { ChessBoardPieces } from '../enums/enums';
import { IChessPieces } from '../interfaces';

/**
 * Добавим фигуры на доску (начальная позиция)
 * @param {IChessPieces[]} chessPieces - шахматная доска без фигур
 * @return {IChessPieces[]} chessPieces - шахматная доска с фигурами на начальных позициях
 */

const insertChessPieces = (chessPieces: IChessPieces[][]): IChessPieces[][] => {
    const newChessPieces = JSON.parse(JSON.stringify(chessPieces));

    // Пешки для белых фигур
    for (let i = 0; i < 8; i++) {
        newChessPieces[1][i].chessPiece = ChessBoardPieces.PawnWhite;
    }

    // Пешки для чёрных фигур
    for (let i = 0; i < 8; i++) {
        newChessPieces[6][i].chessPiece = ChessBoardPieces.PawnBlack;
    }

    // Белые Ладьи
    [newChessPieces[0][0], newChessPieces[0][7]].forEach(rook => rook.chessPiece = ChessBoardPieces.RookWhite);

    // Чёрные Ладьи
    [newChessPieces[7][0], newChessPieces[7][7]].forEach(rook => rook.chessPiece = ChessBoardPieces.RookBlack);

    // Белые Кони
    [newChessPieces[0][1], newChessPieces[0][6]].forEach(knight => knight.chessPiece = ChessBoardPieces.KnightWhite);

    // Чёрные Кони
    [newChessPieces[7][1], newChessPieces[7][6]].forEach(knight => knight.chessPiece = ChessBoardPieces.KnightBlack);

    // Белые Слоны
    [newChessPieces[0][2], newChessPieces[0][5]].forEach(bishop => bishop.chessPiece = ChessBoardPieces.BishopWhite);

    // Чёрные Слоны
    [newChessPieces[7][2], newChessPieces[7][5]].forEach(bishop => bishop.chessPiece = ChessBoardPieces.BishopBlack);

    // Белый Ферзь
    newChessPieces[0][3].chessPiece = ChessBoardPieces.QueenWhite;

    // Чёрный Ферзь
    newChessPieces[7][3].chessPiece = ChessBoardPieces.QueenBlack;

    // Белый Король
    newChessPieces[0][4].chessPiece = ChessBoardPieces.KingWhite;

    // Чёрный Король
    newChessPieces[7][4].chessPiece = ChessBoardPieces.KingBlack;

    return newChessPieces;
};

export default insertChessPieces;
