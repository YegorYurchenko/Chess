/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Colors } from './enums';
import { SelectedPiece, SelectedPiecePosition } from './types';
import { IChessPieces } from './interfaces';
import { resultChessPieces } from './utils/getChessBoard';

interface IContext {
    selectedColor: Colors;
    startGame: boolean;
    chessBoard: IChessPieces[][];
    activeColor: Colors;
    movePiece(
        currentPiecePosition: SelectedPiecePosition,
        moveToEmptySpacePosition: SelectedPiecePosition,
        chessPiece: SelectedPiece,
        chessBoard: IChessPieces[][]
    ): IChessPieces[][]
}

const Context = React.createContext<IContext>({
    selectedColor: Colors.NoColor,
    startGame: false,
    chessBoard: resultChessPieces,
    activeColor: Colors.NoColor,
    movePiece: () => (resultChessPieces)
});

export default Context;
