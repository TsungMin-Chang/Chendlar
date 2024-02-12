'use client';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SideBar from './SideBar';

export default function NavBar() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{backgroundColor: "rgba(83, 57, 27, 1)"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenSideBar(true)}
            >
              <MenuIcon id="menuIcon"/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              February
            </Typography>
            <div className='flex grow'></div>
            <AccountCircle />
          </Toolbar>
        </AppBar>
      </Box>
      <SideBar
        openSideBar={openSideBar} 
        onCloseSideBar={() => setOpenSideBar(false)}
      />
    </>
  );
}