type Calendar = {
  summary: string;
  colorId: string;
  start: { dateTime: Date; timeZone: string };
  end: { dateTime: Date; timeZone: string };
};

export const handleAddToGoogleCalendar = async (
  googleData: Calendar,
  accessToken: string,
) => {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleData),
    },
  );
  const data = await response.json();
  return data.id;
};

export const handleUpdateToGoogleCalendar = async (
  googleData: Calendar,
  accessToken: string,
  googleEventId: string,
) => {
  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${googleEventId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleData),
    },
  );
};

export const handleDeleteFromGoogleCalendar = async (
  googleEventId: string,
  accessToken: string,
) => {
  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${googleEventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
};
