// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';

// models
import { RootState } from '../../redux/store';
import { Account } from '../models';

export const useAccountService = () => {
    // hooks
    const axios = useAxios();

    // properties
    const apiUrl = useSelector((state: RootState) => state.network.apiUrl);

    const getAccount = async (id: number) => {
        const res = await axios.get(`${apiUrl}/account/${id}`);
        return res.data;
    };

    const getAllAccount = async () => {
        const res = await axios.get(`${apiUrl}/account`);
        return res.data;
    };

    const createAccount = async (account: Account) => {
        const res = await axios.post(`${apiUrl}/account`, account);
        return res.data;
    };

    const updateAccount = async (account: Account) => {
        const res = await axios.put(`${apiUrl}/account`, account);
        return res.data;
    };

    const deleteAccount = async (id: number) => {
        const res = await axios.deleteId(`${apiUrl}/account/${id}`);
        return res.data;
    };

    return {
        getAccount,
        getAllAccount,
        createAccount,
        updateAccount,
        deleteAccount,
    };
};
