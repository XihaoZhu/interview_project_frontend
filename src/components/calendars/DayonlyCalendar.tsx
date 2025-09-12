import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { makeSelectEventsWithTimezone } from "../../store/slices/eventsSlice";
import { setSelectedEvent } from "@/store/slices/frontEndSlice";
import { RegularPopOverForm } from "@/pages/formPage/FormPage";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import type { MyEvent } from "@/store/typeAnnotation/types";

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

export const DayonlyCalendar: React.FC = ({ }) => {

  // get store and actions
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);
  const events = useSelector(makeSelectEventsWithTimezone(timezone!));
  const dispatch = useDispatch();

  // for popover form control
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // For popover form
  function handleEventClick(event: MyEvent, e: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(e.currentTarget);
    dispatch(dispatch(setSelectedEvent(event)));
    setPopoverOpen(true);
  }



  return (<>
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
        onSelectEvent={(event, e) => handleEventClick(event as MyEvent, e as any)}
      />
    </div>
    <div>
      {/* <RegularPopOverForm anchorEl={anchorEl}
        open={popoverOpen}
        onOpenChange={setPopoverOpen} /> */}
    </div></>
  );
};

export default DayonlyCalendar;
