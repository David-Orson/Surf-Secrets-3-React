// npm
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

// mui
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
import { useServices } from '../api/services';

// models
import { Account, SurfMap } from '../api/models';
import { RootState } from '../redux/store';

const createData = (
    team0: number,
    team1: number,
    map: SurfMap,
    time: Date,
    result: string | null,
    isDisputed: boolean
) => ({ team0, team1, map, time, result, isDisputed });

const Profile = () => {
    // hooks
    const { getAccount, getMatchesByAccount } = useServices();
    const { username } = useParams();

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

        matches.forEach((match) => {
            const result =
                match.result === 0 ? 'Win' : match.result === 1 ? 'Loss' : null;

            rowData.push(
                createData(
                    match.team0[0],
                    match.team1[0],
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

        if (username === account.username || !username) {
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
                <Typography variant="h3">{profile.username}</Typography>
                <div>
                    Member since{' '}
                    {dayjs(profile.createDate).format('MMMM DD YYYY')}
                </div>
                <div>{profile.win} wins</div>
                <div>{profile.loss} losses</div>
                <div>{profile.disputes} unresolved disputes</div>
            </Paper>
            <Paper>
                <div className="m-4">
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Team A</TableCell>
                                    <TableCell align="right">Team B</TableCell>
                                    <TableCell align="right">Maps</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Result</TableCell>
                                    <TableCell align="right">
                                        Was Disputed
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => {
                                    if (
                                        i > (page + 1) * rowsPerPage - 1 ||
                                        i < page * rowsPerPage
                                    )
                                        return;
                                    return (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                onClick={() => {
                                                    console.log(row.name);
                                                }}
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
                                                {row.time}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.result}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.isDisputed ? 'Yes' : 'No'}
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
            </Paper>
        </div>
    );
};

export default Profile;
