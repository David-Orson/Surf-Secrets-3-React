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

    const getAllMatches = async (): Promise<Match[]> => {
        const res = await axios.get(`${apiUrl}/matches`, {}, true);
        return res.data;
    };

    const getMatchesByAccount = async (accountId: number): Promise<Match[]> => {
        const res = await axios.get(`${apiUrl}/matches/user/${accountId}`);
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

    const reportMatch = async (
        id: number,
        score: number[]
    ): Promise<number> => {
        const res = await axios.put(`${apiUrl}/match/${id}`, { score }, true);
        return res.data;
    };

    return {
        getMatch,
        getAllMatches,
        getMatchesByAccount,
        acceptMatch,
        reportMatch,
    };
};
