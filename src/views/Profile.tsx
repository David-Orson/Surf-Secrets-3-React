// npm
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

// mui
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// hooks
import { useServices } from '../api/services';

// models
import { Account } from '../api/models';
import { RootState } from '../redux/store';

const Profile = () => {
    // hooks
    const { getAccount } = useServices();
    const { username } = useParams();

    // state
    const account = useSelector((state: RootState) => state.account);

    // reactive
    const [profile, setProfile] = useState<Account>({} as Account);

    // lifecycle
    useEffect(() => {
        let cancelled = false;

        if (username === account.username || !username) {
            setProfile(account);
        } else {
            const request = async () => {
                let responseAccount = await getAccount('user6');

                if (cancelled) return;

                setProfile(responseAccount);
            };

            request();
        }

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <Paper>
                <Typography variant="h3">{profile.username}</Typography>
                <div>
                    Member since{' '}
                    {dayjs(profile.createDate).format('MMMM DD YYYY')}
                </div>
                <div>{profile.win} wins</div>
                <div>{profile.loss} losses</div>
                <div>{profile.disputes} unresolved disputes</div>
            </Paper>
        </div>
    );
};

export default Profile;
