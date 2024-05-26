import type { Dispatch, SetStateAction } from "react";

import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type EmotionDialogProps = {
  open: boolean;
  onClose: () => void;
  emotion: number;
  setEmotion: Dispatch<SetStateAction<number>>;
};

export const iconOptions = [
  "fluent-emoji-flat:slightly-smiling-face",
  "fluent-emoji-flat:neutral-face",
  "fluent-emoji-flat:face-with-head-bandage",
  "fluent-emoji-flat:smiling-face",
  "fluent-emoji-flat:angry-face",
];

export default function AddDialog({
  open,
  onClose,
  emotion,
  setEmotion,
}: EmotionDialogProps) {
  return (
    <Dialog id="dia" open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        Emotion
      </DialogTitle>
      <DialogContent className="flex w-[300px] flex-col gap-y-2">
        <div className="mt-2 grid grid-cols-5 gap-2 p-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <button
                key={"emotion" + i}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === i + 1 && "outline"}`}
                onClick={() => setEmotion(i + 1)}
              >
                <Icon icon={iconOptions[i]} style={{ fontSize: "36px" }} />
              </button>
            ))}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="grow" />
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
