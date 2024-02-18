"use client";
// import Image from "next/image";
import React, { useState } from 'react';
import useYearMonthContext from "@/hooks/useYearMonthContext";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Cells from './_components/Cells';

export default function Home() {
  const days = [
    "SUN", 
    "MON", 
    "TUE", 
    "WED", 
    "THR", 
    "FRI", 
    "SAT"
  ];
  
  const {year, setYear, month, setMonth} = useYearMonthContext();
  const [debounce, setDebounce] = useState(false);
  const [y, setY] = useState(90);

  const handleSwipe = (from: number, to: number) => {
    console.log("1", from);
    console.log("2", to);
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) <= 90) {
      if (y > 90) {
        setY(90);
      }
      return;
    }

    if (Math.abs(e.deltaY) > y) {
      if (!debounce) {
        setDebounce(true);
      }
      setY(Math.abs(e.deltaY));
      return;
    }

    if (debounce) {
      if (e.deltaY > 0) { // move downward, next month
        if (month === 11) {
          setYear(prev => prev + 1);
          setMonth(0);
        } else {
          setMonth(prev => prev + 1);
        }
      } else if (e.deltaY < 0) { // move upward, previous month
        if (month === 0) {
          setYear(prev => prev - 1);
          setMonth(11);
        } else {
          setMonth(prev => prev - 1);
        }
      }
      setDebounce(false);
    }
  }

  return (
    <>
      <div className="flex-1 flex flex-col bg-[#442B0D]">
        <div 
          className="grid grid-cols-7"
          style={{height: "6vh"}}
        >
          {days.map((ele, i) => (
            <div
              key={i}
              className="flex justify-center items-center text-sm text-gray-300 border border-[#4E4743]"
            >
              {ele}
            </div>
          ))}
        </div>
        <Slide 
          vertical 
          autoplay={false} 
          canSwipe={true} 
          arrows={false}
          onChange={(from: number, to: number) => handleSwipe(from, to)}
        >
          <Cells
            firstDayOfMonth={new Date(year, month - 1, 1)} 
            lastDayOfMonth={new Date(year, month, 0)}
          />
          <Cells 
            firstDayOfMonth={new Date(year, month, 1)} 
            lastDayOfMonth={new Date(year, month + 1, 0)}
          />
          <Cells 
            firstDayOfMonth={new Date(year, month + 1, 1)} 
            lastDayOfMonth={new Date(year, month + 2, 0)}
          />
        </Slide>
      </div>
    </>
  );
}