// axios
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Request } from '../api/models';

export const axiosHook = () => {
    const store: any = {};
    const requests: any[] = [];

    const prepareRequest = (
        auth?: boolean
    ): { request: Request; err: AxiosError | null } => {
        let headers = {};
        let request = {} as Request;

        if (auth) {
            const authToken = store?.state?.authToken;
            if (!authToken) {
                request.id = requests.length;
                request.status = 600;

                let err = {
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
                Authorization: 'Bearer ' + JSON.parse(authToken).token,
            };
        }

        request = {
            axiosRequestConfig: { headers },
            id: requests.length,
            status: 601,
            complete: false,
        };

        requests.push(request);

        return { request, err: null };
    };

    const handleError = (err: AxiosError, requestId: number) => {
        const i = requests.findIndex((x) => x.id === requestId);
        requests[i].complete = true;

        window.console.log(err);
    };

    const setDelayWarning = (delay?: number) => {
        if (delay) {
            setTimeout(() => {
                window.console.log('request is taking longer than expected');
            }, delay);
        }
    };

    const get = (
        url: string,
        auth?: boolean,
        delay?: number
    ): Promise<void | AxiosResponse<any>> | null => {
        let { request, err } = prepareRequest(auth);

        if (err !== null) {
            handleError(err, request.id);
        }

        setDelayWarning(delay);

        const axiosInstance = axios
            .get(url, request.axiosRequestConfig)
            .catch((err: AxiosError) => {
                handleError(err, request?.id);
            });

        return axiosInstance;
    };

    const post = (url: string, auth: boolean = true, delay?: number) => {
        let { request, err } = prepareRequest(auth);

        if (err !== null) {
            handleError(err, request.id);
        }

        setDelayWarning(delay);

        const axiosInstance = axios
            .post(url, request.axiosRequestConfig)
            .catch((err: AxiosError) => {
                handleError(err, request?.id);
            });

        return axiosInstance;
    };

    const put = (url: string, auth: boolean = true, delay?: number) => {
        let { request, err } = prepareRequest(auth);

        if (err !== null) {
            handleError(err, request.id);
        }

        setDelayWarning(delay);

        const axiosInstance = axios
            .put(url, request.axiosRequestConfig)
            .catch((err: AxiosError) => {
                handleError(err, request?.id);
            });

        return axiosInstance;
    };

    const deleteId = (url: string, auth: boolean = true, delay?: number) => {
        let { request, err } = prepareRequest(auth);

        if (err !== null) {
            handleError(err, request.id);
        }

        setDelayWarning(delay);

        const axiosInstance = axios
            .delete(url, request.axiosRequestConfig)
            .catch((err: AxiosError) => {
                handleError(err, request?.id);
            });

        return axiosInstance;
    };

    return {
        get,
        post,
        put,
        deleteId,
    };
};
