// npm
import React, { ReactNode, forwardRef } from 'react';

// mui
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';

// local types
interface Props {
    setIsConfirmVisible: Function;
    confirm: Function;
    action: string;
    isLoading: boolean;
    setIsLoading: Function;
    children?: ReactNode;
}

const Confirm = forwardRef<HTMLUListElement, Props>((props: Props, ref) => {
    return (
        <div className="flex justify-center m-4 flex-col items-center">
            <Typography>
                Are you sure you would like to {props.action} ?
            </Typography>
            {props.children}
            <div className="flex justify-center mt-4 items-center">
                <LoadingButton
                    color="secondary"
                    loading={props.isLoading}
                    onClick={() => {
                        props.setIsLoading(false);
                        props.setIsConfirmVisible(false);
                    }}
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    loading={props.isLoading}
                    onClick={(e) => props.confirm(e)}
                >
                    Confirm
                </LoadingButton>
            </div>
        </div>
    );
});

export default Confirm;
