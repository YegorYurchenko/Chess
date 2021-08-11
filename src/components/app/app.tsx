import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';
import { Colors } from '../../enums/enums';
import Context from '../../context';
import { ChessPieces, ChessPiecesReverse} from '../../utils';
import { IChessPieces } from '../../interfaces';
import { useEffect } from 'react';

const App = (): JSX.Element => {
    const [startGame, setStartGame] = useState<boolean>(true);
    const [selectedColor, setSelectedColor] = useState<Colors>(Colors.White);
    const [chessBoard, setChessBoard] = useState<IChessPieces[]>(ChessPieces);

    /**
     * Поворачиваем доску нужной стороной в зависимости от выбранного цвета фигур
     * @return {void)
     */
    useEffect(() => {
        if (selectedColor === Colors.White) {
            setChessBoard(ChessPieces);
        } else {
            setChessBoard(ChessPiecesReverse);
        }
    }, [selectedColor]);

    const onSetColor = (color: Colors): void => {
        setSelectedColor(color);
    };

    const onSetStartGame = (startGame: boolean): void => {
        setStartGame(startGame);
    };

    return (
        <div className="app">
            <Context.Provider value={{ selectedColor, startGame, chessBoard }}>
                <Router>
                    <Switch>
                        <Route path="/"
                            render={() => (
                                <StartPage
                                    onSetColor={onSetColor}
                                    onSetStartGame={onSetStartGame} />
                            )}
                            exact />
                        <Route path="/play"
                            render={() => (
                                <PlayPage
                                    onSetColor={onSetColor}
                                    onSetStartGame={onSetStartGame}/>
                            )}
                            exact />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </Context.Provider>
        </div>
    );
};

export default App;
