import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMaping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMaping[response.status];


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) =>
    config
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if(error.response && shouldDisplayError(error.response)){
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
