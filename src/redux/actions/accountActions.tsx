import { SET_ACCOUNT, REMOVE_ACCOUNT } from '../types';

import { useDispatch } from 'react-redux';
import { Account } from '../../api/models';

export const useAccountActions = () => {
    const dispatch = useDispatch();

    const setAccount = (account: Account) => {
        localStorage.setItem('account', JSON.stringify(account));
        dispatch({
            type: SET_ACCOUNT,
            payload: account,
        });
    };

    const removeAccount = () => {
        localStorage.removeItem('account');
        dispatch({
            type: REMOVE_ACCOUNT,
        });
    };

    const addFinderPostId = (id: number) => {
        const account: Account = JSON.parse(
            localStorage.getItem('account') as string
        );

        account.finderPostIds.push(id);
        setAccount(account);
    };

    return {
        setAccount,
        removeAccount,
        addFinderPostId,
    };
};
