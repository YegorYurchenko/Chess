import { SelectedPiece, SelectedPiecePosition } from '../types';
import { IChessPieces } from '../interfaces';
import { ChessBoardPieces } from '../enums';


/**
 * Делаем ход на свободное поле и обновляем состояние доски
 * @param {SelectedPiecePosition} currentPiecePosition - позиция выбранной фигуры
 * @param {SelectedPiecePosition} moveToEmptySpacePosition - позиция, куда нужно переставить фигуру (пустое место на доске)
 * @param {SelectedPiece} chessPiece - выбранная фигура
 * @param {IChessPieces[][]} chessBoard - текущее отображение шахматной доски
 * @return {IChessPieces[][]} - новое отображение шахматной доски
 */
export const movePieceToEmptySpace = (
    currentPiecePosition: SelectedPiecePosition,
    moveToEmptySpacePosition: SelectedPiecePosition,
    chessPiece: SelectedPiece,
    chessBoard: IChessPieces[][]
): IChessPieces[][] => {
    const newChessBoard: IChessPieces[][] = JSON.parse(JSON.stringify(chessBoard));

    for (let i = 0; i < 8; i++) {
        chessBoard[i].map(chessBoardSpace => {
            if (chessBoardSpace.chessPosition === currentPiecePosition) {
                chessBoardSpace.chessPiece = ChessBoardPieces.NoOne;
            } else if (chessBoardSpace.chessPosition === moveToEmptySpacePosition) {
                chessBoardSpace.chessPiece = chessPiece;
            }
        });
    }

    return newChessBoard;
};