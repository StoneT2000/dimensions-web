import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { Tournament, Logger } from 'dimensions-ai';
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
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
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
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
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
    title: 'User',
    dataIndex: 'username',
  },
  {
    title: 'Bot name',
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
  const [loading, setLoading] = useState(true);
  const [ updateTime, setUpdateTime ] = useState<Date>();
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
      let newData = [];
      newData = res.map((info: any, ind: number) => {
        return {
          key: `${ind}`,
          username: <Link to={`${path.join(window.location.pathname, `../user/${info.id}`)}`}>{info.player.username}</Link>,
          pname: info.name,
          score: info,
          matchesPlayed: info.matchesPlayed
        }
      });
      setData(newData);
      setLoading(false);
      setUpdateTime(new Date());
    });
  }
  useEffect(() => {
    update();
  }, [tournament]);
  return (
    <DefaultLayout>
      <div className='TournamentRankingsPage'>
        <br />
        <BackLink to='../'/>
        <h2>{tournament.name}</h2>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, '../upload'));
        }}>Upload Bot</Button>
        <Button className='refresh-btn' onClick={() => {
          update();
        }}>Refresh Leaderboard</Button>
        <br />
        <br />
        {
          tournament && user.admin && 
          <TournamentActionButton dimensionID={params.id} tournament={tournament} update={update}/>
        }
        
        { ranksystem === 'trueskill' && 
          <Table 
            loading={loading}
            columns={trueskillCols}
            dataSource={data}
          />
        }
        { ranksystem === 'elo' && 
          <Table 
            loading={loading}
            columns={eloCols}
            dataSource={data}
          />
        }
        { ranksystem === 'wins' && 
          <Table 
            loading={loading}
            columns={winsCols}
            dataSource={data}
          />
        }
        { updateTime && 
          <p>Last updated: {updateTime?.toLocaleString()}</p>
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentPage
