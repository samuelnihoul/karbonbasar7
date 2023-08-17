import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, Avatar, MenuItem
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Hashpack from './HashButton';
import { ConnectionInfo } from './ConnectionInfo';

export default function ResponsiveAppBar() {
  const { i18n, t } = useTranslation(['navbar']);
  const routes = ['home', 'reductions', 'about', 'corporate'];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderMenuItems = () =>
    routes.map((page) => (
      <MenuItem key={t(page)} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">
          <a href={page === 'home' ? '/' : page}>{t(page)}</a>
        </Typography>
      </MenuItem>
    ));

  const renderDesktopButtons = () =>
    routes.map((page) => (
      <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
        <a href={page === 'home' ? '/' : page}>{t(page)}</a>
      </Button>
    ));

  React.useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang && lang.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <AppBar position="static" color='transparent'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop view */}
          <Avatar src='/pure2.png' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" component="a" href="/" sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
            KB
          </Typography>

          {/* Mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu >
              {renderMenuItems()}
              <MenuItem>
                <Hashpack />
                <ConnectionInfo />
              </MenuItem>
            </Menu>
          </Box>

          <Avatar src='/pure2.png' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" component="a" href="" sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
            KB
          </Typography>

          <Box sx={{ alignItems: 'center', gap: 3, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderDesktopButtons()}
            <Box sx={{ flexGrow: 2 }} />
            <Hashpack />
            <ConnectionInfo />
            <select value={localStorage.getItem("i18nextLng")} onChange={handleLanguageChange} className='pl-5 bg-black'>
              <option value="en">🇺🇸</option>
              <option value="fr">🇫🇷</option>
            </select>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

