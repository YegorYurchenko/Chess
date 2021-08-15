import { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';
import ExitGame from '../../components/exit-game';
import ChessBoard from '../../components/chess-board';
import { Colors } from '../../enums';

interface IPlayPage {
    onSetColor(color: Colors): void;
    onSetStartGame(startGame: boolean): void;
}

const PlayPage: FC<IPlayPage> = ({ onSetColor, onSetStartGame }) => {
    const { selectedColor, startGame } = useContext(Context);
    if (selectedColor && startGame) {
        return (
            <div className="play-page">
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
