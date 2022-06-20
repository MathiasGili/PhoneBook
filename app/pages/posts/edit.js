import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import axios from "axios";
import {
    Box, Card, CardContent, CardHeader, FormControl, TextField, Stack, Button,Container
} from '@mui/material';

const newUserErrorInitialState = {
    userNotFound: "",
    requiredFieldFirstName: false,
    requiredLastName: false,
    requiredFieldPhone: false,
    phoneText: "",
    firstNameText: "",
    lastNameText: "",
}

export default function edit() {
    const baseURL = process.env.REACT_APP_BASE_URL
    const router = useRouter();
    const token = useSelector((state) => state.token);
    const [{
        requiredFieldFirstName,
        requiredLastName,
        requiredFieldPhone,
        phoneText,
        firstNameText,
        lastNameText
    }, setError] = useState(newUserErrorInitialState)

    const [updatedContact, setUpdatedContact] = useState({ firstName: "", lastName: "", phone: "", _id: "" });
    

    useEffect(() => {
        setUpdatedContact({ firstName: router.query.firstName, lastName: router.query.lastName, phone: router.query.phone, _id: router.query._id })
    }, [router.query.firstName]);

    const updateContact = async () => {
        
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
            let errText = err.response.data.error
            if (err.response.status == 400) {
                if (errText.includes("First name")) {
                    setError({ firstNameText: errText, requiredFieldFirstName: true })
                }
                if (errText.includes("Last name")) {
                    setError({ lastNameText: errText, requiredLastName: true })
                }
                if (errText.includes("Phone")) {
                    setError({ phoneText: errText, requiredFieldPhone: true })
                }
            }
            if (err.response.status == 401) {
                setError({
                    userNotFound: errText,
                    requiredFieldPhone: true,
                    requiredLastName: true,
                    requiredFieldFirstName: true
                })
            }
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
                                    helperText={firstNameText}
                                    error={requiredFieldFirstName}
                                />
                                <TextField
                                    id="outlined-bas"
                                    label="Last name"
                                    variant="outlined"
                                    focused
                                    required
                                    defaultValue={router.query.lastName}
                                    onChange={e => setUpdatedContact({ ...updatedContact, lastName: e.target.value })}
                                    helperText={lastNameText}
                                    error={requiredLastName}
                                />
                                <TextField
                                    id="outlined-b"
                                    label="Phone"
                                    variant="outlined"
                                    focused
                                    required
                                    defaultValue={router.query.phone}
                                    onChange={e => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                                    helperText={phoneText}
                                    error={requiredFieldPhone}
                                />

                                <Box
                                    m='auto'>
                                    <Button onClick={() => { updateContact() }} variant="contained">Update</Button>
                                </Box>
                            </Stack>
                        </FormControl>
                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}




