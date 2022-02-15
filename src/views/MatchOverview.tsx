// npm
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// mui
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// hooks
import { useServices } from '../api/services';

// models
import { Match } from '../api/models';

// components
import ReportMatch from '../components/ReportMatch';

const MatchOverview = () => {
    // hooks
    const { id } = useParams();
    const { getMatch } = useServices();

    // reactive
    const [match, setMatch] = useState<Match>({
        id: 0,
        team0: [],
        team1: [],
        teamSize: 0,
        time: new Date(),
        maps: [{ name: '' }],
        mapIds: [],
        result0: [],
        result1: [],
        isDisputed: false,
        result: 4,
    } as unknown as Match);
    const [isReportVisible, setIsReportVisible] = useState(false);

    // lifecycle
    useEffect(() => {
        let cancelled = false;

        const request = async () => {
            if (parseInt(id as string)) {
                let responseMatch = await getMatch(parseInt(id as string));

                if (cancelled) return;

                setMatch(responseMatch);
            }
        };

        request();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <Paper>
                {match.id ? (
                    <div>
                        <Typography variant="h3">
                            {match.team0[0]} vs {match.team1[0]}
                        </Typography>
                        <div>
                            Scheduled time{' '}
                            {dayjs(match.time).format('hh:mm DD MM YYYY')}
                        </div>
                        <div>map 1: {match.maps[0].name} </div>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                setIsReportVisible(true);
                            }}
                        >
                            Report Score
                        </Button>
                    </div>
                ) : (
                    <div>No Match</div>
                )}
            </Paper>

            <Modal
                open={isReportVisible}
                onClose={() => setIsReportVisible(false)}
            >
                <Box
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2 p-4"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <ReportMatch
                        setIsReportVisible={setIsReportVisible}
                        matchId={match.id}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default MatchOverview;
