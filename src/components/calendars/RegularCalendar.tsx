import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

// for date-fns localization (default is en-GB)
const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// test cases
const initialEvents: Event[] = [
  {
    title: "Meeting with team",
    start: new Date(2025, 8, 9, 10, 0), 
    end: new Date(2025, 8, 9, 11, 0),
  },
  {
    title: "Lunch with Sarah",
    start: new Date(2025, 8, 10, 12, 0),
    end: new Date(2025, 8, 10, 13, 0),
  },
];

const RegularCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  return (
    <div className="h-[600px] p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable
        onSelectEvent={(event) => alert(`Selected event: ${event.title}`)}
        onSelectSlot={(slotInfo) =>
          alert(`Selected slot: ${slotInfo.start.toLocaleString()}`)
        }
      />
    </div>
  );
};

export default RegularCalendar;
