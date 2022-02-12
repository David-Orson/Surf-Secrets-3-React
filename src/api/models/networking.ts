import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Request {
    axiosRequestConfig: AxiosRequestConfig;
    id: number;
    status: number;
    complete: boolean;
}

export type AxiosRequest = <T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined) => Promise<R>
