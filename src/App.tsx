import { RegularCalendar } from './components/calendars/RegularCalendar'
import { DayonlyCalendar } from './components/calendars/DayonlyCalendar'
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from "./store";
import { useEffect } from 'react';
import { fetchEvents } from './store/api/eventsApi';
import { startOfMonth, endOfMonth, format, subDays, addDays, set } from 'date-fns';
import TimezoneSelect from 'react-timezone-select'
import { setTimezone, setLeftSideView } from './store/slices/frontEndSlice';

// from selected date get month start and end date in ISO format
function getMonthQuery(date: Date) {
  const start = subDays(startOfMonth(date),7);
  const end = addDays(endOfMonth(date),7);
  return {
    start: format(start, "yyyy-MM-dd").toString(),
    end: format(end, "yyyy-MM-dd").toString(),
  };
}

function App() {

  const leftSideView = useSelector((state: RootState) => state.frontend.leftSideView);
  const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
  const timezone = useSelector((state: RootState) => state.frontend.timezone);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!selectedDate) return;

    const dateObj = new Date(selectedDate);
    const query = getMonthQuery(dateObj);

    dispatch(fetchEvents({...query,timezone:timezone!}));
  }, [selectedDate, dispatch]);



  return (
    <Provider store={store}>
      <div className='w-screen justify-center h-screen justify-items-center items-center flex'>
        <div className='w-1/7 h-full flex items-center justify-cneter p-4'>
          <TimezoneSelect
        value={timezone!}
        onChange={(tz) => dispatch(setTimezone(tz.value))}
        />
        </div>
        <div className='w-5/10 inline-block h-full'>
          <RegularCalendar/>
        </div>
        {(leftSideView === "month" || leftSideView === "agenda")&&(<div className='w-3/10 h-full xl:inline-block hidden  '>
          <DayonlyCalendar/>
        </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
