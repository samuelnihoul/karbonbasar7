'use client'
import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu,
    Container, Button, Avatar, MenuItem
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Hashpack from './HashButton';
import { ConnectionInfo } from './ConnectionInfo';
import routes from '../data/navbar-data'
export default function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }
    const renderMenuItems = () =>
        routes.map((page) => (
            <MenuItem key={page.address} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                    <a href={page.address}>{page.nav}</a>
                </Typography>
            </MenuItem>
        ));
    const renderDesktopButtons = () =>
        routes.map((page) => (
            <Button key={page.address} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <a href={page.address}>{page.nav}</a>
            </Button>
        ));
    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', xl: 'none', lg: 'none', sm: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                            {renderMenuItems()}
                            <Hashpack />
                            <MenuItem>
                                <ConnectionInfo />
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Avatar src='/assets/images/pure2.png' sx={{ display: { xs: 'flex', md: 'none', xl: 'none', lg: 'none', sm: 'none' }, mr: 1 }} />
                    <Typography variant="h5" component="a" href="" sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none', xl: 'none', lg: 'none', sm: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        KB
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

