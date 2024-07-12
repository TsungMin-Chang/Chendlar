"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import ColorPalette from "@/app/_components/ColorPalette";
import useDay from "@/hooks/useDay";
import useRefreshContext from "@/hooks/useRefreshContext";

type timeProp = {
  time1: null | Date;
  time2: null | Date;
};

type EditDialogProps = {
  affairId?: string;
  dayNumber: number;
  affairTitle?: string;
  affairOrder?: number;
  affairColor?: string;
  affairType?: string;
  affairTime1?: Date;
  affairTime2?: Date;
  affairIsDone?: boolean;
  isHalfDay: boolean;
};

export default function EditDialog({
  affairId,
  dayNumber,
  affairTitle,
  affairOrder,
  affairColor,
  affairType,
  affairTime1,
  affairTime2,
  affairIsDone,
  isHalfDay,
}: EditDialogProps) {
  const { updateAffair, loading, setLoading } = useDay();
  const router = useRouter();
  const { onRefresh } = useRefreshContext();
  const accessToken = window.localStorage.getItem("accessToken");

  const steps = ["", ""];
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState(affairTitle ?? "");
  const [type, setType] = useState(affairType ?? "");
  const [isOneDay, setIsOneDay] = useState(false);
  const [timeData, setTimeData] = useState<timeProp>({
    time1: affairTime1 ?? null,
    time2: affairTime2 ?? null,
  });
  const [color, setColor] = useState(affairColor ?? "");
  const [isDone, setIsDone] = useState(affairIsDone ?? false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheck = () => {
    if (isOneDay) {
      setTimeData((prev) => ({ ...prev, time2: null }));
      setIsOneDay(false);
    } else {
      if (!timeData.time1 && !timeData.time2) {
        alert("What is your starting or ending date?");
        return;
      } else if (timeData.time1) {
        setTimeData((prev) => ({ ...prev, time2: prev.time1 }));
        setIsOneDay(true);
      } else {
        setTimeData((prev) => ({ ...prev, time1: prev.time2 }));
        setIsOneDay(true);
      }
    }
  };

  const handleNext = () => {
    if (!title) {
      alert("What is the title of this affair?");
      return;
    }
    if (!color) {
      alert("Please select a color for this affair.");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = async () => {
    if (
      !affairId ||
      !affairType ||
      !affairTitle ||
      affairOrder === undefined ||
      !affairTime1 ||
      !affairTime2
    ) {
      alert("Missing passed-in props.");
      return;
    }

    if (!type) {
      alert("Is it a To-do or an Event?");
      return;
    }

    if (!timeData.time1 || !timeData.time2) {
      alert("Please input your time fields.");
      return;
    }

    if (type === "event" && timeData.time1 > timeData.time2) {
      alert('The "From" field should be earlier than the "To" field.');
      return;
    }

    if (!accessToken) {
      alert("No Access Token!");
      return;
    }

    const alteredTime2 =
      type === "todo"
        ? new Date(
            timeData.time1.getFullYear(),
            timeData.time1.getMonth(),
            timeData.time1.getDate(),
            timeData.time2.getHours(),
            timeData.time2.getMinutes(),
          )
        : timeData.time2;

    try {
      const data = {
        affairId,
        prevType: affairType,
        prevTitle: affairTitle,
        prevOrder: affairOrder,
        prevTime1: affairTime1,
        prevTime2: affairTime2,
        userId: "55a0ef11-c9c8-471d-adeb-29b87d3d6bdc",
        title,
        color,
        type,
        time1: timeData.time1,
        time2: alteredTime2,
        isDone,
      };
      await updateAffair(data, accessToken);
    } catch (error) {
      alert("Error: Failed to update!");
    } finally {
      try {
        onRefresh(); // client-side refresh
        handleClose(); // close EditDialog by server-side refresh
      } catch (error) {
        alert("FAIL: client-side refresh or close EditDialog");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleClose = () => {
    router.push(
      `/day/${dayNumber}/?isHalfDay=${isHalfDay}&accessToken=${accessToken}`,
    );
    router.refresh();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 22 }}>Edit</DialogTitle>
      {activeStep === 0 && (
        <DialogContent className="flex w-[300px] flex-col gap-y-2">
          <FormControl className="p-2">
            <ClickAwayListener onClickAway={() => {}}>
              <Input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </ClickAwayListener>
          </FormControl>
          <div className="mt-2 grid grid-cols-5 gap-2 p-2">
            <ColorPalette color={color} setColor={setColor} />
          </div>
        </DialogContent>
      )}
      {activeStep === steps.length - 1 && (
        <DialogContent className="flex w-[300px] flex-col gap-y-5">
          <FormControl className="flex-1">
          <InputLabel className="mt-2" id="list-type">Type</InputLabel>
            <Select
              className="mt-2"
              labelId="list-type"
              label="list-type"
              value={type}
              onChange={(e) => {
                setIsOneDay(false);
                setIsDone(false);
                setTimeData({ time1: null, time2: null });
                setType(e.target.value);
              }}
            >
              <MenuItem value={"todo"}>To-do</MenuItem>
              <MenuItem value={"event"}>Event</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col gap-y-3">
              {type === "todo" && (
                <>
                  <MobileDatePicker
                    label="Date"
                    value={
                      !timeData.time1 ? timeData.time1 : dayjs(timeData.time1)
                    }
                    onChange={(newValue: any) =>
                      setTimeData((prev) => ({
                        ...prev,
                        time1: !newValue ? newValue : newValue["$d"],
                      }))
                    }
                  />
                  <MobileTimePicker
                    label="Time"
                    value={
                      !timeData.time2 ? timeData.time2 : dayjs(timeData.time2)
                    }
                    onChange={(newValue: any) =>
                      setTimeData((prev) => ({
                        ...prev,
                        time2: !newValue ? newValue : newValue["$d"],
                      }))
                    }
                  />
                  <div className="flex flex-row gap-x-1">
                    <Checkbox
                      checked={isDone}
                      onChange={() => setIsDone((prev) => !prev)}
                    />
                    <div className="flex items-center">done</div>
                  </div>
                </>
              )}
              {type === "event" && (
                <>
                  <MobileDatePicker
                    label="From"
                    value={
                      !timeData.time1 ? timeData.time1 : dayjs(timeData.time1)
                    }
                    onChange={(newValue: any) => {
                      if (
                        !!newValue &&
                        newValue["$d"] &&
                        !!timeData.time2 &&
                        newValue["$d"].getTime() === timeData.time2.getTime()
                      ) {
                        setIsOneDay(true);
                      } else {
                        setIsOneDay(false);
                      }
                      setTimeData((prev) => ({
                        ...prev,
                        time1: !newValue ? newValue : newValue["$d"],
                      }));
                    }}
                  />
                  <MobileDatePicker
                    label="To"
                    value={
                      !timeData.time2 ? timeData.time2 : dayjs(timeData.time2)
                    }
                    onChange={(newValue: any) => {
                      if (
                        !!newValue &&
                        newValue["$d"] &&
                        !!timeData.time1 &&
                        newValue["$d"].getTime() === timeData.time1.getTime()
                      ) {
                        setIsOneDay(true);
                      } else {
                        setIsOneDay(false);
                      }
                      setTimeData((prev) => ({
                        ...prev,
                        time2: !newValue ? newValue : newValue["$d"],
                      }));
                    }}
                  />
                  <div className="flex flex-row gap-x-1">
                    <Checkbox checked={isOneDay} onChange={handleCheck} />
                    <div className="flex items-center">last one day</div>
                  </div>
                </>
              )}
            </div>
          </LocalizationProvider>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        <div className="grow" />
        {activeStep < steps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={handleSubmit} disabled={loading}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
