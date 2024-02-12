import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

export default function AddDialog({
  open, onClose
}: {
  open: boolean, 
  onClose: () => void
}) {

  const [title, setTitle] = useState("");
  const handleClose = () => {
    setTitle("");
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>
        New Event
      </DialogTitle>

      <DialogContent className="w-[300px]">
        <FormControl className="flex flex-row" sx={{ m: 1, minWidth: 200 }}>
          <ClickAwayListener
            onClickAway={() => {}}
          >
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-2/3"
              placeholder="Title"
            />
          </ClickAwayListener>
          <div className='grow'></div>
          <div className='m-2'>hi</div>
        </FormControl>
        {/* <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-56 overflow-y-auto">
          <ColorPlatter Color={color} setColor={setColor}/>
        </div> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <div className="grow" />
        <Button onClick={() => {}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}