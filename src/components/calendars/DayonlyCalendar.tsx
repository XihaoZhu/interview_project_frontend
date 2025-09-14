import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store";
import { makeSelectEventsWithTimezone } from "../../store/slices/eventsSlice";
import { RegularPopOverForm } from "@/components/From/PopOverForm";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import type { MyEvent } from "@/store/typeAnnotation/types";
import { setSelectedEvent } from "../../store/slices/frontEndSlice";


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

  // for popover form when dropping slot
  function handleEventDrop({
    event,
    start,
    end,
  }: {
    event: MyEvent;
    start: String;
    end: String;
  }) {
    dispatch(setSelectedEvent({ ...event, start, end }));
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

  // for popover form when resize
  function handleEventResize(resizeInfo: any) {
    const { event, start, end } = resizeInfo;

    dispatch(setSelectedEvent({ ...event, start, end }));

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
        onSelectSlot={(slotInfo) => {
          if (slotInfo.action == "select") {
            handleSelectSlot(slotInfo)
          }
        }}
        onEventDrop={(dropInfo) => {
          if (!dropInfo) return
          {/* @ts-expect-error */ }
          handleEventDrop({ event: dropInfo.event, start: dropInfo.start, end: dropInfo.end });
        }}
        onEventResize={(resizeInfo) => {
          if (!resizeInfo) return
          handleEventResize(resizeInfo);
        }}


        // style
        eventPropGetter={(event: MyEvent) => {
          let backgroundColor = "";
          let color = "white"; // 默认文字颜色
          switch (event.type) {
            case "meeting":
              backgroundColor = "#4ade80"; // 绿色系，清新
              break;
            case "event":
              backgroundColor = "#60a5fa"; // 蓝色系，柔和
              break;
            case "first_appointment":
              backgroundColor = "#facc15"; // 黄色系，温暖
              color = "black"; // 黄色背景文字改黑色
              break;
            case "presentation":
              backgroundColor = "#f472b6"; // 粉色系，柔和
              break;
            default:
              backgroundColor = "#a1a1aa"; // 灰色，备用
              break;
          }
          return {
            style: {
              backgroundColor,
              color,
              borderRadius: "6px",
              border: "none",
            },
          };
        }}
      />
    </div>
    <div>
      <RegularPopOverForm anchorEl={anchorEl}
        open={popoverOpen}
        onOpenChange={setPopoverOpen} />
    </div>
  </>);
};

export default DayonlyCalendar;
