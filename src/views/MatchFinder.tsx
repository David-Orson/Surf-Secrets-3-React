// npm
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// mui
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// hooks
import { useServices } from '../api/services';

// models
import { FinderPost } from '../api/models';

// componenets
import FinderPostCreator from '../components/FinderPostCreator';

const createData = (maps: string, games: number, t: Date) => {
    const time = dayjs(t).format('hh mm A');
    console.log(time);
    return { maps, games, time };
};

const MatchFinder = () => {
    // hooks
    const { getAllFinderPosts } = useServices();

    // reactive
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [isCreateVisible, setIsCreateVisible] = useState(false);

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
        let posts: FinderPost[];

        const request = async () => {
            posts = await getAllFinderPosts();
            if (cancelled) return;

            posts?.forEach((post) => {
                rowData.push(
                    createData(post.maps[0].name, post.maps.length, post.time)
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
            <Button
                variant={'contained'}
                onClick={() => setIsCreateVisible(true)}
            >
                Create Post
            </Button>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Maps</TableCell>
                            <TableCell align="right">Games</TableCell>
                            <TableCell align="right">Time</TableCell>
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
                                        {row.maps}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.games}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.time}
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
            <Modal
                open={isCreateVisible}
                onClose={() => setIsCreateVisible(false)}
            >
                <Box
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2 p-4"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <FinderPostCreator
                        setIsCreateVisible={setIsCreateVisible}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default MatchFinder;
