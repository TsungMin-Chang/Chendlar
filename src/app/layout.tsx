import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { env } from "@/lib/env";
import DateProvider from "@/providers/DateProvider";
import GoogleCalendarProvider from "@/providers/GoogleCalendarProvider";
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
  // Google Calendar
  const clientId = env.AUTH_GOOGLE_ID;
  const redirectUri = "https://chendlar.cinatrin.pro/api/auth/callback/google";
  const responseType = "code";
  const scope = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
  ].join(" ");
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen w-screen flex-col overflow-hidden`}
      >
        <GoogleCalendarProvider>
          <DateProvider>
            <RefreshProvider>
              <NavBar />
              {children}
              <AddButton />
              <a className="hidden" id="google-calendar" href={url}>
                Sign in with Google
              </a>
            </RefreshProvider>
          </DateProvider>
        </GoogleCalendarProvider>
      </body>
    </html>
  );
}
