import * as React from "react";
import { useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import type { SwitchProps } from "@mui/material/Switch";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import useDateContext from "@/hooks/useDateContext";

export default function SideBar({
  openSideBar,
  onCloseSideBar,
}: {
  openSideBar: boolean;
  onCloseSideBar: () => void;
}) {
  const { setDate, setIsHalfDay, isHalfDay } = useDateContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.slice(1, 4) === "day") {
      router.push(pathname + `/?isHalfDay=${isHalfDay}`);
      router.refresh();
    }
  }, [isHalfDay]);

  const handleToMonth = () => {
    setDate(new Date());
    router.push("/");
    router.refresh();
    onCloseSideBar();
  };

  const handleToWeek = () => {
    setDate(new Date());
    router.push("/week");
    router.refresh();
    onCloseSideBar();
  };

  const handleToMemo = () => {
    router.push("/memo");
    router.refresh();
    onCloseSideBar();
  };

  // Material UI
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#984747",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Drawer open={openSideBar} onClose={() => onCloseSideBar()}>
      <div
        className="flex h-full w-full flex-col items-center gap-y-3 bg-[#4c361c] p-5 pl-6 pt-3"
        style={{ width: 250 }}
        role="presentation"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <p className="text-white">24hr</p>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={isHalfDay}
                onChange={(event) => setIsHalfDay(event.target.checked)}
              />
            }
            label=""
          />
          <p className="text-white">12hr</p>
        </Stack>
        <button
          onClick={() => handleToMonth()}
          className="focus:shadow-outline flex w-full max-w-xs items-center justify-center rounded-lg border-2 border-zinc-400 bg-[#473520] py-3 font-bold text-zinc-200 shadow-sm transition-all hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:outline-none"
        >
          Month
        </button>
        <button
          onClick={() => handleToWeek()}
          className="focus:shadow-outline flex w-full max-w-xs items-center justify-center rounded-lg border-2 border-zinc-400 bg-[#473520] py-3 font-bold text-zinc-200 shadow-sm transition-all hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:outline-none"
        >
          Week
        </button>
        <button
          onClick={() => handleToMemo()}
          className="focus:shadow-outline flex w-full max-w-xs items-center justify-center rounded-lg border-2 border-zinc-400 bg-[#473520] py-3 font-bold text-zinc-200 shadow-sm transition-all hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:outline-none"
        >
          Memo
        </button>
      </div>
    </Drawer>
  );
}
