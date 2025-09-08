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

const locales = {
  "en-GB": enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar)

// react-big-calendar 需要的事件结构
interface CalendarEvent extends RBCEvent {
  id: number;
  start: Date;
  end: Date;
}

function App() {
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
    <div className="h-full p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <DnDCalendar

        className="h-[70vh]"
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
      />
    </div>
  );
}

export default App;
