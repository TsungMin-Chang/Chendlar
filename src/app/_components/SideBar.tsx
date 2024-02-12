import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { useRouter } from "next/navigation";

export default function SideBar({
  openSideBar, onCloseSideBar
}: {
  openSideBar: boolean,
  onCloseSideBar: () => void
}) {
  const router = useRouter();
  return (
    <Drawer
      open={openSideBar}
      onClose={() => onCloseSideBar()}
    >
      <div
        className="flex flex-col h-full w-full gap-y-3 p-3"
        style={{backgroundColor: "rgba(79, 65, 50, 1)", width: 190}}
        role="presentation"
      >
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