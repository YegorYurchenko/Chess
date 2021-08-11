import React from 'react';
import { Colors } from './enums/enums';

interface IContext {
    selectedColor: Colors;
}

const Context = React.createContext<IContext>({ selectedColor: Colors.NoColor });

export default Context;
