

import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    AppBar, Box, Toolbar, Typography, IconButton, Container, Button
} from '@mui/material';
import { useRouter } from 'next/router'
import {  setIsLoggedInFalse } from './../../state/actions/isloggedIn'
import { removeToken } from './../../state/actions/token'





const Navbar = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.isLoggedIn);

    const addUser = () => {
        router.push('/posts/newUser');
    };
    const login = () => {
        router.push('/posts/login');
    };
    return (

        <Container maxWidth="sm">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ backgroundColor: "black" }} position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            PhoneBook
                        </Typography>
                        {isLogged ?
                            (
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => {
                                        dispatch(setIsLoggedInFalse());
                                        dispatch(removeToken());
                                        router.push('/posts/login');
                                    }}
                                    variant="text">
                                    Logout
                                </Button>

                            ) : (
                                <>
                                    <Button
                                        sx={{ color: 'white' }}

                                        onClick={() => { login() }}
                                        variant="text"> Login
                                    </Button>

                                    <Button
                                        sx={{ color: 'white' }}
                                        onClick={() => { addUser() }}
                                        variant="text">
                                        Register
                                    </Button>
                                </>
                            )}
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    )
}

export default Navbar