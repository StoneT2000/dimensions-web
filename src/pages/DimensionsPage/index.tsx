import React, { useEffect, useState } from 'react';
import './index.scss';
import { Table, message} from 'antd';

import DefaultLayout from '../../components/layouts/default';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getDimension, getMatchesFromDimension, getTournamentsFromDimension } from '../../actions/dimensions';

// NOTE!! Can import outside src as long as we dont use instanceof dimension or actually use it, we can just it for typings
import { DimensionType, Match, Tournament } from 'dimensions-ai';
import DimensionCard from '../../components/DimensionCard';
import MatchActionButton from '../../components/MatchActionButton';
import { join } from 'path';
import BackLink from '../../components/BackLink';
import MatchList from '../../components/MatchList';


let intv: any;
function DimensionsPage(props: any) {
  const params: any = useParams();
  const history: any = useHistory();
  const [dimension, setDimension] = useState<DimensionType>();
  const [matches, setMatches] = useState<{[x in string]: Match}>({});
  const [data, setData] = useState<Array<any>>([]);
  const [tourneyData, setTourneyData] = useState<Array<any>>([]);

  const tourneyColumns = [
    {
      title: 'Tournament Name',
      dataIndex: 'tourneyname',
      render: (tournament: Tournament) => <Link to={`${join(window.location.pathname,`/tournaments/${tournament.id}`)}`}>{tournament.name}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]
  
  const startRefresh = () => {
     intv = setInterval(() => {
      
    }, 1000);
  }
  const update = () => {
    getDimension(params.id).then((res) => {
      if (!(res instanceof Array))  {
        setDimension(res);
        getMatchesFromDimension(res.id).then((res) => {
          setMatches(res);
        });
        getTournamentsFromDimension(res.id).then((res) => {
          let newData = Object.values(res).map((tournament: Tournament, index) => {
            return {
              key: index,
              tourneyname: tournament,
              status: tournament.status,
            }
          });
          setTourneyData(newData);
        });
      }
      else {
        console.error("something wrong happened");
      }
    }).catch(() => {
      clearInterval(intv);
    });
  }
  useEffect(() => {
    if (params.id) {
      update();
      // startRefresh();
    }
    return () => {
      clearInterval(intv);
    }
  }, []);
  return (
    <DefaultLayout>
      <div className='DimensionPage'>
        <br />
        <BackLink to='../../'/>
        {dimension &&
          <div>
            <h2>{dimension.name}</h2>
            <h4 className='meta-data-title'>Dimension Metadata</h4>
            <p className='meta-data'>
              id: {dimension.id} <br />
              Used Design: { dimension.design.name } <br />
              Logging Level: {dimension.configs.loggingLevel}
            </p>
            <h4>Ongoing Tournaments</h4>
            <Table className='tournamentTable'
              columns={tourneyColumns}
              dataSource={tourneyData}
            />
            <h4>Ongoing Matches</h4>
            <MatchList className='matchTable' matches={matches}/>
          </div> 
        }
      </div>
    </DefaultLayout>
  );
}

function DimensionsListPage() {
  const params: any = useParams();
  const [dimensions, setDimensions] = useState<{[x in string]: DimensionType}>({});
  useEffect(() => {
    getDimension().then((res: any) => {
      //@ts-ignore
      setDimensions(res);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  return (
    <DefaultLayout>
      <div className='DimensionPage'>
        <h2>Dimensions Observed</h2>
        {dimensions &&
          Object.values(dimensions).map((dimension: DimensionType) => {
            return (
              <DimensionCard key={dimension.id} dimension={dimension}/>
            )
          })
        }
      </div>
    </DefaultLayout>
  );
}
DimensionsPage.DimensionsListPage = DimensionsListPage;
export default DimensionsPage
