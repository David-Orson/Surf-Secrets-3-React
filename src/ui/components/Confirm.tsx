// npm
import React, { ReactNode } from 'react';

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

const Confirm = (props: Props) => {
    return (
        <div className="bg-stone-900 flex justify-center flex-col items-center p-6">
            <Typography color="white">
                Are you sure you would like to {props.action} ?
            </Typography>
            {props.children}

            <div className="flex justify-center mx-4 items-center">
                <LoadingButton
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
};

export default Confirm;
