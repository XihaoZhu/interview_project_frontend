import React, { useState } from "react";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import { format, parse, startOfWeek, getDay} from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { makeSelectEventsWithTimezone } from "../../store/slices/eventsSlice";
import { setSelectedDate, setSelectedEvent } from "../../store/slices/frontEndSlice";
import { type MyEvent } from "../../store/typeAnnotation/types";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


const DnDCalendar = withDragAndDrop(Calendar);

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

export const DayonlyCalendar: React.FC = ({}) => {

  // get store and actions
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);
  const leftSideView = useSelector((state: RootState) => state.frontend.leftSideView);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);
  const events= useSelector(makeSelectEventsWithTimezone(timezone!));
  const dispatch = useDispatch();


  return(
      <div className="h-full p-4">
        <DnDCalendar
          date={selectedDate!}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          defaultView="day"
          views={["day"]}
        />
      </div>
  );
};

export default DayonlyCalendar;
