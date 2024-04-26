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
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === 1 && "outline"}`}
            onClick={() => setEmotion(1)}
          >
            <Icon
              icon="fluent-emoji-flat:slightly-smiling-face"
              style={{ fontSize: "36px" }}
            />
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === 2 && "outline"}`}
            onClick={() => setEmotion(2)}
          >
            <Icon
              icon="fluent-emoji-flat:frowning-face"
              style={{ fontSize: "36px" }}
            />
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === 3 && "outline"}`}
            onClick={() => setEmotion(3)}
          >
            <Icon
              icon="fluent-emoji-flat:angry-face"
              style={{ fontSize: "36px" }}
            />
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === 4 && "outline"}`}
            onClick={() => setEmotion(4)}
          >
            <Icon
              icon="fluent-emoji-flat:face-with-open-mouth"
              style={{ fontSize: "36px" }}
            />
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full ${emotion === 5 && "outline"}`}
            onClick={() => setEmotion(5)}
          >
            <Icon
              icon="fluent-emoji-flat:face-with-head-bandage"
              style={{ fontSize: "36px" }}
            />
          </button>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="grow" />
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
