import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import StartPage from '../../pages/start-page/start-page';
import PlayPage from '../../pages/play-page/play-page';

const App = (): JSX.Element => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/"
                        render={() => (
                            <StartPage />
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
        </div>
    );
};

export default App;
