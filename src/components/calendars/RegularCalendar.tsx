import React, { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, set } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { setSelectedDate, setSelectedEvent, setLeftSideView, } from "../../store/slices/frontEndSlice";
import { makeSelectEventsWithTimezone } from "../../store/slices/eventsSlice";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import type { MyEvent } from "../../store/typeAnnotation/types";
import { Popover } from "@radix-ui/react-popover";
import { RegularPopOverForm } from "@/pages/formPage/FormPage";


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

export const RegularCalendar: React.FC = ({ }) => {

  // get store and actions
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);
  const events = useSelector(makeSelectEventsWithTimezone(timezone!));
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");
  const dispatch = useDispatch();


  // for popover form control
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverRect, setPopoverRect] = useState<DOMRect | null>(null);

  // For popover form
  function handleEventClick(eventInfo: any) {
    setPopoverRect(eventInfo.el?.getBoundingClientRect() || null);
    setPopoverOpen(true);
  }

  return (<>
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
        onView={(view) => {
          setCurrentView(view as "month" | "week" | "day");
          dispatch(setLeftSideView(view as "month" | "week" | "day" | "agenda"));
        }}
        date={selectedDate!}
        onSelectSlot={(slotInfo) => {
          dispatch(setSelectedDate(slotInfo.start));
        }}
        onSelectEvent={(event) => handleEventClick(event as MyEvent)}
      />
    </div>
    <div>
      <RegularPopOverForm
        anchorRect={popoverRect}
        open={popoverOpen}
        onOpenChange={setPopoverOpen} />
    </div>
  </>);
};

export default RegularCalendar;
