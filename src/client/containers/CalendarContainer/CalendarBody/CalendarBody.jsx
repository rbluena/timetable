import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = () => (
  <div className="flex divide-x divide-neutral-100 pt-10">
    <TimeColumn />
    <div className="divide-x divide-neutral-100 flex calendar-bound">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  </div>
);

export default CalendarBody;
