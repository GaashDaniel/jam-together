import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
export default function Layout({ children }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: { xs: 2, sm: 3 },
                    px: { xs: 1, sm: 2 },
                    minHeight: 'calc(100vh - 64px - 200px)', 
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        px: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    {children}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}