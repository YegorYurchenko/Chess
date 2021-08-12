import React from 'react';
import { Colors } from './enums/enums';
import { IChessPieces } from './interfaces';
import { resultChessPieces } from './utils/getChessBoard';

interface IContext {
    selectedColor: Colors;
    startGame: boolean;
    chessBoard: IChessPieces[][];
}

const Context = React.createContext<IContext>({
    selectedColor: Colors.NoColor,
    startGame: false,
    chessBoard: resultChessPieces
});

export default Context;
