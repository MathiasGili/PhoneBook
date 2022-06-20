import axios from "axios";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";

import {
    Card, CardHeader, TextField, Button, Box,Container, CardContent,FormControl,Stack
} from '@mui/material';
import { setIsLoggedInTrue } from './../../state/actions/isloggedIn'
import { setToken } from './../../state/actions/token'

export default function recovery() {
    const router = useRouter();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setPassword(router.query.pass);
        setEmail(router.query.email);
    }, [router.query.pass]);

    const updatePassword = () => {
        async function sendCredentials(email, password, newPassword) {
            let options = {
                method: "patch",
                url: `${baseURL}/user`,
                crossdomain: true,
                data: { email, password, newPassword },
            };
            try {
                const response = await axios(options);
                const { token } = response.data;

                dispatch(setToken(token));
                dispatch(setIsLoggedInTrue());
                router.push('contacts');
            } catch (err) {
                let errText = err.response.data.error
                if (errText) {
                    setError(errText)
                }
            }
        }

        sendCredentials(email, password, newPassword);
    };
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '5%' }}>
                <Card sx={{ width: 1, textAlign: 'center' }}>
                    <CardHeader title='Recovery Password' ></CardHeader>
                    <CardContent>
                        <FormControl>
                            <Stack Stack spacing={2} direction="column">

                                <TextField
                                    id="pwdRecoveryNewPassword"
                                    label="New Password"
                                    variant="filled"
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                                <Box>

                                    <Button id="pwdRecoverySaveBtn" onClick={updatePassword} variant="contained" color="primary">
                                        Save new password
                                    </Button>
                                    <div id="pwdRecoveryErrorMsg">{error}</div>
                                </Box>
                            </Stack>
                        </FormControl>
                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}
