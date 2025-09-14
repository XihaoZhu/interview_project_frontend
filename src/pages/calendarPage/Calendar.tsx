import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from "../../store";
import TimezoneSelect from 'react-timezone-select'
import { setTimezone, } from '../../store/slices/frontEndSlice';
import { RegularCalendar } from '../../components/calendars/RegularCalendar'
import { DayonlyCalendar } from '../../components/calendars/DayonlyCalendar'
import { useFetchEvents } from '@/hooks/useFetchEvents';
import { EventTypeSelect } from '@/components/typeFilter/TypeFilter';
import clsx from 'clsx';
import { useEffect } from 'react';


export function CalendarPage() {

  const refreshEvents = useFetchEvents()

  // for responsive layout  
  const leftSideView = useSelector((state: RootState) => state.frontend.leftSideView);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    refreshEvents()
  }, [])

  return (
    <div className='w-screen justify-center h-screen items-center flex justify-items-between transition-all duration-500 p-10'>
      <div className='h-full w-1/5 flex justify-start flex-col justify-items-start pt-4 items-start'>
        <EventTypeSelect />
        <TimezoneSelect
          className='z-50 m-5'
          value={timezone!}
          onChange={(tz) => dispatch(setTimezone(tz.value))}
          menuPlacement="auto"
        />
      </div>
      <div className={clsx(
        "transition-all duration-500 inline-block h-7/8",
        leftSideView === "month" ? "w-2/5" : "w-4/5"
      )}>
        <RegularCalendar />
      </div>
      {(leftSideView === "month") && (<div className='h-full xl:inline-block hidden h-7/8 w-2/5'>
        <DayonlyCalendar />
      </div>
      )}
    </div>
  );
}