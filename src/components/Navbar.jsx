import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem';
import Metamask from '../lib/metamask'
import Hashpack from '../lib/hashconnect'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

function ResponsiveAppBar() {
  const { i18n, t } = useTranslation(['navbar'])
  const routes = ['home', 'emission reductions', 'about']
  React.useEffect(
    () => {
      if (
        localStorage.getItem("i18nextLng")?.length > 2
      ) {
        i18next.changeLanguage("en")
      }
    }, []
  )
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }
  const [anchorElNav, setAnchorElNav] = React.useState < null | HTMLElement > (null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" color='transparent'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src='/pure2.png' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map((page) => (
                <MenuItem key={t(page)} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><a href={page == 'home' ? '/' : page}>{t(page)}</a></Typography>
                </MenuItem>
              ))}
              <MenuItem><Hashpack ></Hashpack></MenuItem>
              <MenuItem><Metamask ></Metamask></MenuItem>
            </Menu>
          </Box>
          <Avatar src='/pure2.png' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><a href={page == 'home' ? '/' : page}>
                  {t(page)}</a>
              </Button>
            ))}<Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}></Box>
            <Hashpack  ></Hashpack>
            <Metamask ></Metamask>
            <select
              value={localStorage.getItem("i18nextLng")}
              onChange={handleLanguageChange}
              className='pl-5 bg-black'
            >
              <option value="en">🇺🇸</option>
              <option value="fr">🇫🇷</option>
            </select>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
