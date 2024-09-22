'use client'
import React from 'react';
import { useMediaQuery } from '@mui/material';
import MobileNavbar from './mobile/Navbar';
import DesktopNavbar from './desktop/Navbar';
import routes from '../data/navbar-data'
const Navbar = () => {
  const isMobile = useMediaQuery(`(max-width: 600px)`);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return isMobile ? (
    <MobileNavbar routes={routes} handleCloseNavMenu={handleCloseNavMenu} />
  ) : (
    <DesktopNavbar routes={routes} handleCloseNavMenu={handleCloseNavMenu} />
  );
};

export default Navbar;