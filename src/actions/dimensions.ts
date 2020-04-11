import axios, { AxiosResponse } from 'axios';
import { DimensionType, Match } from 'dimensions-ai';

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
      reject(error);
    })
  })
}


export const getMatchesFromDimension = async (dimensionID: number): Promise<Array<Match>> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      reject(error);
    })
  })
}
export const getMatchFromDimension = async (dimensionID: number, matchID: number): Promise<Match> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match/${matchID}`).then((res: AxiosResponse) => {
      resolve(res.data.match);
    }).catch((error) => {
      reject(error);
    })
  })
}