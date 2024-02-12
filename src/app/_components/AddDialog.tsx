import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export default function AddDialog({
  open, onClose
}: {
  open: boolean, 
  onClose: () => void
}) {
  
  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (!title) {
      alert("You forgot your title!");
      return;
    }
    if (!type) {
      alert("What is your event type?");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSubmit = async () => {
    try {
      // const data = {
      //   type: "list",
      //   frontPointer: pointer,
      //   listType,
      //   icon,
      //   content
      // };
      // await createNode(apiData.token, apiData.pageId, data);
    } catch (error) {
      alert("Error: Failed to create a new event!");
    } finally {
      return;
      // onRefresh();
      // handleClose();
    }
  };
  const handleClose = () => {
    setTitle("");
    setType("");
    setActiveStep(0);
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
      {activeStep === 0 && (
        <DialogContent className="flex flex-col w-[300px]">
          <FormControl className="flex flex-row m-2" sx={{ minWidth: 200 }}>
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
            <div className='m-2'>color</div>
            {/* <div className="grid grid-cols-11 gap-2 p-2 mt-2 h-56 overflow-y-auto">
              <ColorPlatter Color={color} setColor={setColor}/>
            </div> */}
          </FormControl>
          <FormControl className="flex-1 m-1">
            <InputLabel id="list-type">Type</InputLabel>
            <Select
              labelId="list-type"
              label="list-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"todo"}>To do </MenuItem>
              <MenuItem value={"house"}>House keeping</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      )}
      {activeStep === steps.length - 1 && (
        <DialogContent className="w-[300px]">
          {type === "todo" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='flex flex-col gap-y-3'>
                <DemoItem label="Date">
                  <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
                <DemoItem label="Time">
                  <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                </DemoItem>
              </div>
            </LocalizationProvider>
          )}
          {type === "house" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='flex flex-col gap-y-3'>
                <DemoItem label="From">
                  <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
                <DemoItem label="To">
                  <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
              </div>
            </LocalizationProvider>
          )}
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        <div className="grow" />
        {activeStep < steps.length - 1 && (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}