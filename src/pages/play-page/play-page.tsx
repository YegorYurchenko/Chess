import { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';
import Sound from '../../components/sound';
import ExitGame from '../../components/exit-game';
import ChessBoard from '../../components/chess-board';

interface IPlayPage {
    onSetSound(sound: boolean): void,
    onExitGame(): void
}

const PlayPage: FC<IPlayPage> = ({ onSetSound, onExitGame }) => {
    const { selectedColor, startGame } = useContext(Context);
    if (selectedColor && startGame) {
        return (
            <div className="play-page">
                <Sound
                    onSetSound={onSetSound} />
                <ExitGame
                    onExitGame={onExitGame} />
                <ChessBoard />
            </div>
        );
    }

    return <Redirect to="/" />;
};

export default PlayPage;
