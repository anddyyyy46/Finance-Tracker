import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTransactionsMutations } from '@/mutations/useTransactionsMutations';
import { ReadTransactionDto } from '@/dtos/Dtos';
import AddBtn from '@/components/AddBtn';
import Link from 'next/link';
import { useRouter } from 'next/router';

/*const rows: DataRow[] = 
[
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'David', email: 'david@example.com' },
    { id: 5, name: 'Eve', email: 'eve@example.com' },
    { id: 6, name: 'Frank', email: 'frank@example.com' },
];*/

export default function TablePage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const router = useRouter();
    const curRoute = router.pathname;

    const {getAllTransactions} = useTransactionsMutations();
    const { data, isLoading, isError, refetch } = getAllTransactions;
    useEffect(() => {
        
      }, []);


    const rows: ReadTransactionDto[] = data ?? []

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Link href={`${curRoute}/${row.id}`}>
                                        {row.id}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.user.fullname}</TableCell>
                                <TableCell>{row.amount}</TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[3, 5, 10]}
            />
        
        <AddBtn pathName='/transactions'></AddBtn>
        </div>
    );
}