import { FC } from "react";

interface IExitGame {
    onExitGame(): void;
}

const ExitGame: FC<IExitGame> = ({ onExitGame }) => {
    const onExitGameHandler = () => {
        if (confirm("Вы уверены, что хотите выйти из игры?")) {
            onExitGame();
        }
    };

    return (
        <span className="exit-game">
            <button
                className="exit-game__btn"
                onClick={onExitGameHandler}>
                Выйти из игры
            </button>
        </span>
    );
};

export default ExitGame;
