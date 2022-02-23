// npm
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

// mui
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// hooks
import { useServices } from '../../api/services';

// models
import { Match } from '../../api/models';
import { RootState } from '../../redux/store';

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

    const account = useSelector((state: RootState) => state.account);
    const team = account
        ? match.team0.includes(account.id)
            ? 0
            : match.team1.includes(account.id)
            ? 1
            : null
        : null;

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
            <Typography
                sx={{ padding: 2, color: 'white' }}
                variant="h4"
                gutterBottom
            >
                Match Overview
            </Typography>
            <Paper>
                {match.id ? (
                    <div>
                        <Typography
                            sx={{ paddingTop: 4 }}
                            variant="h3"
                            align="center"
                        >
                            {match.team0Names[0]} vs {match.team1Names[0]}
                        </Typography>
                        <Container sx={{ paddingBottom: 4 }}>
                            <Typography>Match Time: </Typography>
                            <Typography color="primary">
                                {dayjs(match.time).format('h:mm A MMM-DD YYYY')}
                            </Typography>
                            <Paper>
                                <Container sx={{ padding: 2 }}>
                                    <Typography>
                                        Map 1: {match.maps[0].name}
                                    </Typography>
                                    {match.result === 0 ||
                                    match.result === 1 ? (
                                        match.result === 0 ? (
                                            <Typography color="lightGreen">
                                                Winner: {match.team0Names[0]}
                                            </Typography>
                                        ) : (
                                            <Typography color="lightGreen">
                                                Winner: {match.team1Names[0]}
                                            </Typography>
                                        )
                                    ) : null}
                                </Container>
                            </Paper>
                        </Container>

                        {(team === 0 &&
                            match.result0.reduce((a, b): number => a + b) ===
                                0) ||
                        (team === 1 &&
                            match.result1.reduce((a, b): number => a + b) ===
                                0) ? (
                            <Container>
                                <Button
                                    sx={{ marginBottom: 4 }}
                                    variant="contained"
                                    onClick={async () => {
                                        setIsReportVisible(true);
                                    }}
                                >
                                    Report Score
                                </Button>
                            </Container>
                        ) : null}
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
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2"
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
