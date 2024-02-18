import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import YearMonthProvider from "@/providers/YearMonthProvider";
import NavBar from "./_components/NavBar";
import AddButton from "./_components/AddButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ellendar",
  description: "Let's plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col relative w-screen h-screen overflow-hidden mt-3`}>
        <YearMonthProvider>
          <NavBar />
          {children}
        </YearMonthProvider>
        <AddButton />
      </body>
    </html>
  );
}
