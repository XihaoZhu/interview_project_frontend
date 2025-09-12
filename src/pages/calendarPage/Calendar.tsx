import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from "../../store";
import { useEffect } from 'react';
import { fetchEvents } from '../../store/api/eventsApi';
import { startOfMonth, endOfMonth, format, subDays, addDays, set } from 'date-fns';
import TimezoneSelect from 'react-timezone-select'
import { setTimezone, } from '../../store/slices/frontEndSlice';
import { RegularCalendar } from '../../components/calendars/RegularCalendar'
import { DayonlyCalendar } from '../../components/calendars/DayonlyCalendar'



// from selected date get month start and end date in ISO format
function getMonthQuery(date: Date) {
  const start = subDays(startOfMonth(date), 7);
  const end = addDays(endOfMonth(date), 7);
  return {
    start: format(start, "yyyy-MM-dd").toString(),
    end: format(end, "yyyy-MM-dd").toString(),
  };
}


export function CalendarPage() {

  // for responsive layout  
  const leftSideView = useSelector((state: RootState) => state.frontend.leftSideView);
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!selectedDate) return;

    const dateObj = new Date(selectedDate);
    const query = getMonthQuery(dateObj);

    dispatch(fetchEvents({ ...query, timezone: timezone! }));
  }, [selectedDate, dispatch]);



  return (
    <div className='w-screen justify-center h-screen items-center flex justify-items-between'>
      <div className='h-full w-1/6 flex justify-start flex-col justify-items-start pt-14 items-start'>
        <TimezoneSelect
          className='z-50'
          value={timezone!}
          onChange={(tz) => dispatch(setTimezone(tz.value))}
        />
      </div>
      <div className='inline-block h-7/8 flex:1 w-3/5'>
        <RegularCalendar />
      </div>
      {(leftSideView === "month") && (<div className='flex:1 h-full xl:inline-block hidden h-7/8 w-1/5'>
        <DayonlyCalendar />
      </div>
      )}
    </div>
  );
}