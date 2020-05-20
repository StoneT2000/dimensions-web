import React, { useState, useEffect, useContext } from 'react';

import './index.scss';
import { Match, Agent } from 'dimensions-ai';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'antd';
import MatchActionButton from '../MatchActionButton';
import UserContext from '../../UserContext';

const MatchList = (props: 
  {
    matches: {
      [x in string]: Match
    } | Array<Match>, 
    className?: string
  } = {matches: {}, className:""}
) => {
  const params: any = useParams();
  const { user } = useContext(UserContext);
  const [ data, setData ] = useState<Array<any>>([]);
  const update = () => {};
  const matchLinkRender = (match: Match) => 
  {
    if (params.tournamentID) {
      return (
        <Link to={`/dimensions/${params.id}/tournaments/${params.tournamentID}/match/${match.id}`}>{match.name}</Link>
      )
    }
    else {
      return (
        <Link to={`/dimensions/${params.id}/match/${match.id}`}>{match.name}</Link>
      )
    }
  }
  const columns = [
    {
      title: 'Match Name',
      dataIndex: 'matchname',
      render: matchLinkRender
    },
    {
      title: 'Players',
      dataIndex: 'players',
      render: (agents: Array<Agent>) => {
        return (
          <div>
            {
              agents.map((a) => {
                return <Link className='profile-link' target='_blank' rel="noopener noreferrer" to={`/dimensions/${params.id}/tournaments/${params.tournamentID}/user/${a.tournamentID.id}`}>{a.name}</Link>
              })
            }
          </div>
        )
      }
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      render: (match: Match) => {
        return (
          <>
           {match.results ? <a target='_blank' rel="noopener noreferrer" href={process.env.REACT_APP_API + `/api/dimensions/${params.id}/match/${match.id}/results`}>Results</a> : 'No results yet'}
          </>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
    }
  ];
  const adminColumns = [...columns, {
    title: 'Action',
    dataIndex: 'action',
    render: (match: Match) => {
      //@ts-ignore
      return (<MatchActionButton match={match} update={update} dimensionID={params.id}/>)
    }
  }];
  useEffect(() => {
    let newData: Array<any> = [];
    if (props.matches.length) {
      newData = (props.matches as Array<any>);
      newData = newData.map((match) => {
        return {
          key: match.id,
          matchname: match,
          result: match,
          players: match.agents,
          creationdate: match.creationDate,
          status: match.matchStatus,
          action: match
        }
      });
    }
    else {
      let keys = Object.keys(props.matches);

      let matches = (props.matches as {[x in string]: Match});
      if (keys.length > 0) {
        for (let key in matches) {
          let match = matches[key];
          newData.push({
            key: key,
            matchname: match,
            results: match,
            players: match.agents,
            creationdate: match.creationDate,
            status: match.matchStatus,
            action: match
          });
        }
        
      }
    }
    setData(newData);
  }, [props.matches]);
  return (
    <div className={"MatchList " + props.className}>
      {
        user.admin ?
        <Table className='matchTable'
          columns={adminColumns}
          dataSource={data}
          loading={data.length === 0}
        /> :
        <Table className='matchTable'
          columns={columns}
          dataSource={data}
          loading={data.length === 0}
        />
      }
    </div>
  )
}

export default MatchList
