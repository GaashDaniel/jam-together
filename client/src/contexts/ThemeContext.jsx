import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { blueGrey, deepOrange, grey } from '@mui/material/colors';
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode || 'dark';
    });
    const toggleColorMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: mode === 'dark' ? deepOrange[500] : deepOrange[700],
                    },
                    secondary: {
                        main: mode === 'dark' ? blueGrey[500] : blueGrey[700],
                    },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#fafafa',
                        paper: mode === 'dark' ? grey[900] : grey[200],
                    },
                },
                typography: {
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    h1: {
                        fontSize: '3rem',
                        fontWeight: 700,
                    },
                    h2: {
                        fontSize: '2.5rem',
                        fontWeight: 600,
                    },
                    h3: {
                        fontSize: '2rem',
                        fontWeight: 600,
                    },
                    h4: {
                        fontSize: '1.75rem',
                        fontWeight: 500,
                    },
                    h5: {
                        fontSize: '1.5rem',
                        fontWeight: 500,
                    },
                    h6: {
                        fontSize: '1.25rem',
                        fontWeight: 500,
                    },
                },
                shape: {
                    borderRadius: 8,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                            },
                        },
                    },
                },
            }),
        [mode]
    );
    const value = {
        mode,
        toggleColorMode,
    };
    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
export default ThemeContext;