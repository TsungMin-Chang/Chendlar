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
        className="absolute bottom-2 right-0 z-50"
        onClick={() => setOpenDialog(true)}
      >
        <RiAddCircleFill size={65} color="rgba(116, 113, 110, 1)" />
      </IconButton>
      <AddDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
