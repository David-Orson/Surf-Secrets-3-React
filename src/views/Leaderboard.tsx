// npm
import React, { useEffect, useState } from 'react';

// mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

// hooks
import { useServices } from '../api/services';

// models
import { Account } from '../api/models';

const createData = (
    name: string,
    games: number,
    wins: number,
    losses: number,
    disputes: number
) => {
    return { name, games, wins, losses, disputes };
};

const Leaderboard = () => {
    // hooks
    const { getAllAccount } = useServices();

    // reactive
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);

    // props
    const rowsPerPage = 10;

    // methods
    const changePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // lifecycle
    useEffect(() => {
        let rowData: any[] = [];
        let cancelled = false;
        let accounts: Account[];

        const request = async () => {
            accounts = await getAllAccount();
            if (cancelled) return;

            accounts.forEach((account) => {
                rowData.push(
                    createData(
                        account.username,
                        account.win + account.loss + account.disputes,
                        account.win,
                        account.loss,
                        account.disputes
                    )
                );
            });

            setRows(rowData.sort((a, b) => b.wins - a.wins));
        };

        request();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="m-4">
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell align="right">Games</TableCell>
                            <TableCell align="right">Wins</TableCell>
                            <TableCell align="right">Losses</TableCell>
                            <TableCell align="right">Disputes</TableCell>
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
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
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
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.games}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.wins}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.losses}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.disputes}
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
    );
};

export default Leaderboard;
