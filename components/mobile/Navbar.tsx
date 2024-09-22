import React from 'react';
import { AppBar, Container, Toolbar, Avatar, Typography, MenuItem } from '@mui/material';

const MobileNavbar = ({ routes, handleCloseNavMenu }) => {
    const renderMenuItems = () =>
        routes.map((page) => (
            <MenuItem key={page.address} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                    <a href={page.address}>{page.nav}</a>
                </Typography>
            </MenuItem>
        ));

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar src='/assets/images/pure2.png' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    {renderMenuItems()}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MobileNavbar;