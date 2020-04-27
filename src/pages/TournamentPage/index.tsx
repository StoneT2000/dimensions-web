import React, { useEffect, useState } from 'react';
import './index.scss';
import { DimensionType, Match, Tournament } from 'dimensions-ai';
import { useParams, useHistory, Link } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getTournamentFromDimension } from '../../actions/dimensions';
import { getRanks } from '../../actions/tournament';
import { Table } from 'antd';
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
  const params: any = useParams();
  const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const [ranksystem, setRankSystem] = useState<Tournament.RANK_SYSTEM>('trueskill');
  const [data, setData] = useState<any>([]);
  const update = () => {
    getTournamentFromDimension(params.id, params.tournamentID).then((res) => {
      setTournament(res);
      // @ts-ignore
      let rankSystem = res.configs.rankSystem;
      setRankSystem(rankSystem);

      getRanks(params.id, params.tournamentID).then((res) => {
        console.log(res);
        let newData = [];
        newData = res.map((info: any) => {
          return {
            pname: info.name,
            score: info,
            matchesPlayed: info.matchesPlayed
          }
        });
        setData(newData);
      });
    }).catch((error) => {
      clearInterval(intv);
    });
    
  }
  const startRefresh = () => {
    intv = setInterval(update, 10000);
  }
  useEffect(() => {
    if (params.tournamentID) {
      update();
      // startRefresh();
    }
    return () => {
      clearInterval(intv);
    }
  }, []);
  return (
    <DefaultLayout>
      <div className='TournamentPage'>
        <h1>Tournament Details</h1>
        <h4 className='meta-data-title'>Metadata</h4>
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
