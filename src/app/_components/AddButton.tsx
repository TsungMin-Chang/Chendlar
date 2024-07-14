"use client";

import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

import IconButton from "@mui/material/IconButton";

import useGoogleCalendarContext from "@/hooks/useGoogleCalendarContext";

import AddDialog from "./AddDialog";

export default function AddButton() {
  const [openDialog, setOpenDialog] = useState(false);
  const { expireTime, setIsValid } = useGoogleCalendarContext();
  return (
    <div className="fixed bottom-5 right-0 z-50 flex">
      <IconButton
        onClick={() => {
          if (!expireTime || Number(expireTime) < new Date().getTime()) {
            setIsValid(false);
            return;
          }
          setOpenDialog(true);
        }}
      >
        <RiAddCircleFill size={65} color="rgba(175, 164, 147, 0.67)" />
      </IconButton>
      <AddDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}
