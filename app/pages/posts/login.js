import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import { useDispatch } from "react-redux";
import Link from 'next/link'
import {
    Box, Button, IconButton, Card, CardActions, CardContent,
    InputAdornment, Input, InputLabel, FormControl
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {setIsLoggedInTrue} from './../../state/actions/isloggedIn'
import {setToken} from './../../state/actions/token'


const initialState = {
    incorrectCredentials: "",
    requiredFieldEmail: false,
    requiredFieldPassword: false,
    emailText: "",
    passwordText: ""
};

export default function login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [{
        incorrectCredentials,
        requiredFieldPassword,
        requiredFieldEmail
    }, setError] = useState(initialState);





    const handleChangeEmail = () => (event) => {
        setEmail(event.target.value);
    };
    const handleChangePass = () => (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function sendCredentials(user) {
        let options = {
            method: "post",
            url: `${baseURL}/login`,
            crossdomain: true,
            data: user,
        };
        try {
            const response = await axios(options);
            const { token } = response.data;
            dispatch(setToken(token));
            dispatch(setIsLoggedInTrue());
            router.push("/posts/contacts")
        } catch (err) {
            let errText = err.response.data.error
            if (err.response.status == 400) {
                if (errText.includes("email")) {
                    setError({ emailText: errText, requiredFieldEmail: true })
                }
                if (errText.includes("password")) {
                    setError({ passwordText: errText, requiredFieldPassword: true })
                }
            }
            if (err.response.status == 401) {
                setError({ incorrectCredentials: errText, requiredFieldEmail: true, requiredFieldPassword: true })
            }
        }
    }


    
    const loginUser = () => {
        let user = {};
        user.email = email.toLowerCase();
        user.password = password;
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
                                placeholder="me@nowports.com"
                                error={requiredFieldEmail}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChangePass()}
                                required
                                error={requiredFieldPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Link href="/posts/recovery">
                                <a>Forgot email?</a>
                            </Link>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Box
                            m='auto'>
                            <Button onClick={loginUser} variant="contained">Login</Button>
                        </Box>
                        <div id="loginErrorMsg">{incorrectCredentials}</div>
                    </CardActions>
                </Card>
            </Box>
        </Container >
    );
}



