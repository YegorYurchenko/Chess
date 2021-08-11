/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../../enums/enums';

interface IStartPage {
    onSetColor(color: Colors): void;
}

const StartPage: FC<IStartPage> = ({ onSetColor }) => {
    const [colorSelected, setColorSelected] = useState<boolean>(false);

    const whiteBtn = useRef<HTMLButtonElement>(null);
    const blackBtn = useRef<HTMLButtonElement>(null);

    /**
     * ComponentDidMount - вешаем слушатели событий кликов по кнопкам выбора цвета
     * @return {void)
     */
    useEffect(() => {
        const whiteBtnElement: HTMLButtonElement | null = whiteBtn.current;
        const blackBtnElement: HTMLButtonElement | null = blackBtn.current;

        whiteBtnElement?.addEventListener("click", setWhiteColorBtn);
        blackBtnElement?.addEventListener("click", setBlackColorBtn);

        return () => {
            whiteBtnElement?.removeEventListener("click", setWhiteColorBtn);
            blackBtnElement?.removeEventListener("click", setBlackColorBtn);
        };
    }, []);

    /**
     * Устанавливаем белый цвет фигур
     * @return {void)
     */
    const setWhiteColorBtn = () => {
        onSetColor(Colors.White);
        whiteBtn.current?.classList.add(classes.active);
        blackBtn.current?.classList.remove(classes.active);
        setColorSelected(true);
    };

    /**
     * Устанавливаем чёрный цвет фигур
     * @return {void)
     */
    const setBlackColorBtn = () => {
        onSetColor(Colors.Black);
        blackBtn.current?.classList.add(classes.active);
        whiteBtn.current?.classList.remove(classes.active);
        setColorSelected(true);
    };

    // Если цвет выбран, то кнопка Submit активна
    const submitBtnClasses = ["start-page__submit"];
    if (colorSelected) submitBtnClasses.push("active");

    return (
        <div className="start-page">
            <h1 className="start-page__title">Выберите цвет фигур</h1>
            <div className="start-page__color-btns">
                <button
                    ref={whiteBtn}
                    type="button"
                    className="start-page__btn start-page__btn_white">
                    Белые
                </button>
                <button
                    ref={blackBtn}
                    type="button"
                    className="start-page__btn start-page__btn_black">
                    Чёрные
                </button>
            </div>
            <Link
                to="/play"
                className={submitBtnClasses.join(" ")}>
                Подтвердить
            </Link>
        </div>
    );
};


// Классы для CSS
const classes = {
    active: "active"
};

export default StartPage;
