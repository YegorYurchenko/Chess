/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Colors } from '../../enums/enums';
import Context from '../../context';

interface IStartPage {
    onSetColor(color: Colors): void;
    onSetStartGame(startGame: boolean): void;
}

const StartPage: FC<IStartPage> = ({ onSetColor, onSetStartGame }) => {
    const { selectedColor, startGame } = useContext(Context);
    const [colorSelected, setColorSelected] = useState<boolean>(false);

    const whiteBtn = useRef<HTMLButtonElement>(null);
    const blackBtn = useRef<HTMLButtonElement>(null);
    const submitBtn = useRef<HTMLButtonElement>(null);

    /**
     * ComponentDidMount - вешаем слушатели событий кликов по кнопкам выбора цвета
     * Update при изменении isPhone
     * 
     * @return {void}
     */
    useEffect(() => {
        const whiteBtnElement: HTMLButtonElement | null = whiteBtn.current;
        const blackBtnElement: HTMLButtonElement | null = blackBtn.current;
        const submitBtnElement: HTMLButtonElement | null = submitBtn.current;

        whiteBtnElement?.addEventListener("click", setWhiteColorBtn);
        blackBtnElement?.addEventListener("click", setBlackColorBtn);
        submitBtnElement?.addEventListener("click", SetStartGame);

        return () => {
            whiteBtnElement?.removeEventListener("click", setWhiteColorBtn);
            blackBtnElement?.removeEventListener("click", setBlackColorBtn);
            submitBtnElement?.removeEventListener("click", SetStartGame);
        };
    }, []);

    /**
     * Устанавливаем белый цвет фигур
     * @return {void}
     */
    const setWhiteColorBtn = () => {
        onSetColor(Colors.White);
        setColorSelected(true);
    };

    /**
     * Устанавливаем чёрный цвет фигур
     * @return {void}
     */
    const setBlackColorBtn = () => {
        onSetColor(Colors.Black);
        setColorSelected(true);
    };

    /**
     * Начинается игра
     * @return {void}
     */
    const SetStartGame = () => {
        onSetStartGame(true);
    };

    // Если цвет выбран, то активна соответствующая кнопка
    const whiteBtnClasses = ["start-page__btn start-page__btn_white"];
    const blackBtnClasses = ["start-page__btn start-page__btn_black"];

    if (selectedColor === Colors.White) {
        whiteBtnClasses.push(classes.active);
    } else if (selectedColor === Colors.Black) {
        blackBtnClasses.push(classes.active);
    }

    // Если цвет выбран, то кнопка Submit активна
    const submitBtnClasses = ["start-page__submit"];
    if (colorSelected) {
        submitBtnClasses.push(classes.active);
    }


    if (startGame) {
        return <Redirect to="/play" />;
    }

    return (
        <div className="start-page">
            <h1 className="start-page__title">Выберите цвет фигур</h1>
            <div className="start-page__color-btns">
                <button
                    ref={whiteBtn}
                    type="button"
                    className={whiteBtnClasses.join(" ")}>
                    Белые
                </button>
                <button
                    ref={blackBtn}
                    type="button"
                    className={blackBtnClasses.join(" ")}>
                    Чёрные
                </button>
            </div>
            <button
                ref={submitBtn}
                className={submitBtnClasses.join(" ")}>
                Подтвердить
            </button>
        </div>
    );
};


// Классы для CSS
const classes = {
    active: "active"
};

export default StartPage;
