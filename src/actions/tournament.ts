import axios, { AxiosResponse } from 'axios';
import { Match, nanoid } from 'dimensions-ai';
import { message } from 'antd';
import { User } from '../UserContext';


export const getConfigs = async (dimensionID: number, tournamentID: number): Promise<any> => {

};
export const getRanks = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/ranks`).then((res: AxiosResponse) => {
      resolve(res.data.ranks);
    }).catch((error) => {
      message.error(error.response.data.message);
      reject(error);
    });
  });
}

export const getMatches = async (dimensionID: nanoid, tournamentID: nanoid): Promise<{[x in string]: Match}> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const getMatchQueue = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/matchQueue`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const runTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/run`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const stopTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const removeTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const uploadBot = async (dimensionID: nanoid, tournamentID: nanoid, name: string, file: File | undefined, user: User, path: string) => {
  if (!file) {
    throw new Error('no file!');
  }
  return new Promise((resolve, reject) => {
    let bodyFormData = new FormData();
    bodyFormData.set('names', JSON.stringify([name]));
    bodyFormData.set('playerIDs', JSON.stringify([user.id]));
    bodyFormData.set('paths', JSON.stringify([path]));
    bodyFormData.append('files', file);
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/upload`, bodyFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}