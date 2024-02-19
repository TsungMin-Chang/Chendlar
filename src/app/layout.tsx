import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import DateProvider from "@/providers/DateProvider";
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
      <body className={`${inter.className} flex flex-col relative w-screen h-screen overflow-hidden`}>
        <DateProvider>
          <NavBar />
          {children}
        </DateProvider>
        <AddButton />
      </body>
    </html>
  );
}
