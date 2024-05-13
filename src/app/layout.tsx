import type { Metadata } from "next";
import { Inter } from "next/font/google";

import DateProvider from "@/providers/DateProvider";
import RefreshProvider from "@/providers/RefreshProvider";

import AddButton from "./_components/AddButton";
import NavBar from "./_components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chendlar",
  description: "This is Friends' Chandler's calendar.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex h-screen w-screen flex-col overflow-hidden`}
      >
        <DateProvider>
          <RefreshProvider>
            <NavBar />
            {children}
            <AddButton />
          </RefreshProvider>
        </DateProvider>
      </body>
    </html>
  );
}
