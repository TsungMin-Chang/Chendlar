import { useState, useRef, useEffect } from "react";

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
  inputCountry?: string;
  dbId?: string;
  dbTitle?: string;
  dbKor?: number;
  dbTw?: number;
  onRefresh: () => void;
};

export default function MoneyDialog({
  open,
  onClose,
  inputCountry,
  dbId,
  dbTitle,
  dbKor,
  dbTw,
  onRefresh,
}: MoneyDialogProps) {
  useEffect(() => {
    if (dbTitle) {
      setTitle(dbTitle);
    }
    if (inputCountry === "kor" && dbKor) {
      setKoreaMoney(dbKor);
      setTwMoney(0);
    }
    if (inputCountry === "tw" && dbTw) {
      setTwMoney(dbTw);
      setKoreaMoney(0);
    }
  }, [dbId, inputCountry]);

  const oneTwToKor = useRef(41.35);
  const [title, setTitle] = useState(dbTitle ?? "");
  const [twMoney, setTwMoney] = useState(dbTw ?? 0);
  const [koreaMoney, setKoreaMoney] = useState(dbKor ?? 0);
  const { postSpending, updateSpending } = useSpending();

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

  const handleUpdate = async () => {
    if (!dbId) {
      alert("No Id!");
      return;
    }
    if (!title) {
      alert("No title!");
      return;
    }
    if (!twMoney) {
      alert("No TW Money!");
      return;
    }
    if (!koreaMoney) {
      alert("No Korea Money!");
      return;
    }
    if (title === dbTitle && twMoney === dbTw && koreaMoney === dbKor) return;
    try {
      const data = {
        id: dbId,
        title,
        kor: koreaMoney,
        tw: twMoney,
      };
      await updateSpending(data);
    } catch (error) {
      alert("Error: Fail to PUT spending!");
    } finally {
      onRefresh();
      handleClose();
    }
  };

  const handleAdd = async () => {
    if (!title) {
      alert("No title!");
      return;
    }
    if (!twMoney) {
      alert("No TW Money!");
      return;
    }
    if (!koreaMoney) {
      alert("No Korea Money!");
      return;
    }
    try {
      const data = {
        title,
        kor: koreaMoney,
        tw: twMoney,
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
    if (!dbId) {
      // add
      setTitle("");
      setTwMoney(0);
      setKoreaMoney(0);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        {dbId ? "Edit" : "New"} Spending
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
        <Button onClick={handleClose}>Cancel</Button>
        <div className="grow" />
        {!dbId ? (
          <Button onClick={handleAdd}>Add</Button>
        ) : (
          <Button onClick={handleUpdate}>Update</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
