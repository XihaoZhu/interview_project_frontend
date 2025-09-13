import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from "../../store";
import TimezoneSelect from 'react-timezone-select'
import { setTimezone, } from '../../store/slices/frontEndSlice';
import { RegularCalendar } from '../../components/calendars/RegularCalendar'
import { DayonlyCalendar } from '../../components/calendars/DayonlyCalendar'
import { useFetchEvents } from '@/hooks/useFetchEvents';


export function CalendarPage() {

  const refreshEvents = useFetchEvents()

  // for responsive layout  
  const leftSideView = useSelector((state: RootState) => state.frontend.leftSideView);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);

  const dispatch: AppDispatch = useDispatch();

  refreshEvents


  return (
    <div className='w-screen justify-center h-screen items-center flex justify-items-between'>
      <div className='h-full w-1/6 flex justify-start flex-col justify-items-start pt-4 items-start'>
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