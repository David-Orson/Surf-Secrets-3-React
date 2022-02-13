import { AxiosRequestConfig } from 'axios';
import { AuthState } from './authModels';

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
