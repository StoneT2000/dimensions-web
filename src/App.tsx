import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './UserContext'
import { TournamentProvider } from './contexts/tournament';

import SetupTournament from './containers/tournament';

import './styles/index.scss';

import MainPage from './pages/MainPage';
import DimensionPage from './pages/DimensionsPage';
import MatchPage from './pages/MatchPage';
import TournamentRankingsPage from './pages/TournamentRankingsPage';
import TournamentPage from './pages/TournamentPage';
import TournamentMatchPage from './pages/TournamentMatchPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import UploadBotPage from './pages/UploadBotPage';
import ProfilePage from './pages/ProfilePage';

import { getCookie } from './utils/cookie';
import { verifyToken, getUserFromToken } from './actions/auth';
import { DIMENSION_ID, COOKIE_NAME, defaultUser, defaultTournament } from './configs';
import { message } from 'antd';

let cookie = getCookie(COOKIE_NAME);
function App() {
  const [user, setUser] = useState(defaultUser);
  const [tournament, setTournament] = useState(defaultTournament);
  const [verifying, setVerifying] = useState(false);
  useEffect(() => {
    if (cookie) {
      // verify cookie
      verifyToken(DIMENSION_ID, cookie).then(() => {
        let u = getUserFromToken(cookie);
        setUser(u);
        message.success("Welcome back " + u.username);
      }).catch(() => {
      }).finally(() => {
        // setVerifying(false);
      })
    }
    else {
      // setVerifying(false);
    }
  }, []);
  return (
    <Router>
      <div>
        {
          !verifying && 
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
                <Route 
                  path="/dimensions/:id/tournaments/:tournamentID/ranks" 
                  exact 
                  render={() => <SetupTournament component={<TournamentRankingsPage />} />}
                />
                <Route 
                  path="/dimensions/:id/tournaments/:tournamentID/user/:userID" 
                  exact 
                  render={() => <SetupTournament component={<ProfilePage />} />}
                />
                <Route 
                  path="/dimensions/:id/tournaments/:tournamentID/match/:matchID" 
                  exact 
                  render={() => <SetupTournament component={<TournamentMatchPage />} />}
                />
                <Route path="/dimensions/:id/tournaments/:tournamentID/upload" exact 
                  render={() => <SetupTournament component={<UploadBotPage />} />}
                />
              </TournamentProvider>
            </UserProvider>
          </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
