import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { Player, Match } from 'dimensions-ai';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getTournamentFromDimension } from '../../actions/dimensions';
import { getRanks, getMatchQueue, getMatches } from '../../actions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';
import MatchList from '../../components/MatchList';
let intv: any;

const matchCols = [
  {
    title: 'Players',
    dataIndex: 'players',
    render: (info: any) => {
      return (
        <div>
          {
            info.map((a: any) => {
              return <Link className='profile-link' to={path.join(window.location.pathname, `user/${a.id}`)}>{a.name}</Link>
            })
          }
        </div>
      )
    }
  },
  {
    title: 'Creation Date',
    dataIndex: 'cdate',
    // render: (info: any) => <span>{info.rankState.rating.score}</span>
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Link',
    dataIndex: 'link',
    render: (link: string) => {
      return (
        <Link to={link}>
          <Button>
            View
          </Button>
        </Link>
      )
    }
  }
]


function TournamentPage(props: any) {
  const history = useHistory();
  let {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { tournament, setTournament } = useContext(TournamentContext);
  const [matches, setMatches] = useState<Array<any>>([]);
  const params: any = useParams();
  // const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const update = () => {
    let rankSystem = tournament.configs.rankSystem;

    getMatches(params.id, params.tournamentID).then((res) => {
      console.log(res);
      let newData = [];
      let sorted = Object.values(res).sort((a, b) => {
        return (new Date(a.creationDate)).getTime() - (new Date(b.creationDate).getTime());
      })
      setMatches(sorted);
      setLoading(false);
    });
  }
  useEffect(() => {
    update();
  }, [tournament]);
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
