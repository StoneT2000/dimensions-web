import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext'
import './styles/index.scss';

import MainPage from './pages/MainPage';
import DimensionPage from './pages/DimensionsPage';
import MatchPage from './pages/MatchPage';
import TournamentPage from './pages/TournamentPage';

function App() {
  const [user, setUser] = useState({loggedIn: false});
  return (
    <Router>
      <div>
        <Switch>
          <UserProvider value={{user: user, setUser: setUser}}>
            <Route path="/" exact component={MainPage} />
            <Route path="/dimensions" exact component={DimensionPage.DimensionsListPage} />
            <Route path="/dimensions/:id" exact component={DimensionPage} />
            <Route path="/dimensions/:id/matches/:matchID" exact component={MatchPage} />
            <Route path="/dimensions/:id/tournaments/:tournamentID" exact component={TournamentPage} />
          </UserProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
