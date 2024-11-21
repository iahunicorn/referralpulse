import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ userName, onProfileClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/campaigns">Campaigns</Button>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          aria-label="account of current user"
          onClick={onProfileClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;