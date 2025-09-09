import { RegularCalendar } from './components/calendars/RegularCalendar'
import { DayonlyCalendar } from './components/calendars/DayonlyCalendar'
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from "./store";
import { useEffect } from 'react';
import { fetchEvents } from './store/api/eventsApi';
import { startOfMonth, endOfMonth, format } from 'date-fns';

// from selected date get month start and end date in ISO format
function getMonthQuery(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
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
      dispatch(fetchEvents({start: "2025-09-01", end: "2025-09-30", timezone: "utc"}));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedDate) return;

    const dateObj = new Date(selectedDate);
    const query = getMonthQuery(dateObj);

    dispatch(fetchEvents({...query,timezone:timezone!}));
  }, [selectedDate, dispatch]);



  return (
    <Provider store={store}>
      <div className='w-screen justify-center h-screen justify-items-center items-center flex'>
        <div className='w-2/3 inline-block h-full'>
          <RegularCalendar/>
        </div>
        {(leftSideView === "month" || leftSideView === "agenda")&&(<div className='w-4/12 h-full xl:inline-block hidden  '>
          <DayonlyCalendar/>
        </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
