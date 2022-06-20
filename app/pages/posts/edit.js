
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    Box, Card, CardContent, CardHeader, FormControl, TextField, Stack, Button
} from '@mui/material';



export default function edit() {

    const fetchFailure = "FetchFailure"
    const token = 'eyJhbGciOiJIUzI1NiJ9.bWF0aGlhcy5naWxpa0BnbWFpbC5jb20.WN0NVq0opn_OuXCaTDqBghG-xt_GxHSYrgs__OxmQBw';

    const baseURL = process.env.REACT_APP_BASE_URL
    const router = useRouter();
    const [errorTxt, setErrorTxt] = useState('');

    const [updatedContact, setUpdatedContact] = useState({ firstName: "", lastName: "", phone: "", _id: "" });


    useEffect(() => {
        console.log(router.query)
        setUpdatedContact({ firstName: router.query.firstName, lastName: router.query.lastName, phone: router.query.phone, _id: router.query._id })
    }, [router.query.firstName]);

    const updateContact = async () => {
        
        let token = localStorage.getItem("token");
        let auth = `Bearer ${token}`
        let options = {
            method: "patch",
            url: `${baseURL}/contacts`,
            crossdomain: true,
            data: updatedContact,
            headers: {
                'Authorization': auth.replace('"', '').replace('"', '')
            }
        };
        try {
            await axios(options);
            router.push("/posts/contacts");
        } catch (err) {
            setErrorTxt(err.response.data.error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '5%' }}>
                <Card sx={{ width: 1, textAlign: 'center' }}>
                    <CardHeader title='Edit contact' ></CardHeader>
                    <CardContent>
                        <FormControl>
                            <Stack Stack spacing={2} direction="column">

                                <TextField
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    focused
                                    required
                                    defaultValue={router.query.firstName}
                                    onChange={e => setUpdatedContact({ ...updatedContact, firstName: e.target.value })}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="last name"
                                    variant="outlined"
                                    focused
                                    required
                                    defaultValue={router.query.lastName}
                                    onChange={e => setUpdatedContact({ ...updatedContact, lastName: e.target.value })}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="phone"
                                    variant="outlined"
                                    focused
                                    required
                                    defaultValue={router.query.phone}
                                    onChange={e => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                                />

                                <Box
                                    m='auto'>
                                    <Button onClick={() => { updateContact() }} variant="contained">Update</Button>
                                    <div id="errosUpdate">{errorTxt}</div>
                                </Box>
                            </Stack>
                        </FormControl>
                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}




