import { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';
import Sound from '../../components/sound';
import ExitGame from '../../components/exit-game';
import ChessBoard from '../../components/chess-board';
import { Colors } from '../../enums';

interface IPlayPage {
    onSetSound(sound: boolean): void,
    onSetColor(color: Colors): void;
    onSetStartGame(startGame: boolean): void;
}

const PlayPage: FC<IPlayPage> = ({ onSetSound, onSetColor, onSetStartGame }) => {
    const { selectedColor, startGame } = useContext(Context);
    if (selectedColor && startGame) {
        return (
            <div className="play-page">
                <Sound
                    onSetSound={onSetSound}/>
                <ExitGame
                    onSetColor={onSetColor}
                    onSetStartGame={onSetStartGame}/>
                <ChessBoard />
            </div>
        );
    }

    return <Redirect to="/" />;
};

export default PlayPage;
