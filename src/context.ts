import React from 'react';
import { Colors } from './enums/enums';
import { IChessPieces } from './interfaces';
import { ChessPieces } from '../src/utils';

interface IContext {
    selectedColor: Colors;
    startGame: boolean;
    chessBoard: IChessPieces[];
}

const Context = React.createContext<IContext>({
    selectedColor: Colors.NoColor,
    startGame: false,
    chessBoard: ChessPieces
});

export default Context;
