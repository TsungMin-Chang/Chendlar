"use client";

import { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";

import IconButton from "@mui/material/IconButton";

import useDay from "@/hooks/useDay";

import AddDialog from "./AddDialog";

export default function AddButton() {
  const { setLoading } = useDay();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (!openDialog) {
      setLoading(false);
    }
  }, [openDialog]);
  return (
    <>
      <IconButton
        className="absolute bottom-2 right-0 z-50"
        onClick={() => setOpenDialog(true)}
      >
        <RiAddCircleFill size={65} color="rgba(163, 161, 158, 0.74)" />
      </IconButton>
      <AddDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
