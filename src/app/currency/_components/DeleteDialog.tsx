import { useState, useRef, useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

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
  time:number;
  inputCountry: string;
  dbId: string;
  dbTitle: string;
  dbKor: number;
  dbTw: number;
  onRefresh: () => void;
};

export default function MoneyDialog({
  open,
  onClose,
  time,
  inputCountry,
  dbId,
  dbTitle,
  dbKor,
  dbTw,
  onRefresh,
}: MoneyDialogProps) {

  useEffect(() => {
    setTitle(dbTitle);
    setKoreaMoney(dbKor);
    setTwMoney(dbTw);
  }, [time]);

  const { updateSpending, deleteSpending } = useSpending();
  const oneTwToKor = useRef(41.5);
  const [title, setTitle] = useState("");
  const [twMoney, setTwMoney] = useState(0);
  const [koreaMoney, setKoreaMoney] = useState(0);

  const handleUpdate = async () => {
    if (!dbId) {
      alert("No Id!");
      return;
    }
    if (!inputCountry) {
      if (title === dbTitle) return;
      if (!title) {
        alert("No title!");
        return;
      }
    }
    if (inputCountry === "tw") {
      if (twMoney === dbTw) return;
      if (!twMoney) {
        alert("No TW Money!");
        return;
      }
    }
    if (inputCountry === "kor") {
      if (koreaMoney === dbKor) return;
      if (!koreaMoney) {
        alert("No Korea Money!");
        return;
      }
    }
    try {
      const data = {
        id: dbId,
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
      await updateSpending(data);
    } catch (error) {
      alert("Error: Fail to PUT spending!");
    } finally {
      onRefresh();
      handleClose();
    }
  };

  const handleDelete = async () => {
    try {
      deleteSpending(dbId);
    } catch (error) {
      alert("Error: Fail to DELETE spending!");
    } finally {
      onRefresh();
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">Edit Spending</div>
          {!inputCountry && (
            <div
              className="flex items-center justify-center"
              onClick={handleDelete}
            >
              <FaDeleteLeft size={25} color="red" />
            </div>
          )}
        </div>
      </DialogTitle>

      <DialogContent className="flex w-[300px] flex-col gap-y-4">
        {!inputCountry && (
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
        )}

        {inputCountry === "kor" && (
          <div className="flex w-full pt-1.5">
            <TextField
              className="w-full"
              id="quantity"
              inputProps={{ inputMode: "numeric" }}
              label={"Korean"}
              value={koreaMoney === 0 ? null : koreaMoney}
              onChange={(e) => {
                setKoreaMoney(!e.target.value ? 0 : parseInt(e.target.value));
              }}
              InputLabelProps={{ shrink: koreaMoney === 0 ? false : true }}
            />
          </div>
        )}

        {inputCountry === "tw" && (
          <div className="flex w-full pt-1.5">
            <TextField
              className="w-full"
              id="quantity"
              inputProps={{ inputMode: "numeric" }}
              label={"Taiwanese"}
              value={twMoney === 0 ? null : twMoney}
              onChange={(e) =>
                setTwMoney(!e.target.value ? 0 : parseInt(e.target.value))
              }
              InputLabelProps={{ shrink: twMoney === 0 ? false : true }}
            />
          </div>
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
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
