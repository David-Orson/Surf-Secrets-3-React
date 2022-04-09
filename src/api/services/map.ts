// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';

// models
import { RootState } from '../../redux/store';
import { SurfMap } from '../models';

export const useMapService = () => {
    // hooks
    const axios = useAxios();

    // properties
    const apiUrl = useSelector((state: RootState) => state.network.apiUrl);

    const getAllMaps = async (): Promise<SurfMap[]> => {
        const res = await axios.get(`${apiUrl}/maps`);
        return res.data;
    };

    return {
        getAllMaps,
    };
};
