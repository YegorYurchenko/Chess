import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';
import { Colors } from '../../enums/enums';
import Context from '../../context';

const App = (): JSX.Element => {
    const [startGame, setStartGame] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<Colors>(Colors.NoColor);

    const onSetColor = (color: Colors): void => {
        setSelectedColor(color);
    };

    const onSetStartGame = (): void => {
        setStartGame(true);
    };

    return (
        <div className="app">
            <Context.Provider value={{ selectedColor, startGame }}>
                <Router>
                    <Switch>
                        <Route path="/"
                            render={() => (
                                <StartPage
                                    onSetColor={onSetColor}
                                    onSetStartGame={onSetStartGame} />
                            )}
                            exact />
                        <Route path="/play"
                            render={() => (
                                <PlayPage />
                            )}
                            exact />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </Context.Provider>
        </div>
    );
};

export default App;
