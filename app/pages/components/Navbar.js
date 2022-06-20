

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    AppBar, Box, Toolbar, Typography, IconButton, Container, Button

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'

const Navbar = () => {

    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLogged(localStorage.getItem("isLogged"));
        }
    }, []);

    const changeState = () => {
        if (isLogged) {

            localStorage.removeItem('token');
            localStorage.setItem('isLogged', false);
            router.push('/posts/login');
        }
    };

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
                        {console.log(isLogged)}
                        {isLogged ?
                            (
                                <Button
                                    sx={{ color: 'white' }}
                                    onClick={() => { changeState() }}
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