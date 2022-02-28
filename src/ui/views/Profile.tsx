// npm
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// mui
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

// hooks
import { useServices } from '../../api/services';

// models
import { Account, SurfMap } from '../../api/models';
import { RootState } from '../../redux/store';

const createData = (
    id: number,
    team0: string,
    team1: string,
    map: SurfMap,
    time: Date,
    result: string | null,
    isDisputed: boolean
) => ({ id, team0, team1, map, time, result, isDisputed });

const tableStyle = {
    bodyRow: {
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#333',
        },
    },
};

const Profile = () => {
    // hooks
    const { getAccount, getMatchesByAccount } = useServices();
    const { username } = useParams();
    const navigate = useNavigate();

    // state
    const account = useSelector((state: RootState) => state.account);

    // reactive
    const [profile, setProfile] = useState<Account>({} as Account);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);

    // properties
    let cancelled = false;
    const rowsPerPage = 10;
    let rowData: any[] = [];

    // methods
    const accountRequest = async () => {
        let responseAccount = await getAccount(username as string);

        if (cancelled) return;

        matchesRequest(responseAccount);
    };

    const matchesRequest = async (account: Account) => {
        let matches = await getMatchesByAccount(account.id);

        if (cancelled) return;
        if (!matches) return;

        matches.forEach((match) => {
            const result =
                (match.result === 0 || 1) && match.result === 0
                    ? match.team0.includes(account.id)
                        ? 'Win'
                        : 'Loss'
                    : null;

            rowData.push(
                createData(
                    match.id,
                    match.team0Names[0],
                    match.team1Names[0],
                    match.maps[0],
                    match.time,
                    result,
                    match.isDisputed
                )
            );

            setRows(rowData);
        });

        setProfile(account);
    };

    const changePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // lifecycle
    useEffect(() => {
        cancelled = false;

        if ((account && username === account.username) || !username) {
            matchesRequest(account);
        } else {
            accountRequest();
        }

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <Paper>
                <Container sx={{ paddingTop: 2 }}>
                    <Typography variant="h3">{profile.username}</Typography>
                    <div className="mb-8">
                        Member since{' '}
                        {dayjs(profile.createDate).format('MMMM DD YYYY')}
                    </div>
                    <TableContainer sx={{ padding: '0 0 24px 0' }}>
                        <Table sx={{ width: 300 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Wins</TableCell>
                                    <TableCell align="center">Losses</TableCell>
                                    <TableCell align="center">
                                        Disputes Pending
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        sx={{ color: 'lightGreen' }}
                                        component="th"
                                        align="center"
                                    >
                                        {profile.win}
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: 'red' }}
                                        align="center"
                                    >
                                        {profile.loss}
                                    </TableCell>
                                    <TableCell align="center">
                                        {profile.disputes}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Paper>
            <Paper>
                <div className="m-4">
                    <Typography sx={{ padding: 2 }} variant="h5" gutterBottom>
                        Match History
                    </Typography>
                    {rows.length ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    size="small"
                                    aria-label="a dense table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Player A</TableCell>
                                            <TableCell align="right">
                                                Player B
                                            </TableCell>
                                            <TableCell align="right">
                                                Maps
                                            </TableCell>
                                            <TableCell align="right">
                                                Time
                                            </TableCell>
                                            <TableCell align="right">
                                                Result
                                            </TableCell>
                                            <TableCell align="right">
                                                Was Disputed
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, i) => {
                                            if (
                                                i >
                                                    (page + 1) * rowsPerPage -
                                                        1 ||
                                                i < page * rowsPerPage
                                            )
                                                return;
                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    sx={tableStyle.bodyRow}
                                                    onClick={() => {
                                                        navigate(
                                                            `/match/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.team0}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.team1}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.map.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography color="primary">
                                                            {dayjs(
                                                                row.time
                                                            ).format(
                                                                'h:mm A MMM-DD YYYY'
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={
                                                            row.result === 'Win'
                                                                ? {
                                                                      color: 'lightGreen',
                                                                  }
                                                                : {
                                                                      color: 'red',
                                                                  }
                                                        }
                                                        align="right"
                                                    >
                                                        {row.result}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ color: 'red' }}
                                                        align="right"
                                                    >
                                                        {row.isDisputed
                                                            ? 'Disputed'
                                                            : null}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={changePage}
                            />
                        </div>
                    ) : (
                        <div className="m-4 p-4">
                            User has not completed any matches
                        </div>
                    )}
                </div>
            </Paper>
        </div>
    );
};

export default Profile;
