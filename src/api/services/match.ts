// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';

// models
import { RootState } from '../../redux/store';
import { Match } from '../models';

export const useMatchService = () => {
    // hooks
    const axios = useAxios();

    // properties
    const apiUrl = useSelector((state: RootState) => state.network.apiUrl);

    const getMatch = async (id: number): Promise<Match> => {
        const res = await axios.get(`${apiUrl}/match/${id}`);
        return res.data;
    };

    const getAllMatchs = async (): Promise<Match[]> => {
        const res = await axios.get(`${apiUrl}/matches`, {}, true);
        return res.data;
    };

    const acceptMatch = async (finderPostId: number): Promise<Match> => {
        const res = await axios.post(
            `${apiUrl}/match/${finderPostId}`,
            {},
            true
        );
        return res.data;
    };

    const reportMatch = async (id: number) => {
        const res = await axios.put(`${apiUrl}/match/${id}`);
        return res.data;
    };

    return {
        getMatch,
        getAllMatchs,
        acceptMatch,
        reportMatch,
    };
};
