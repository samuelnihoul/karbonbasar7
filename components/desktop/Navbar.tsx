import React from 'react';
import { AppBar, Container, Toolbar, Avatar, Typography, Button } from '@mui/material';

const DesktopNavbar = ({ routes, handleCloseNavMenu }) => {
    const renderDesktopButtons = () =>
        routes.map((page) => (
            <Button key={page.address} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'flex', mr: 2 }}>
                <a href={page.address}>{page.nav}</a>
            </Button>
        ));

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar src='/assets/images/pure2.png' sx={{ display: 'flex', mr: 1 }} />
                    <Typography variant="h6" component="a" href="/" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        Karbon Basar
                    </Typography>
                    {renderDesktopButtons()}
                    {/* warning that the payment system is down */}
                    <span style={{ backgroundColor: 'gold', padding: '5px', borderRadius: 10, fontWeight: 'bold', fontSize: '1rem' }}>Payment System Under Maintenance</span>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default DesktopNavbar;