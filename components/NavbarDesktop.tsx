import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, Avatar, MenuItem
} from '@mui/material';
import Hashpack from './HashButton';
import { ConnectionInfo } from './ConnectionInfo';
import routes from '../data/navbar-data'
export default function ResponsiveAppBar() {
  const renderDesktopButtons = () =>
    routes.map((page) => (
      <a href={page.address}>{page.nav}</a>
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

