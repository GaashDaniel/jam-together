import React, { useState, useEffect } from 'react';
import { Box, Chip, IconButton, Tooltip, Menu, MenuItem, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useSessionTimeout } from '../../hooks/useSessionTimeout';
export default function SessionStatus() {
    const { user } = useAuth();
    const { extendSession } = useSessionTimeout();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loginTime, setLoginTime] = useState(null);
    useEffect(() => {
        if (user && !loginTime) {
            setLoginTime(new Date());
        } else if (!user) {
            setLoginTime(null);
        }
    }, [user, loginTime]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };
    const getSessionDuration = () => {
        if (!loginTime) return 'Unknown';
        const now = new Date();
        const diffMs = now - loginTime;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const remainingMins = diffMins % 60;
        if (diffHours > 0) {
            return `${diffHours}h ${remainingMins}m`;
        }
        return `${remainingMins}m`;
    };
    if (!user) return null;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Session info - Auto-refreshes with activity">
                <Chip
                    icon={<AccessTime />}
                    label={`Active ${getSessionDuration()}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleClick}
                    sx={{ cursor: 'pointer' }}
                />
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: { minWidth: 200 },
                }}
            >
                <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                        Session active for: {getSessionDuration()}
                    </Typography>
                </MenuItem>
                <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                        Auto-extends with user activity
                    </Typography>
                </MenuItem>
                <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                        Auto-logout: 4 hours inactivity
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}