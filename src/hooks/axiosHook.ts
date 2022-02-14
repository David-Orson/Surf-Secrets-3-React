// npm
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';

// models
import { Request, AxiosRequest } from '../api/models';
import { RootState } from '../redux/store';

export const useAxios = () => {
    const authToken = useSelector(
        (state: RootState) => state.network.auth.token
    );
    const requests: any[] = [];

    const prepareRequest = (
        auth?: boolean
    ): { request: Request; err: AxiosError | null } => {
        let headers = {};
        let request = {} as Request;

        if (auth) {
            if (!authToken) {
                request.id = requests.length;
                request.status = 600;

                const err = {
                    isAxiosError: true,
                    name: '',
                    message: '',
                    toJSON: () => ({}),
                    config: {},
                    response: {
                        data: {
                            type: 'Error',
                            message: 'User not authorised to send this request',
                        },
                        status: 600,
                        statusText: 'Conflict',
                        headers: {},
                        config: {},
                    },
                };
                requests.push(request);
                return { request, err };
            }

            headers = {
                Authorization: 'Bearer ' + authToken,
            };
        }

        request = {
            axiosRequestConfig: { headers },
            id: requests.length,
            status: 601,
            complete: false,
            data: {},
        };

        requests.push(request);

        return { request, err: null };
    };

    const handleError = (err: AxiosError, requestId: number) => {
        requests.find((x) => x.id === requestId).complete = true;
        console.error(err);
    };

    const setDelayWarning = (delay?: number) => {
        if (!delay) return;

        setTimeout(() => {
            console.warn('request is taking longer than expected');
        }, delay);
    };

    const wrapRequest =
        (reqMethod: AxiosRequest) =>
        (url: string, body?: {}, auth?: boolean, delay?: number): any => {
            const { request, err } = prepareRequest(auth);

            if (err !== null) {
                handleError(err, request.id);
            }

            setDelayWarning(delay);

            console.log('config', request.axiosRequestConfig);
            return reqMethod(url, body, request.axiosRequestConfig).catch(
                (err: AxiosError) => {
                    handleError(err, request?.id);
                }
            );
        };

    return {
        get: wrapRequest(axios.get),
        post: wrapRequest(axios.post),
        put: wrapRequest(axios.put),
        deleteId: wrapRequest(axios.delete),
    };
};
