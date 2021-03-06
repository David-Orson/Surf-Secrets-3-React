// npm
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

// hooks
import { useServices } from '../../api/services';

// models
import { Account } from '../../api/models';

const createData = (
    name: string,
    games: number,
    wins: number,
    losses: number,
    disputes: number
) => {
    return { name, games, wins, losses, disputes };
};

const tableStyle = {
    header: { fontSize: 22 },
    hoverCell: {
        fontSize: 20,
        '&:hover': {
            cursor: 'pointer',
            color: blue[200],
        },
        color: blue[500],
    },
    cell: { fontSize: 18 },
    winCell: { fontSize: 18, color: 'lightGreen' },
    lossCell: { fontSize: 18, color: 'red' },
};

const Leaderboard = () => {
    // hooks
    const { getAllAccount } = useServices();
    const navigate = useNavigate();

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
            <Typography
                sx={{ padding: 2, color: 'white' }}
                variant="h4"
                gutterBottom
            >
                Leaderboard
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableStyle.header}>Player</TableCell>
                            <TableCell sx={tableStyle.header} align="right">
                                Games
                            </TableCell>
                            <TableCell sx={tableStyle.header} align="right">
                                Wins
                            </TableCell>
                            <TableCell sx={tableStyle.header} align="right">
                                Losses
                            </TableCell>
                            <TableCell sx={tableStyle.header} align="right">
                                Disputes
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
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={tableStyle.hoverCell}
                                        component="th"
                                        scope="row"
                                        onClick={() => {
                                            navigate(`/profile/${row.name}`);
                                        }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        sx={tableStyle.cell}
                                        align="right"
                                    >
                                        {row.games}
                                    </TableCell>
                                    <TableCell
                                        sx={tableStyle.winCell}
                                        align="right"
                                    >
                                        {row.wins}
                                    </TableCell>
                                    <TableCell
                                        sx={tableStyle.lossCell}
                                        align="right"
                                    >
                                        {row.losses}
                                    </TableCell>
                                    <TableCell
                                        sx={tableStyle.cell}
                                        align="right"
                                    >
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
