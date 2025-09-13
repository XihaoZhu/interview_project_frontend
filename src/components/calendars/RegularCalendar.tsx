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
import { RegularPopOverForm } from "@/components/From/PopOverForm";


const DnDCalendar = withDragAndDrop(Calendar)

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
  const timezone = useSelector((state: RootState) => state.frontend.timezone);
  const events = useSelector(makeSelectEventsWithTimezone(timezone!));
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");
  const dispatch = useDispatch();


  // for popover form control
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // For popover form when click on event
  function handleEventClick(event: MyEvent, e: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(e.currentTarget);
    dispatch(dispatch(setSelectedEvent(event)));
    setPopoverOpen(true);
  }

  // For popover form when making slot
  function handleSelectSlot(slotInfo: any) {
    dispatch(setSelectedEvent({ start: slotInfo.start, end: slotInfo.end }));

    const mouseEvent = window.event as MouseEvent;
    if (!mouseEvent) return;

    const virtualAnchor = {
      getBoundingClientRect: () => ({
        top: mouseEvent.clientY,
        bottom: mouseEvent.clientY,
        left: mouseEvent.clientX,
        right: mouseEvent.clientX,
        width: 0,
        height: 0,
      }),
    } as HTMLElement;

    setAnchorEl(virtualAnchor);
    setPopoverOpen(true);
  }


  return (<>
    <div className="h-full p-4">
      {/* @ts-expect-error */}
      <DnDCalendar
        localizer={localizer}
        events={events}
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
          if (slotInfo.action == "select") {
            handleSelectSlot(slotInfo)
          }
          dispatch(setSelectedDate(slotInfo.start))
        }}
        onSelectEvent={(event, e) => handleEventClick(event as MyEvent, e as any)}
      />
    </div>
    <div>
      <RegularPopOverForm anchorEl={anchorEl}
        open={popoverOpen}
        onOpenChange={setPopoverOpen} />
    </div>
  </>);
};

export default RegularCalendar;
