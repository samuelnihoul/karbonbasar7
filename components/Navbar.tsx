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
    <AppBar position="sticky" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ alignItems: 'center', gap: 3, flexGrow: 1, display: 'flex' }}><a href="/" className='color-white'><Avatar src='/assets/images/pure2.png' /></a>
            {renderDesktopButtons()}
            <Box sx={{ flexGrow: 2 }} />
            <Hashpack />
            <ConnectionInfo />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

