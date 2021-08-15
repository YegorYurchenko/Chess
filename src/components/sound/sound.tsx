import { FC, useContext } from "react";
import Context from '../../context';
import soundOn from '../../svg/sound-on.svg';
import soundOff from '../../svg/sound-off.svg';

interface ISound {
    onSetSound(sound: boolean): void;
}

const Sound: FC<ISound> = ({ onSetSound }) => {
    const { sound } = useContext(Context);
    
    if (sound) {
        return (
            <button
                className="sound"
                onClick={() => onSetSound(false)}
            >
                <img className="sound__img" src={soundOn} alt="Звук включён" />
            </button>
        );
    }

    return (
        <button
            className="sound"
            onClick={() => onSetSound(true)}
        >
            <img className="sound__img" src={soundOff} alt="Звук выключен" />
        </button>
    );
};

export default Sound;
