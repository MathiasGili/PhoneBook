
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import {
    Box, Card, CardContent, CardHeader, FormControl, TextField, Stack, Button
} from '@mui/material';



const newContactInitialState = { firstName: "", lastName: "", phone: "" };

const newUserErrorInitialState = {
    userNotFound: "",
    requiredFieldFirstName: false,
    requiredLastName: false,
    requiredFieldPhone: false,
    phoneText: "",
    firstNameText: "",
    lastNameText: "",
}
export default function add() {

    const baseURL = process.env.REACT_APP_BASE_URL
    const router = useRouter();
    const [errorTxt] = useState('');

    const [newContact, setNewContact] = useState(newContactInitialState);
    const [{
        requiredFieldFirstName,
        requiredLastName,
        requiredFieldPhone,
        phoneText,
        firstNameText,
        lastNameText
    }, setError] = useState(newUserErrorInitialState)



    async function addContact(newContact) {


        let token = localStorage.getItem("token");
        let auth = `Bearer ${token}`
        let options = {
            method: "post",
            url: `${baseURL}/contacts`,
            crossdomain: true,
            data: newContact,
            headers: {
                'Authorization': auth.replace('"', '').replace('"', '')
            }
        };
        try {
            await axios(options);
            setNewContact(newContactInitialState);
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
    }

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
                                    required
                                    onChange={e => setNewContact({ ...newContact, firstName: e.target.value })}
                                    helperText={firstNameText}
                                    error={requiredFieldFirstName}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="last name"
                                    variant="outlined"
                                    required
                                    onChange={e => setNewContact({ ...newContact, lastName: e.target.value })}
                                    helperText={lastNameText}
                                    error={requiredLastName}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="phone"
                                    variant="outlined"
                                    required
                                    onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                                    helperText={phoneText}
                                    error={requiredFieldPhone}
                                />

                                <Box
                                    m='auto'>
                                    <Button onClick={() => { addContact(newContact) }} variant="contained">Add</Button>
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




