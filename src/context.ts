/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Colors } from './enums';
import { SelectedPiece, SelectedPiecePosition } from './types';
import { IChessPieces } from './interfaces';

interface IContext {
    selectedColor: Colors;
    sound: boolean,
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
    sound: true,
    startGame: false,
    chessBoard: [],
    activeColor: Colors.NoColor,
    movePiece: () => ([])
});

export default Context;
