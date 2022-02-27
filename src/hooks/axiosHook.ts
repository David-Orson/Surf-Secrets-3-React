// npm
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';

// hooks
import { useActions } from '../redux/actions';

// models
import { Request, AxiosRequest } from '../api/models';
import { RootState } from '../redux/store';

export const useAxios = () => {
    // hooks
    const { openToast } = useActions();

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
        requests.find((x) => x.id === requestId).status = err.response?.status;

        if (err.response && err.response.status === 401) {
            openToast('error', 'Please log out and then log in');
            return;
        }

        if (err.response && err.response.status === 504) {
            openToast(
                'error',
                'There is currently a server issue, if the problem persists please get in touch with Orson'
            );
            throw err;
        }

        if (err.response && err.response.data.message) {
            openToast('error', err.response.data.message);
        } else if (err.response && err.response.data.errors) {
            console.log(err.response.data);
            openToast('error', err.response.data.errors);
        } else {
            openToast('error', 'Validation error:\n' + JSON.stringify(err));
        }
        throw err;
    };

    const setDelayWarning = (delay?: number) => {
        if (!delay) return;

        setTimeout(() => {
            openToast('error', 'request is taking longer than expected');
            window.console.warn('request is taking longer than expected');
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
