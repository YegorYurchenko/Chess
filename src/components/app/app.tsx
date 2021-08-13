import { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';
import { IChessPieces } from '../../interfaces';
import { Colors } from '../../enums/enums';
import Context from '../../context';
import { resultChessPieces, resultChessPiecesReverse} from '../../utils/getChessBoard';

// Максимальная ширина телефона
const phoneWidth = 481;

const App:FC = () => {
    const [isPhone, setIsPhone] = useState<boolean>(window.innerWidth < phoneWidth); // Приложение открыто с телефона?
    const [startGame, setStartGame] = useState<boolean>(true); // Игра активна или нет?
    const [selectedColor, setSelectedColor] = useState<Colors>(Colors.White); // Выбранный цвет фигур
    const [chessBoard, setChessBoard] = useState<IChessPieces[][]>(resultChessPieces); // Доска с фигурами
    const [activeColor, setActiveColor] = useState<Colors>(Colors.White); // Цвет фигуры, которая должна сделать ход

    /**
     * Поворачиваем доску нужной стороной в зависимости от выбранного цвета фигур
     * @return {void}
     */
    useEffect(() => {
        if (selectedColor === Colors.White) {
            setChessBoard(resultChessPieces);
        } else {
            setChessBoard(resultChessPiecesReverse);
        }
    }, [selectedColor]);

    /**
     * ComponentDidMount - вешаем слушатель на resize окна
     * @return {void}
     */
    useEffect(() => {
        window.addEventListener("resize", windowResizeHandler);
    }, []);

    /**
     * Изменение ширины экрана - если это телефон, то приложение не работает
     * @return {void}
     */
    const windowResizeHandler = () => {
        if (window.innerWidth < phoneWidth) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
    };

    const onSetColor = (color: Colors): void => {
        setSelectedColor(color);
        setActiveColor(color);
    };

    const onSetStartGame = (startGame: boolean): void => {
        setStartGame(startGame);
    };


    if (isPhone) {
        return (
            <div className="app">
                <h1 className="app__phone-title">К сожалению, на телефоне приложение не работает</h1>
            </div>
        );
    }

    return (
        <div className="app">
            <Context.Provider value={{ selectedColor, startGame, chessBoard, activeColor }}>
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
