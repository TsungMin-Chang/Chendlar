"use client";

import { useState } from "react";

import Image from "next/image";

import { Icon } from "@iconify/react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import useDateContext from "@/hooks/useDateContext";
import { months } from "@/lib/utils";

import EmotionDialog from "./EmotionDialog";
import { iconOptions } from "./EmotionDialog";
import SideBar from "./SideBar";

export default function NavBar() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openEmotionDialog, setOpenEmotionDialog] = useState(false);
  const [emotion, setEmotion] = useState(0);
  const { date } = useDateContext();

  const currentYear = new Date().getFullYear();
  return (
    <div style={{ height: "6vh" }}>
      <Box className="flex-none" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="bg-[#53391B]">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpenSideBar(true);
              }}
            >
              <MenuIcon />
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
            <div className="flex grow"></div>
            <span onClick={() => setOpenEmotionDialog(true)}>
              {emotion === 0 ? (
                <Image
                  src="/chandler_cartoon-removebg.png"
                  width={28}
                  height={28}
                  alt="chandler cartoon"
                />
              ) : (
                <Icon
                  icon={iconOptions[emotion - 1]}
                  style={{ fontSize: "29px" }}
                />
              )}
            </span>
          </Toolbar>
        </AppBar>
      </Box>
      <SideBar
        openSideBar={openSideBar}
        onCloseSideBar={() => setOpenSideBar(false)}
      />
      <EmotionDialog
        open={openEmotionDialog}
        onClose={() => setOpenEmotionDialog(false)}
        emotion={emotion}
        setEmotion={setEmotion}
      />
    </div>
  );
}
