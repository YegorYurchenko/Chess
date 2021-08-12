import { FC } from "react";
import { Colors } from '../../enums/enums';

interface IExitGame {
    onSetColor(color: Colors): void;
    onSetStartGame(startGame: boolean): void;
}

const ExitGame: FC<IExitGame> = ({ onSetColor, onSetStartGame }) => {
    const onExitGame = () => {
        if (confirm("Вы уверены, что хотите выйти из игры?")) {
            onSetStartGame(false);
            onSetColor(Colors.NoColor);
        }
    };

    return (
        <span className="exit-game">
            <button
                className="exit-game__btn"
                onClick={onExitGame}>
                Выйти из игры
            </button>
        </span>
    );
};

export default ExitGame;
