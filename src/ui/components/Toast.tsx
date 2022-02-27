// npm
import React from 'react';
import { useSelector } from 'react-redux';

// mui
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// hooks
import { useActions } from '../../redux/actions';

//models
import { RootState } from '../../redux/store';

const Toast = () => {
    // hooks
    const { closeToast } = useActions();

    // reactive
    const ui = useSelector((state: RootState) => state.ui);

    return (
        <Snackbar
            open={ui.isToastOpen}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Alert onClose={() => closeToast()} severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — check it out!
            </Alert>
        </Snackbar>
    );
};

export default Toast;
