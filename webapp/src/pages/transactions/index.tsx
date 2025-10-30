import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { useTransactionsMutations } from '@/mutations/useTransactionsMutations';
import AddBtn from '@/components/AddBtn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DeleteOutline } from '@mui/icons-material';
import { format } from 'date-fns';
import { ReadTransactionDto } from '@/util';


export default function TablePage() {

    const router = useRouter();
    const curRoute = router.pathname;

    const {getAllTransactions, deleteTransaction} = useTransactionsMutations();
    const { data } = getAllTransactions;

    const rows: ReadTransactionDto[] = data ?? []


    const handleDelete = async(id: string) => {
        await deleteTransaction.mutateAsync(parseInt(id));

    }

    return (
        <div className="flex-1 min-h-0 flex flex-col">
            <TableContainer className='flex-1 overflow-auto'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Betrag</strong></TableCell>
                            <TableCell><strong>Datum</strong></TableCell>
                            <TableCell><strong>Kategorie</strong></TableCell>
                            <TableCell><strong>Transaktionsmedium</strong></TableCell>
                            <TableCell><strong>Transaktionspartner</strong></TableCell>
                           {/*  <TableCell><strong>Eintragsdatum</strong></TableCell>*/}
                            <TableCell style={{width: "50px"}}></TableCell>
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
                                <TableCell>{row.amount}</TableCell> 
                                <TableCell>{row.date ? format(row.date, 'dd.MM.yyyy') : '-'}</TableCell>
                                <TableCell>{row.category?.title}</TableCell> 
                                <TableCell>{row.transactionMedium}</TableCell> 
                                <TableCell>{row.paymentPartner?.name}</TableCell> 
                               {/* <TableCell>{row.createdAt?.getDate()}</TableCell> */}
                                <TableCell onClick={()=>handleDelete(row.id)}>
                                    <IconButton>
                                        <DeleteOutline></DeleteOutline>
                                    </IconButton>
                                </TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*<TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[3, 5, 10]}
            />*/}
        
        <AddBtn pathName='/transactions'></AddBtn>
        </div>

    );
}