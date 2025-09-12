
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import { IncreaseForm } from './components/From/Forms';
import { CalendarPage } from './pages/calendarPage/Calendar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/test" element={<IncreaseForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
