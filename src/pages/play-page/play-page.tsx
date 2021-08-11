import { FC } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';

const PlayPage: FC = () => {
    const { selectedColor, startGame } = useContext(Context);
    if (selectedColor && startGame) {
        return (
            <div className="play-page">
                Play
            </div>
        );
    }

    return <Redirect to="/" />;
};

export default PlayPage;
