import { RegularCalendar } from './components/calendars/RegularCalendar'
import { DayonlyCalendar } from './components/calendars/DayonlyCalendar'
import { Provider } from 'react-redux';
import { store } from './store';

function App() {


  return (
    <Provider store={store}>
      <div className="h-screen w-screen p-4">
          <div className='hidden lg:flex justify-center h-full'>
            <div className='w-7/12 inline-block h-full'>
              <RegularCalendar/>
            </div>
            <div className='w-4/12 inline-block h-full'>
              <DayonlyCalendar/>
            </div>
          </div>
          <div className='block lg:hidden'>
            <div className='w-5/6'>
              <RegularCalendar/>
            </div>
          </div>
      </div>
    </Provider>
  );
}

export default App;
