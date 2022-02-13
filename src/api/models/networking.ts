import { AuthState } from './authModels';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Request {
    axiosRequestConfig: AxiosRequestConfig;
    id: number;
    status: number;
    complete: boolean;
    data: {};
}

export interface Network {
    apiUrl: string;
    auth: AuthState;
}

export type AxiosRequest = <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;
