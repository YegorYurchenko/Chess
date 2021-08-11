import React from 'react';
import { Colors } from './enums/enums';

interface IContext {
    selectedColor: Colors;
    startGame: boolean;
}

const Context = React.createContext<IContext>({
    selectedColor: Colors.NoColor,
    startGame: false
});

export default Context;
