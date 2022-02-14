import { AuthState } from './auth';
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
    body?: any,
    config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;
