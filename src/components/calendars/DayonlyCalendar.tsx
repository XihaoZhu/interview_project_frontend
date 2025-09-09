import React, { useState } from "react";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import { format, parse, startOfWeek, getDay} from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { setSelectedDate, setSelectedEvent } from "../../store/slices/frontEndSlice";


// for date-fns localization (default is en-GB)
const locales = {
  "en-GB": enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});


// define event type
interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}

// test cases
const initialEvents: MyEvent[] = [
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

export const DayonlyCalendar: React.FC = ({}) => {

  // get store and actions
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);
  const dispatch = useDispatch();

  const [events, setEvents] = useState<MyEvent[]>(initialEvents);

  return (
    <div className="h-full p-4">
      <Calendar
        date={selectedDate!}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable
        defaultView="day"
        views={['day']}
      />
    </div>
  );
};

export default DayonlyCalendar;
