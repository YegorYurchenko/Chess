/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../../enums/enums';
import Context from '../../context';

interface IStartPage {
    onSetColor(color: Colors): void;
}

const StartPage: FC<IStartPage> = ({ onSetColor }) => {
    const phoneWidth = 481;

    const { selectedColor } = useContext(Context);
    const [colorSelected, setColorSelected] = useState<boolean>(false);
    const [isPhone, setIsPhone] = useState<boolean>(window.innerWidth < phoneWidth);

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
        window.addEventListener("resize", windowResizeHandler);

        return () => {
            whiteBtnElement?.removeEventListener("click", setWhiteColorBtn);
            blackBtnElement?.removeEventListener("click", setBlackColorBtn);
            window.removeEventListener("resize", windowResizeHandler);
        };
    }, [isPhone]);

    /**
     * Устанавливаем белый цвет фигур
     * @return {void)
     */
    const setWhiteColorBtn = () => {
        onSetColor(Colors.White);
        setColorSelected(true);
    };

    /**
     * Устанавливаем чёрный цвет фигур
     * @return {void)
     */
    const setBlackColorBtn = () => {
        onSetColor(Colors.Black);
        setColorSelected(true);
    };

    /**
     * Изменение ширины экрана - если это телефон, то приложение не работает
     * @return {void)
     */
    const windowResizeHandler = () => {
        if (window.innerWidth < phoneWidth) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
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

    if (isPhone) {
        return <h1 className="start-page__phone-title">К сожалению, на телефоне приложение не работает</h1>;
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