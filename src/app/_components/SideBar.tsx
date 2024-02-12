import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useRouter } from "next/navigation";

export default function SideBar({
  openSideBar, onCloseSideBar
}: {
  openSideBar: boolean,
  onCloseSideBar: () => void
}) {
  const router = useRouter();
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#984747',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <Drawer
      open={openSideBar}
      onClose={() => onCloseSideBar()}
    >
      <div
        className="flex flex-col h-full w-full gap-y-3 p-3 items-center"
        style={{backgroundColor: "rgba(79, 65, 50, 1)", width: 190}}
        role="presentation"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <p className='text-white'>12hr</p>
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label=""
          />
          <p className='text-white'>24hr</p>
        </Stack>
        <button 
          onClick={() => {
            router.push("/")
            onCloseSideBar()
          }}
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all focus:outline-none hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:shadow-outline"
        >
          Month
        </button>
        <button
          onClick={() => {
            router.push("/week")
            onCloseSideBar()
          }}
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all focus:outline-none hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:shadow-outline"
        >
          Week
        </button>
      </div>
    </Drawer>
  );
}