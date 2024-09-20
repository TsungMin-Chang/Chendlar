import type { Dispatch, SetStateAction } from "react";
import { useState, useRef } from "react";

import { Icon } from "@iconify/react";
import { TextField } from "@mui/material";
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
  const [twMoney, setTwMoney] = useState(0);
  const [koreaMoney, setKoreaMoney] = useState(0);
  const oneTwToKor = useRef(41.5);
  const handleConvert = () => {
    if (!twMoney && !koreaMoney) {
      alert("Please input your spending value!");
      return;
    }
    if (koreaMoney > 0) {
      if (twMoney > 0) {
        if (
          !confirm(
            "You have entered two currencies. We will proceed with converting Korean currency to Taiwanese currency.",
          )
        ) {
          return;
        }
      }
      // convert kMoney to tMoney
      setTwMoney(Math.round(koreaMoney / oneTwToKor.current));
      return;
    }
    if (twMoney > 0) {
      // convert tMoney to kMoney
      setKoreaMoney(Math.round(twMoney * oneTwToKor.current));
      return;
    }
  };
  const handleClose = () => {
    setTwMoney(0);
    setKoreaMoney(0);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        Emotion
      </DialogTitle>
      <DialogContent className="flex w-[300px] flex-col gap-y-2">
        <div className="grid grid-cols-5 gap-2 p-2">
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

        <TextField
          id="quantity"
          inputProps={{ inputMode: "numeric" }}
          label={"Korean"}
          value={koreaMoney === 0 ? null : koreaMoney}
          onChange={(e) => {
            setKoreaMoney(!e.target.value ? 0 : parseInt(e.target.value));
          }}
          InputLabelProps={{ shrink: koreaMoney === 0 ? false : true }}
        />
        <TextField
          id="quantity"
          inputProps={{ inputMode: "numeric" }}
          label={"Taiwanese"}
          value={twMoney === 0 ? null : twMoney}
          onChange={(e) =>
            setTwMoney(!e.target.value ? 0 : parseInt(e.target.value))
          }
          InputLabelProps={{ shrink: twMoney === 0 ? false : true }}
        />
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleConvert()}
            className="w-full rounded-lg bg-[#442B0D] px-4 py-2 font-semibold text-white"
          >
            Convert
          </button>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="grow" />
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
