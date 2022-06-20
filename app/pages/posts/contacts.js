
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import {
    Box, Button,  Card, CardContent, CardHeader, Fab
} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function contacts() {

    const router = useRouter();
    const baseURL = process.env.REACT_APP_BASE_URL
    const [contactsList, setContactsList] = useState([]);
    const fetchFailure = "FetchFailure"


    useEffect(() => {
        if (typeof window !== 'undefined') {
            getContacts(localStorage.getItem("token"));
        }
    }, []);


    async function getContacts(token) {
        let auth = `Bearer ${token}`
        let options = {
            method: "get",
            url: `${baseURL}/contacts`,
            crossdomain: true,
            headers: {
                'Authorization': auth.replace('"', '').replace('"', '')
            }
        };
        try {
            const response = await axios(options);
            const contactList = response.data.contactsList;
            setContactsList(contactList)
        } catch (err) {
            setContactsList([{ firstName: fetchFailure, lastName: fetchFailure, phone: fetchFailure, _id: fetchFailure }])
        }
    }



    const deleteContact = async (id) => {
        let token = localStorage.getItem("token");
        let auth = `Bearer ${token}`
        let options = {
            method: "delete",
            url: `${baseURL}/contacts/${id}`,
            crossdomain: true,
            headers: {
                'Authorization': auth.replace('"', '').replace('"', '')
            }
        };
        try {
            await axios(options);
            getContacts(token);
        } catch (err) {
            let errText = err.response.data.error
        }
    };
    const editContact = (row) => {
        router.push({
            pathname: '/posts/edit',
            query: row
        });
    };
    
    const addContact = () => {
        router.push('/posts/add');
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '5%' }}>
                <Card sx={{ width: 1, textAlign: 'center' }}>
                    <CardHeader title='Contacts' ></CardHeader>
                    <CardContent>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contactsList?.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.firstName}
                                            </TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">
                                                <Fab
                                                    size="small"
                                                    color="grey"
                                                    aria-label="add"
                                                    onClick={() => { editContact(row) }}>
                                                    <EditIcon sx={{ color: "green" }} />
                                                </Fab>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Fab
                                                    size="small"
                                                    color="grey"
                                                    aria-label="add"
                                                    onClick={() => { deleteContact(row._id) }}>
                                                    <DeleteIcon sx={{ color: "red" }} />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box
                            m='auto'>
                            <Button onClick={() => { addContact() }} variant="contained">Add</Button>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}




