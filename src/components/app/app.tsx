import { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { SelectedPiece, SelectedPiecePosition } from '../../types';
import { movePieceToEmptySpace } from '../../utils/moveChessPiece';
import getResultChessBoard from '../../utils/getChessBoard';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';
import { IChessPieces } from '../../interfaces';
import { Pawn } from '../../chessPiece';
import { Colors } from '../../enums';
import Context from '../../context';

// Максимальная ширина телефона
const phoneWidth = 481;

const App:FC = () => {
    const [isPhone, setIsPhone] = useState<boolean>(window.innerWidth < phoneWidth); // Приложение открыто с телефона?
    const [startGame, setStartGame] = useState<boolean>(false); // Игра активна или нет?
    const [sound, setSound] = useState<boolean>(true); // Включен звук ходов?
    const [selectedColor, setSelectedColor] = useState<Colors>(Colors.NoColor); // Выбранный цвет фигур
    const [chessBoard, setChessBoard] = useState<IChessPieces[][]>([]); // Доска с фигурами
    const [activeColor, setActiveColor] = useState<Colors>(Colors.NoColor); // Цвет фигуры, которая должна сделать ход

    /**
     * Поворачиваем доску нужной стороной в зависимости от выбранного цвета фигур
     * @return {void}
     */
    useEffect(() => {
        if (selectedColor === Colors.White) {
            setChessBoard(getResultChessBoard());
        } else {
            setChessBoard(getResultChessBoard(true));
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

    /**
     * Выбор цвета фигур
     * @param {Colors} color - выбранный цвет фигур
     * @return {void}
     */
    const onSetColor = (color: Colors): void => {
        setSelectedColor(color);
        setActiveColor(color);
    };

    /**
     * Начало/завершение игры
     * @param {boolean} startGame - игра в процессе?
     * @return {void}
     */
    const onSetStartGame = (startGame: boolean): void => {
        setStartGame(startGame);
    };

    /**
     * Включить/отключить звуки ходов фигур
     * @param {boolean} sound - включить звук?
     * @return {void}
     */
    const onSetSound = (sound: boolean): void => {
        setSound(sound);
    };

    /**
     * Включить/отключить звуки ходов фигур
     * @param {boolean} sound - включить звук?
     * @return {void}
     */
    const onExitGame = (): void => {
        setStartGame(false);
        setSound(true);
        setSelectedColor(Colors.NoColor);
        setChessBoard(getResultChessBoard());
        setActiveColor(Colors.NoColor);
        Pawn.movedPawns = new Set();
    };

    /**
     * Делаем ход на свободное поле и обновляем состояние доски
     * @param {SelectedPiecePosition} currentPiecePosition - позиция выбранной фигуры
     * @param {SelectedPiecePosition} moveToEmptySpacePosition - позиция, куда нужно переставить фигуру (пустое место на доске)
     * @param {SelectedPiece} chessPiece - выбранная фигура
     * @param {IChessPieces[][]} chessBoard - текущее отображение шахматной доски
     * @return {IChessPieces[][]} - новое отображение шахматной доски
     */
    const movePiece = (
        currentPiecePosition: SelectedPiecePosition,
        moveToEmptySpacePosition: SelectedPiecePosition,
        chessPiece: SelectedPiece,
        chessBoard: IChessPieces[][]
    ): IChessPieces[][] => {
        // Переключаем цвет для передачи хода сопернику
        if (activeColor === Colors.White) {
            setActiveColor(Colors.Black);
        } else {
            setActiveColor(Colors.White);
        }

        return movePieceToEmptySpace(
            currentPiecePosition,
            moveToEmptySpacePosition,
            chessPiece,
            chessBoard
        );
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
            <Context.Provider value={{ selectedColor, sound, startGame, chessBoard, activeColor, movePiece }}>
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
                                    onSetSound={onSetSound}
                                    onExitGame={onExitGame}/>
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
