/**
 * Adds tournament and dimension to context
 */

import React, { useContext, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import TournamentContext from '../contexts/tournament';
import { getTournamentFromDimension } from '../actions/dimensions';
import { message } from "antd";

/**
 * Auto stores tournament into context 
 */
function SetupTournament(props: any) {
  const params: any = useParams();
  const history = useHistory();
  const { tournament, setTournament } = useContext(TournamentContext);
  useEffect(() => {
    if (!params.id) {
      message.error('dimension ID not given');
      history.push('/');
      return;
    }
    else if (!params.tournamentID) {
      message.error('tournament ID not given');
      history.push('/');
      return;
    }
    if (tournament.id === '') {
      getTournamentFromDimension(params.id, params.tournamentID).then((res) => {
        setTournament(res);
      }).catch(() => {
        message.error('No tournament found with id ' + params.tournamentID);
        history.push('../');
      });
    }
  }, []);
  return (
    <div>
      { props.component }
    </div>
  )
}

export default SetupTournament 