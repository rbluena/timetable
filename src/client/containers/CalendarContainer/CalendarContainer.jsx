import { CreateTaskModalContainer } from '@app/containers/modals';
import CalendarHeader from './Header';
import CalendarBody from './CalendarBody/CalendarBody';

const CalendarContainer = () => (
  <>
    <div className="bg-white p-2">
      <CalendarHeader />
      <CalendarBody />
    </div>

    <CreateTaskModalContainer />
  </>
);

export default CalendarContainer;
