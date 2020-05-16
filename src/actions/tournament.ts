import axios, { AxiosResponse } from 'axios';
import { Match, nanoid } from 'dimensions-ai';
import { message } from 'antd';


export const getConfigs = async (dimensionID: number, tournamentID: number): Promise<any> => {

};
export const getRanks = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/ranks`).then((res: AxiosResponse) => {
      resolve(res.data.ranks);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}

export const getMatches = async (dimensionID: nanoid, tournamentID: nanoid): Promise<{[x in string]: Match}> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}

export const getMatchQueue = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/matchQueue`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}

export const runTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/run`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}

export const stopTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}

export const removeTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}