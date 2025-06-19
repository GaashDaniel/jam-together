import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
export default function LoadingIconButton({
    loading = false,
    children,
    disabled = false,
    onClick,
    loadingSize = 24,
    ...other
}) {
    const handleClick = (event) => {
        if (!loading && onClick) {
            onClick(event);
        }
    };
    return (
        <IconButton {...other} disabled={disabled || loading} onClick={handleClick}>
            {loading ? <CircularProgress size={loadingSize} /> : children}
        </IconButton>
    );
}