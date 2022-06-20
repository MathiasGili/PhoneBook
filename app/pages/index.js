
import Container from '@mui/material/Container';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('posts/login');
  }, []);

  return (
    <Container maxWidth="sm">
    </Container >
  );
}



