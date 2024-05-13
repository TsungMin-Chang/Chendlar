"use client";

import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

import IconButton from "@mui/material/IconButton";

import AddDialog from "./AddDialog";

export default function AddButton() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <IconButton
        className="absolute bottom-5 right-0 z-50"
        onClick={() => setOpenDialog(true)}
      >
        <RiAddCircleFill size={65} color="rgba(175, 164, 147, 0.8)" />
      </IconButton>
      <AddDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
