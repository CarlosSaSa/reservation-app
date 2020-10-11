/***
 * ARCHIVO DEL SIDEBAR
 */

import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography, makeStyles } from '@material-ui/core';
import { BarChart as BarChartIcon, LogOut as LogoutIcon, User as UserIcon } from 'react-feather';
import NavItem from './NavItem';
import { useSelector } from 'react-redux';

// elementos del menu que son mostrados en el sidebar
const items = [
  {
    href: '/home/dashboard/horarios',
    icon: BarChartIcon,
    title: 'Ver los horarios'
  },
  {
    href: '/home/dashboard/account',
    icon: UserIcon,
    title: 'Mi perfil'
  },
  {
    icon: LogoutIcon,
    title: 'Cerrar sesión'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 70,
    height: 70
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {

  // Obtener informacion del usuario
  const { nombre, apellido, correo } = useSelector(state => state.auth);

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src= ""
          to="/home/dashboard/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          { nombre + ' ' + apellido  }
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          { correo }
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
