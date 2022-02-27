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
    const toast = useSelector((state: RootState) => state.ui.toast);

    return (
        <Snackbar
            open={toast.isOpen}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={6000}
            onClose={() => closeToast()}
        >
            <Alert onClose={() => closeToast()} severity={toast.severity}>
                <AlertTitle>
                    {toast.severity
                        ? toast.severity.charAt(0).toUpperCase() +
                          toast.severity.slice(1)
                        : null}
                </AlertTitle>
                {toast.messages.map((message: string) => {
                    return <div>{message}</div>;
                })}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
