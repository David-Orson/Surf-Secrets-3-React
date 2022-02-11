import { AxiosRequestConfig } from 'axios';

export interface Request {
    axiosRequestConfig: AxiosRequestConfig;
    id: number;
    status: number;
    complete: boolean;
}
