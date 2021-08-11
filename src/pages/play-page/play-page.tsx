import { FC } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context';

const PlayPage: FC = () => {
    const { selectedColor } = useContext(Context);

    if (selectedColor) {
        return <div>Play</div>;
    }

    return <Redirect to="/" />;
};

export default PlayPage;
