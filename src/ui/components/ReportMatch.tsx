// npm
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';

// hooks
import { useServices } from '../../api/services';

// local types
interface Props {
    setIsReportVisible: Function;
    matchId: number;
}

const ReportMatch = (props: Props) => {
    // hooks
    const { reportMatch } = useServices();
    const navigate = useNavigate();

    // reactive
    const [isLoading, setIsLoading] = useState(false);
    const [scoreA, setScoreA] = useState<number>(0);
    const [scoreB, setScoreB] = useState<number>(0);

    // methods
    const report = async () => {
        setIsLoading(true);

        await reportMatch(props.matchId, [scoreA, scoreB]);

        setIsLoading(false);
        props.setIsReportVisible(false);

        navigate(`/`);
    };

    return (
        <div className="bg-stone-900 flex justify-center items-center p-8">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label-a">Team A</InputLabel>
                    <Select
                        labelId="select-label-a"
                        id="select-a"
                        value={`${scoreA}`}
                        label="Score for Team A"
                        onChange={(e: SelectChangeEvent) =>
                            setScoreA(parseInt(e.target.value))
                        }
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                    <div className="m-2"></div>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-label-b">Team B</InputLabel>
                    <Select
                        labelId="select-label-b"
                        id="select-b"
                        value={`${scoreB}`}
                        label="Score for Team B"
                        onChange={(e: SelectChangeEvent) =>
                            setScoreB(parseInt(e.target.value))
                        }
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>

                <LoadingButton
                    sx={{ marginTop: 3 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                    onClick={report}
                >
                    Report
                </LoadingButton>
            </Box>
        </div>
    );
};

export default ReportMatch;
