import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid, Divider } from '@mui/material';
import { MusicNote, GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[900],
                py: 3,
                px: 2,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <MusicNote sx={{ mr: 1 }} />
                            <Typography variant="h6" color="text.primary">
                                JamTogether
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Connecting musicians worldwide for unforgettable jam sessions.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: admin@jam-together.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +1 (555) 123-4567
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton
                                aria-label="github"
                                color="primary"
                                component={Link}
                                href="https:
                                target="_blank"
                            >
                                <GitHub />
                            </IconButton>
                            <IconButton
                                aria-label="linkedin"
                                color="primary"
                                component={Link}
                                href="https:
                                target="_blank"
                            >
                                <LinkedIn />
                            </IconButton>
                            <IconButton
                                aria-label="twitter"
                                color="primary"
                                component={Link}
                                href="https:
                                target="_blank"
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                aria-label="email"
                                color="primary"
                                component={Link}
                                href="mailto:admin@jam-together.com"
                            >
                                <Email />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                    © {currentYear} JamTogether. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}