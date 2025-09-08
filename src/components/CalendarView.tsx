import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  setEvents,
  addEvent,
  removeEvent,
  type Event,
} from "../store/slices/eventsSlice";

import {
  Calendar,
  dateFnsLocalizer,
  type Event as RBCEvent,
} from "react-big-calendar";

import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enGB } from "date-fns/locale/en-GB";

import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'



// type claim for react-big-calendar
interface CalendarEvent extends RBCEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

function App() {
  
  // When render the page first time, get the local timezone automatically
  const [timezone,setTimeZone] = useState('UTC');
  useEffect(() => {
    const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(browserTZ);
  }, []);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {"en-GB": enGB}, 
  });

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar)


  
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.list);

  const [currentView, setCurrentView] = useState<"month" | "week" | "day" | "agenda">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // 模拟初始数据
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Interview",
        link: null,
        note: "Prepare slides",
        extra_info: null,
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        buid_timeZone: "UTC",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        type: "meeting",
        repeat_rule: null,
        parent: null,
      },
    ];
    dispatch(setEvents(mockEvents));
  }, [dispatch]);

  // 点击日历空白，新增一个事件
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const newEvent: Event = {
      id: Date.now(), // 临时 id
      title: "New Event",
      link: null,
      note: "",
      extra_info: null,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      buid_timeZone: "UTC",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: "event",
      repeat_rule: null,
      parent: null,
    };
    dispatch(addEvent(newEvent));
  };

  // 点击已有事件，删除
  const handleSelectEvent = (event: CalendarEvent) => {
    if (window.confirm(`Delete event "${event.title}"?`)) {
      dispatch(removeEvent(event.id));
    }
  };

  // 把 Redux 里的 Event 转成 react-big-calendar 需要的格式
  const calendarEvents: CalendarEvent[] = events.map(e => ({
    id: e.id,
    title: e.title,
    start: new Date(e.start_time),
    end: new Date(e.end_time),
  }));

  return (
    <div className="h-5/6 p-4 justify-items-center justify-self-center content-center">
      <h1 className="text-2xl font-bold mb-4">Nick Calendar</h1>
      <DnDCalendar

        localizer={localizer}
        events={calendarEvents}
        startAccessor={(event:CalendarEvent) => event.start}
        endAccessor={(event:CalendarEvent) => event.end}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}

        views={["month", "week", "day"]}
        defaultView="month"
        view={currentView}

        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}

        onView={(view) => setCurrentView(view as any)}
        popup
        showMultiDayTimes

        // 👇 关键：拖拽后更新 Redux
        onEventDrop={({ event, start, end }) => {
          const updatedEvent = {
            ...events.find(e => e.id === event.id)!,
            start_time: (start instanceof Date ? start : new Date(start)).toISOString(),
            end_time: (end instanceof Date ? end : new Date(end)).toISOString(),
          };
          dispatch(setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e)));
        }}
      
        // 👇 关键：resize 后更新 Redux
        onEventResize={({ event, start, end }) => {
          const updatedEvent = {
            ...events.find(e => e.id === event.id)!,
            start_time: (start instanceof Date ? start : new Date(start)).toISOString(),
            end_time: (end instanceof Date ? end : new Date(end)).toISOString(),
          };
          dispatch(setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e)));
        }}
      />
    </div>
  );
}

export default App;
