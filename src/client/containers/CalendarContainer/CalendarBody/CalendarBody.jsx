import { CreateTask } from '@app/components';
import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = () => {
  function addTimeBlock(startTime, startMinutes) {}

  return (
    <div className="flex  pt-10">
      <CreateTask />
      <TimeColumn />
      <div className="border-l border-neutral-100 divide-x divide-neutral-100 flex calendar-bound">
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
