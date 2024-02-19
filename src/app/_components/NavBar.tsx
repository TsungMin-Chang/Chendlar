"use client";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SideBar from './SideBar';
import useDateContext from "@/hooks/useDateContext";

export default function NavBar() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const {date} = useDateContext();
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <>
      <Box 
        className="flex-none" 
        sx={{ flexGrow: 1}}
      >
        <AppBar position="static">
          <Toolbar className="bg-[#53391B]">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenSideBar(true)}
            >
              <MenuIcon/>
            </IconButton>
            {date.getFullYear() === currentYear ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {months[date.getMonth()]}
              </Typography>
            ) : (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {months[date.getMonth()]} {date.getFullYear()}
              </Typography>
            )}
            <div className='flex grow'></div>
            <AccountCircle sx={{ fontSize: 30 }}/>
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