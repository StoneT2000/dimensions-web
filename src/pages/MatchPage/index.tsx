import React, { useEffect, useState } from 'react';
import './index.scss';

import DefaultLayout from '../../components/layouts/default';
import { useParams, useHistory } from 'react-router-dom';

import { getMatchFromDimension } from '../../actions/dimensions';

// NOTE!! Can import outside src as long as we dont use instanceof dimension or actually use it, we can just it for typings
import Match from '../../components/Match';
import { Match as DMatch } from 'dimensions-ai';

function MatchPage() {
  const params: any = useParams();
  const history: any = useHistory();
  const [match, setMatch] = useState<DMatch>();

  const update = () => {
    getMatchFromDimension(params.id, params.matchID).then((res) => {
      if (!(res instanceof Array))  {
        setMatch(res);
      }
      else {
        console.error("something wrong happened");
      }
    }).catch(() => {
      history.push('../');
    });
  }
  useEffect(() => {
    if (params.matchID) {
      update();
    }
  }, []);
  return (
    <DefaultLayout>
      <div className='DimensionPage'>
        {match &&
          <Match
            match={match}
            dimensionID={params.id}
          />
        }
      </div>
    </DefaultLayout>
  );
}

export default MatchPage
