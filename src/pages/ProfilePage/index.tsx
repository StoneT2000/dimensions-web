import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import DefaultLayout from "../../components/layouts/default";
import { useParams, useHistory } from 'react-router-dom';
import { downloadBot } from '../../actions/tournament';
import { Player } from 'dimensions-ai';
import { getUser } from '../../actions/dimensions';
import { Database } from 'dimensions-ai/lib/Plugin/Database';
import TournamentContext from '../../contexts/tournament';
import { Skeleton, Divider, Button, message } from 'antd';
import UserContext from '../../UserContext';

function ProfilePage() {
  const params: any = useParams();
  const history = useHistory();
  const [dbuser, setUser] = useState<Database.User>();
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState<any>({});
  const { tournament } = useContext(TournamentContext);
  // const [player, setPlayer] = useState<Player>();
  const [ranksystem, setRankSystem] = useState<string>();
  useEffect(() => {
    if (tournament.id) {
      setRankSystem(tournament.configs.rankSystem);
      let tourneyKey = tournament.name.replace(/ /g, "_") + "_" + tournament.id;
      getUser(params.id, params.userID).then((res) => {
        setUser(res);
        if (res.statistics) {
          let s = res.statistics![tourneyKey];
          setStats(s);
          console.log(s);
          // setPlayer(s.player);
        }
      }).catch((err) => {
        message.error('No permissions');
        history.push('../');
      })
    }
  }, [tournament]);
  return (
    <DefaultLayout>
      <div className='ProfilePage'>
        <h1>Profile page</h1>
        <h2>{dbuser?.username}</h2>
        <Divider></Divider>
        <div className="statistics">
          <h3>Statistics for Tournament: {tournament.name}</h3>
          <Skeleton loading={!stats.player}>
            <p>Matches Played with Current Bot: {stats.matchesPlayed}</p>
            { ranksystem === 'trueskill' && 
              <div>
                {stats.rankState && 
                [<p>Score (Mu - 3 * Sigma): {stats?.rankState.rating.mu - 3 * stats?.rankState.rating.sigma}</p>,
                  <p>Mu (µ): {stats?.rankState.rating.mu}</p>,
                  <p>Sigma (σ): {stats?.rankState.rating.sigma}</p>]
                }
              </div>
            }
            { ranksystem === 'elo' && 
              <div>
                {stats.rankState && 
                  <p>Score: {stats.rankState.score}</p>
                }
              </div>
            }
            { ranksystem === 'wins' && 
              <div>
                <p>Wins: {stats.wins}</p>
                <p>Ties: {stats.ties}</p>
                <p>Losses: {stats.losses}</p>
              </div>
            }
          </Skeleton>
        </div>
        {
          (dbuser?.playerID === user.id || user.admin) &&
          <div>
            <h3>User Actions</h3>
            <h4>Upload Bot</h4>
            <Button onClick={() => {
              history.push("../upload");
            }}>Upload</Button>
            <h4>Download Bot</h4>
            <Button onClick={() => {
              downloadBot(params.id, tournament.id, params.userID).then((url) => {
                window.open(url);
              }).catch((err) => {
                message.error(err.message);
              })
            }}>Download</Button>
          </div>
        }
      </div>
    </DefaultLayout>
  );
}

export default ProfilePage
