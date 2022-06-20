import Container from '@mui/material/Container';
import React, { useState } from 'react';
import axios from "axios";
import {
    Box, Button, Card, CardActions, CardContent,
    InputAdornment, Input, InputLabel, FormControl
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function recovery() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const baseURL = process.env.REACT_APP_BASE_URL;



    const handleChangeEmail = () => (event) => {
        setEmail(event.target.value);
    };
    async function sendCredentials(user) {
        let options = {
            method: "post",
            url: `${baseURL}/recoveryPassword`,
            crossdomain: true,
            data: user,
        };
        try {
            await axios(options);
        } catch (err) {
            let errText = err.response.data.error
            setError(errText);
        }
    }

    const recoverUser = () => {
        let user = {};
        user.email = email.toLowerCase();
        sendCredentials(user);
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '5%' }}>
                <Card sx={{ width: 1 / 2, textAlign: 'center' }}>
                    <CardContent>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                            <Input
                                value={email}
                                onChange={handleChangeEmail()}
                                required
                                endAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Box
                            m='auto'>
                            <Button
                                onClick={() => { recoverUser() }}
                                variant="contained">Next</Button>
                        </Box>
                        <div id="loginErrorMsg">{error}</div>
                    </CardActions>
                </Card>
            </Box>
        </Container >
    );
}



