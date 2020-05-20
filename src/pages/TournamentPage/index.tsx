import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getMatches } from '../../actions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';
import MatchList from '../../components/MatchList';

function TournamentPage() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { tournament } = useContext(TournamentContext);
  const [matches, setMatches] = useState<Array<any>>([]);
  const params: any = useParams();
  // const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const update = () => {
    // let rankSystem = tournament.configs.rankSystem;

    getMatches(params.id, params.tournamentID).then((res) => {
      let sorted = Object.values(res).sort((a, b) => {
        return (new Date(a.creationDate)).getTime() - (new Date(b.creationDate).getTime());
      })
      setMatches(sorted);
    });
  }
  useEffect(() => {
    update();
  }, [tournament, params.id, params.tournamentID]);
  return (
    <DefaultLayout>
      <div className='TournamentPage'>
        <br />
        <BackLink to='../../'/>
        <h2>{tournament.name}</h2>
        <Link className='ranks-link' to={
          path.join(history.location.pathname, 'ranks')
        }>Current Ranks</Link>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, 'upload'));
        }}>Upload Bot</Button>
        <h4 className='meta-data-title'>Tournament Metadata</h4>
        {tournament && 
          <p className='meta-data'>
            id: {tournament.id} <br />
            Status: {tournament.status}
            <br />
            Logging Level: {
              //@ts-ignore
              tournament.configs.loggingLevel
            } 
          </p>
        }
        {
          tournament && user.admin && 
          <TournamentActionButton dimensionID={params.id} tournament={tournament} update={update}/>
        }
        <h3>Ongoing Matches in Tournament</h3>
        {
          <MatchList
            matches={matches}
          />
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentPage
