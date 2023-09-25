import axios, {AxiosInstance} from "axios";

export const Axios = (): AxiosInstance => {
  const instance: AxiosInstance = axios.create();
  return instance;
};