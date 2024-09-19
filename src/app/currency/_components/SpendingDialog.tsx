import { useState, useRef } from "react";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

import useSpending from "@/hooks/useSpending";

type MoneyDialogProps = {
  open: boolean;
  onClose: () => void;
  inputCountry: string;
  onRefresh: () => void;
};

export default function MoneyDialog({
  open,
  onClose,
  inputCountry,
  onRefresh,
}: MoneyDialogProps) {
  const oneTwToKor = useRef(41.5);
  const [title, setTitle] = useState("");
  const [twMoney, setTwMoney] = useState(0);
  const [koreaMoney, setKoreaMoney] = useState(0);
  const { postSpending } = useSpending();

  const handleAdd = async () => {
    if (!title) {
      alert("No title!");
      return;
    }
    if (inputCountry === "tw" && !twMoney) {
      alert("No TW Money!");
      return;
    }
    if (inputCountry === "kor" && !koreaMoney) {
      alert("No Korea Money!");
      return;
    }
    try {
      const data = {
        title,
        kor:
          inputCountry === "tw"
            ? Math.round(twMoney * oneTwToKor.current)
            : koreaMoney,
        tw:
          inputCountry === "kor"
            ? Math.round(koreaMoney / oneTwToKor.current)
            : twMoney,
      };
      await postSpending(data);
    } catch (error) {
      alert("Error: Fail to POST new spending!");
    } finally {
      onRefresh();
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setTwMoney(0);
    setKoreaMoney(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        New Spending
      </DialogTitle>

      <DialogContent className="flex w-[300px] flex-col gap-y-4">
        <FormControl className="p-4">
          <ClickAwayListener onClickAway={() => {}}>
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </ClickAwayListener>
        </FormControl>

        {inputCountry === "kor" && (
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
        )}

        {inputCountry === "tw" && (
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
        )}

        {/* <div className="flex items-center justify-center">
          <button
            onClick={() => handleConvert()}
            className="w-full rounded-lg bg-[#442B0D] px-4 py-2 font-semibold text-white"
          >
            Convert
          </button>
        </div> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <div className="grow" />
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
