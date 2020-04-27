import axios, { AxiosResponse } from 'axios';
import { DimensionType, Match, Tournament } from 'dimensions-ai';
import { message } from 'antd';

// Returns all dimensions if no input
export const getDimension = async (id: number = -1): Promise<Array<DimensionType> | DimensionType> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + '/api/dimensions/' + (id === -1 ? '' : id)).then((res: AxiosResponse) => {
      if (id === -1) {
        resolve(res.data.dimensions);
      }
      else {
        resolve(res.data.dimension);
      }
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    })
  })
}


export const getMatchesFromDimension = async (dimensionID: number): Promise<{[k in string]: Match}> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}
export const getMatchFromDimension = async (dimensionID: number, matchID: number): Promise<Match> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match/${matchID}`).then((res: AxiosResponse) => {
      resolve(res.data.match);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}
export const getTournamentFromDimension = async (dimensionID: number, tournamentID: number): Promise<Tournament> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}`).then((res: AxiosResponse) => {
      resolve(res.data.tournament);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}


export const getTournamentsFromDimension = async (dimensionID: number): Promise<Array<Tournament>> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament`).then((res: AxiosResponse) => {
      resolve(res.data.tournaments);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}