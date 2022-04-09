// npm
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

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
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

// hooks
import { useServices } from '../../api/services';

// models
import { FinderPost } from '../../api/models';
import { RootState } from '../../redux/store';

// componenets
import FinderPostCreator from '../components/FinderPostCreator';
import Confirm from '../components/Confirm';

const createData = (id: number, maps: string, games: number, time: Date) => {
    return { id, maps, games, time };
};

const MatchFinder = () => {
    // hooks
    const { getAllFinderPosts, acceptMatch } = useServices();
    const navigate = useNavigate();

    // reactive
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [finderPost, setFinderPost] = useState<FinderPost>({
        id: 0,
    } as FinderPost);

    const userPostIds = useSelector(
        (state: RootState) => state.account.finderPostIds
    );

    // props
    const rowsPerPage = 10;

    // methods
    const changePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const accept = async () => {
        setIsConfirmLoading(true);

        const match = await acceptMatch(finderPost.id);

        setIsConfirmLoading(false);
        setIsConfirmVisible(false);

        navigate(`/match/${match.id}`);
    };

    const refreshTable = async (cancelled?: boolean) => {
        let rowData: any[] = [];
        let posts: FinderPost[];

        posts = await getAllFinderPosts();
        if (cancelled) return;

        posts?.forEach((post) => {
            rowData.push(
                createData(
                    post.id,
                    post.maps[0].name,
                    post.maps.length,
                    post.time
                )
            );
        });

        setRows(rowData.sort((a, b) => b.wins - a.wins));
    };

    // lifecycle
    useEffect(() => {
        let cancelled = false;

        refreshTable(cancelled);

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
                Match Finder
            </Typography>
            <Button
                sx={{ marginBottom: 4 }}
                variant={'contained'}
                onClick={() => setIsCreateVisible(true)}
            >
                Create Match
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
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => {
                            if (
                                i > (page + 1) * rowsPerPage - 1 ||
                                i < page * rowsPerPage
                            )
                                return null;
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={
                                        userPostIds &&
                                        userPostIds.includes(row.id)
                                            ? {
                                                  '&:last-child td, &:last-child th':
                                                      {
                                                          border: 0,
                                                      },
                                                  bgcolor: blue[900],
                                                  height: 60,
                                              }
                                            : {
                                                  '&:last-child td, &:last-child th':
                                                      {
                                                          border: 0,
                                                      },
                                                  height: 60,
                                              }
                                    }
                                >
                                    <TableCell component="th" scope="row">
                                        {row.maps}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.games}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userPostIds &&
                                        userPostIds.includes(row.id) ? (
                                            <Typography>
                                                {dayjs(row.time).format(
                                                    'h:mm A MMM-DD YYYY'
                                                )}
                                            </Typography>
                                        ) : (
                                            <Typography color="primary">
                                                {dayjs(row.time).format(
                                                    'h:mm A MMM-DD YYYY'
                                                )}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {userPostIds &&
                                        userPostIds.includes(row.id) ? null : (
                                            <Button
                                                variant="contained"
                                                onClick={async () => {
                                                    await setFinderPost(row);
                                                    setIsConfirmVisible(true);
                                                }}
                                            >
                                                Accept
                                            </Button>
                                        )}
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
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <FinderPostCreator
                        setIsCreateVisible={setIsCreateVisible}
                        refreshTable={refreshTable}
                    />
                </Box>
            </Modal>

            <Modal
                open={isConfirmVisible}
                onClose={() => setIsConfirmVisible(false)}
            >
                <Box
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <Confirm
                        setIsConfirmVisible={setIsConfirmVisible}
                        confirm={accept}
                        action="accept this match"
                        isLoading={isConfirmLoading}
                        setIsLoading={setIsConfirmLoading}
                    >
                        <div>
                            <span className="text-yellow-200">
                                {finderPost.maps}
                            </span>
                            {'  '}
                            at{'  '}
                            <span className="text-blue-400">
                                {' '}
                                {dayjs(finderPost.time).format('h:mm A')}
                            </span>
                            <div className="text-blue-400 text-center mt-1">
                                {dayjs(finderPost.time).format('MMM-DD YYYY')}
                            </div>{' '}
                        </div>
                    </Confirm>
                </Box>
            </Modal>
        </div>
    );
};

export default MatchFinder;
