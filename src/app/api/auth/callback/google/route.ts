import { type NextRequest, NextResponse } from "next/server";

// Google Calendar

export async function GET(request: NextRequest) {
  // Get the code
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const redirectUri = "https://chendlar.cinatrin.pro/api/auth/callback/google";
  const grandType = "authorization_code";
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=${grandType}`;

  // Get the access token
  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();
  const accessToken = data.access_token;

  return NextResponse.redirect(
    `https://chendlar.cinatrin.pro/callback?token=${accessToken}`,
  );
}
