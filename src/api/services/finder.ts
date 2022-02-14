// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';

// models
import { RootState } from '../../redux/store';
import { FinderPost } from '../models';

export const useFinderService = () => {
    // hooks
    const axios = useAxios();

    // properties
    const apiUrl = useSelector((state: RootState) => state.network.apiUrl);

    const getFinderPost = async (id: number): Promise<FinderPost> => {
        const res = await axios.get(`${apiUrl}/finder-post/${id}`);
        return res.data;
    };

    const getAllFinderPosts = async (): Promise<FinderPost[]> => {
        const res = await axios.get(`${apiUrl}/finder-posts`, {}, true);
        return res.data;
    };

    const createFinderPost = async (post: FinderPost): Promise<FinderPost> => {
        const res = await axios.post(`${apiUrl}/finder-post`, post);
        return res.data;
    };

    const removeFinderPost = async (id: number) => {
        const res = await axios.put(`${apiUrl}/finder-post/${id}`);
        return res.data;
    };

    return {
        getFinderPost,
        getAllFinderPosts,
        createFinderPost,
        removeFinderPost,
    };
};
