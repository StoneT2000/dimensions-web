import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext'
import { TournamentProvider } from './contexts/tournament';

import SetupTournament from './containers/tournament';

import './styles/index.scss';

import MainPage from './pages/MainPage';
import DimensionPage from './pages/DimensionsPage';
import MatchPage from './pages/MatchPage';
import TournamentPage from './pages/TournamentPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import UploadBotPage from './pages/UploadBotPage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import { DIMENSION_ID, COOKIE_NAME, defaultUser, defaultTournament } from './configs';
import { message } from 'antd';

let cookie = getCookie(COOKIE_NAME);
function App() {
  const [user, setUser] = useState(defaultUser);
  const [tournament, setTournament] = useState(defaultTournament);
  
  useEffect(() => {
    console.log(cookie);
    if (cookie) {
      // verify cookie
      verifyToken(DIMENSION_ID, cookie).then(() => {
        setUser(getUserFromToken(cookie));
        message.success("Welcome back");
      });
    }
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <UserProvider value={{user: user, setUser: setUser}}>
            <Route path="/" exact component={MainPage} />
            <Route path="/dimensions" exact component={DimensionPage.DimensionsListPage} />
            <Route path="/dimensions/:id" exact component={DimensionPage} />
            <Route path="/dimensions/:id/register" exact component={RegisterPage} />
            <Route path="/dimensions/:id/login" exact component={LoginPage} />
            <Route path="/dimensions/:id/matches/:matchID" exact component={MatchPage} />

            <TournamentProvider value={{tournament: tournament, setTournament: setTournament}}>
              <Route 
                path="/dimensions/:id/tournaments/:tournamentID" 
                exact 
                render={() => <SetupTournament component={<TournamentPage />} />}
              />
              <Route path="/dimensions/:id/tournaments/:tournamentID/upload" exact 
                render={() => <SetupTournament component={<UploadBotPage />} />}
              />
            </TournamentProvider>
          </UserProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
