import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { Tournament } from 'dimensions-ai';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getTournamentFromDimension } from '../../actions/dimensions';
import { getRanks } from '../../actions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Table, Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';
let intv: any;

const trueskillCols = [
  {
    title: 'Player Name',
    dataIndex: 'pname',
  },
  {
    title: 'Score = µ - 3 * σ',
    dataIndex: 'score',
    render: (info: any) => {
      let score = info.rankState.rating.mu - info.rankState.rating.sigma * 3;
      return (
        <span>{score}</span>
      )
    }
  },
  {
    title: 'Mu: µ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.mu
  },
  {
    title: 'Sigma: σ',
    dataIndex: 'score',
    render: (info: any) => info.rankState.rating.sigma
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
];
const winsCols = [
  {
    title: 'Player Name',
    dataIndex: 'pname',
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
  },
  {
    title: 'Ties',
    dataIndex: 'ties',
  },
  {
    title: 'Losses',
    dataIndex: 'losses',
  },
  {
    title: 'Points',
    dataIndex: 'points',
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
]
const eloCols = [
  {
    title: 'Player Name',
    dataIndex: 'pname',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    render: (info: any) => <span>{info.rankState.rating.score}</span>
  },
  {
    title: 'Matches Played',
    dataIndex: 'matchesPlayed'
  }
]


function TournamentPage(props: any) {
  const history = useHistory();
  let {user, setUser} = useContext(UserContext);
  const { tournament, setTournament } = useContext(TournamentContext);
  const params: any = useParams();
  // const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const [ranksystem, setRankSystem] = useState<Tournament.RankSystem>('trueskill');
  const [data, setData] = useState<any>([]);
  const update = () => {
    let rankSystem = tournament.configs.rankSystem;
    setRankSystem(rankSystem);

    getRanks(params.id, params.tournamentID).then((res) => {
      console.log(res);
      let newData = [];
      newData = res.map((info: any, ind: number) => {
        return {
          key: `${ind}`,
          pname: info.name,
          score: info,
          matchesPlayed: info.matchesPlayed
        }
      });
      setData(newData);
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
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, 'upload'));
        }}>Upload Bot</Button>
        <h4 className='meta-data-title'>Tournament Metadata</h4>
        {tournament && 
          [<p className='meta-data'>
            id: {tournament.id} <br />
            Status: {tournament.status}
            <br />
            Logging Level: {
              //@ts-ignore
              tournament.configs.loggingLevel
            } 
          </p>]
        }
        {
          tournament && user.admin && 
          <TournamentActionButton dimensionID={params.id} tournament={tournament} update={update}/>
        }
        
        { ranksystem === 'trueskill' && 
          <Table 
            columns={trueskillCols}
            dataSource={data}
          />
        }
        { ranksystem === 'elo' && 
          <Table 
            columns={eloCols}
            dataSource={data}
          />
        }
        { ranksystem === 'wins' && 
          <Table 
            columns={winsCols}
            dataSource={data}
          />
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentPage
