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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Checkbox from '@mui/material/Checkbox';
import ColorPalette from './ColorPalette';

type timeProp = {
  time1: null | Date;
  time2: null | Date;
}

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
  const [isChecked, setIsChecked] = useState(false);
  const [timeData, setTimeData] = useState<timeProp>({time1: null, time2: null});
  const [color, setColor] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (!title) {
      alert("You forgot your title!");
      return;
    }
    if (!color) {
      alert("You forgot to pick a color!");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleCheck = () => {
    if (isChecked) {
      setTimeData(prev => ({...prev, time2: null}));
      setIsChecked(false);
    } else {
      if (!timeData.time1 && !timeData.time2) {
        alert("What is the starting or ending date?");
        return;
      } else if (!!timeData.time1) {
        setTimeData(prev => ({...prev, time2: prev.time1}));
        setIsChecked(true);
      } else {
        setTimeData(prev => ({...prev, time1: prev.time2}));
        setIsChecked(true);
      }
    }
  }
  const handleSubmit = async () => {
    if (!type) {
      alert("Is it a to-do or an event?");
      return;
    }
    // TODO: more checking on Date (starting has to be earlier than ending)
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
      alert("Error: Failed to create!");
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
    setTimeData({time1: null, time2: null});
    setIsChecked(false);
    setColor("");
    setIsFinished(false);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{fontWeight: 'bold' , fontSize: 22}}>
        New Affair
      </DialogTitle>
      {activeStep === 0 && (
        <DialogContent className="flex flex-col gap-y-2 w-[300px]">
          <FormControl className='p-2'>
            <ClickAwayListener
              onClickAway={() => {}}
            >
              <Input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </ClickAwayListener>
          </FormControl>
          <div className="grid grid-cols-5 gap-2 p-2 mt-2">
            <ColorPalette setColor={setColor}/>
          </div>
        </DialogContent>
      )}
      {activeStep === steps.length - 1 && (
        <DialogContent className="flex flex-col gap-y-5 w-[300px]">
          <FormControl className="flex-1 mt-2">
            <InputLabel id="list-type">Type</InputLabel>
            <Select
              labelId="list-type"
              label="list-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"todo"}>To do</MenuItem>
              <MenuItem value={"event"}>Event</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex flex-col gap-y-3'>
            {type === "todo" && ( // TODO: finished or unfinished checkbox  
              <>
                <MobileDatePicker 
                  label="Date - dd"
                  value={!timeData.time1 ? timeData.time1 : dayjs(timeData.time1)}
                  onChange={(newValue: any) => setTimeData((prev) => ({...prev, time1: !newValue ? newValue : newValue["$d"]}))}
                />
                <MobileTimePicker
                  label="Time - hh:mm"
                  value={!timeData.time2 ? timeData.time2 : dayjs(timeData.time2)}
                  onChange={(newValue: any) => setTimeData((prev) => ({...prev, time2: !newValue ? newValue : newValue["$d"]}))}
                />
                <div className='flex flex-row gap-x-1'>
                  <Checkbox
                    checked={isFinished}
                    onChange={() => setIsFinished(prev => !prev)}
                  />
                  <div className='flex items-center'>done</div>
                </div>
              </>
            )}
            {type === "event" && (
              <>
                <MobileDatePicker 
                  label="From - dd"
                  value={!timeData.time1 ? timeData.time1 : dayjs(timeData.time1)}
                  onChange={(newValue: any) => {
                    if (!!newValue && newValue["$d"] && !!timeData.time2 && newValue["$d"].getTime() === timeData.time2.getTime()) {
                      setIsChecked(true);
                    } else {
                      setIsChecked(false);
                    }
                    setTimeData((prev) => ({...prev, time1: !newValue ? newValue : newValue["$d"]}));
                  }}
                />
                <MobileDatePicker 
                  label="To - dd"
                  value={!timeData.time2 ? timeData.time2 : dayjs(timeData.time2)}
                  onChange={(newValue: any) => {
                    if (!!newValue && newValue["$d"] && !!timeData.time1 && newValue["$d"].getTime() === timeData.time1.getTime()) {
                      setIsChecked(true);
                    } else {
                      setIsChecked(false);
                    }
                    setTimeData((prev) => ({...prev, time2: !newValue ? newValue : newValue["$d"]}));
                  }}
                />
                <div className='flex flex-row gap-x-1'>
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheck}
                  />
                  <div className='flex items-center'>last one day</div>
                </div>
              </>    
            )}
            </div>
          </LocalizationProvider>
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