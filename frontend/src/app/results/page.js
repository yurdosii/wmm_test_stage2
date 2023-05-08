"use client"

import { useEffect, useState } from "react";

import { BACKEND_BASE_URL } from "../constants";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ResultsTable() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_BASE_URL}/surveys/`)
            .then((response) => response.json())
            .then((data) => setTableData(data))
            .catch((error) => console.error(error));
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>survey_uid</TableCell>
                        <TableCell>store_name</TableCell>
                        <TableCell>gift_card_balance</TableCell>
                        <TableCell>gift_card_price</TableCell>
                        <TableCell>network</TableCell>
                        <TableCell>wallet_address</TableCell>
                        <TableCell>email_address</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.survey_uid}>
                            <TableCell>{row.survey_uid}</TableCell>
                            <TableCell>{row.store_name}</TableCell>
                            <TableCell>{row.gift_card_balance}</TableCell>
                            <TableCell>{row.gift_card_price}</TableCell>
                            <TableCell>{row.network}</TableCell>
                            <TableCell>{row.wallet_address}</TableCell>
                            <TableCell>{row.email_address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}
