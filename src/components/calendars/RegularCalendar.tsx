import React, { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, set } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { setSelectedDate, setSelectedEvent, setLeftSideView } from "../../store/slices/frontEndSlice";
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

export const RegularCalendar: React.FC= ({}) => {

  // get store and actions
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);
  const events= useSelector((state: RootState) => state.events.events);
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");
  const dispatch = useDispatch();

  return (
    <div className="h-full p-4">
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultDate={selectedDate!}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable
        view={currentView}
        onNavigate={(newDate, view, action) => {
          dispatch(setSelectedDate(newDate));
      }}
        onView={(view)=>{
          setCurrentView(view as "month" | "week" | "day");
          dispatch(setLeftSideView(view as "month" | "week" | "day" | "agenda"));
        }}
        date={selectedDate!} 
        onSelectSlot={(slotInfo) =>{
          dispatch(setSelectedDate(slotInfo.start));
        }}
      />
    </div>
  );
};

export default RegularCalendar;
