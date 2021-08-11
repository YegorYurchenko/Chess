import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';
import { Colors } from '../../enums/enums';
import Context from '../../context';

const App = (): JSX.Element => {
    const [selectedColor, setSelectedColor] = useState<Colors>(Colors.NoColor);

    const onSetColor = (color: Colors): void => {
        setSelectedColor(color);
    };

    return (
        <div className="app">
            <Context.Provider value={{ selectedColor }}>
                <Router>
                    <Switch>
                        <Route path="/"
                            render={() => (
                                <StartPage onSetColor={onSetColor} />
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
