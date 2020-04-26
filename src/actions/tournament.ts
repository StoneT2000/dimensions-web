import axios, { AxiosResponse } from 'axios';
import { DimensionType, Match, Tournament } from 'dimensions-ai';
import { message } from 'antd';


export const getConfigs = async (dimensionID: number, tournamentID: number): Promise<any> => {

};
export const getRanks = async (dimensionID: number, tournamentID: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/ranks`).then((res: AxiosResponse) => {
      resolve(res.data.ranks);
    }).catch((error) => {
      message.error(error.message);
      reject(error);
    });
  });
}
