import { CreateTask } from '@app/components';
import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = () => {
  function addTimeBlock(startTime, startMinutes) {
    console.log(startTime);
    console.log(startMinutes);
  }

  return (
    <div className="flex divide-x divide-neutral-100 pt-10">
      <CreateTask />
      <TimeColumn />
      <div className="divide-x divide-neutral-100 flex calendar-bound">
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
        <Column addTimeBlock={addTimeBlock} />
      </div>
    </div>
  );
};

export default CalendarBody;
