import { useDispatch } from 'react-redux';
import { setHours, setMinutes } from 'date-fns';
import { openModalAction, setEditingTaskAction } from '@app/actions';
import TimeColumn from './TimeColumn';
import Column from './Column';

const CalendarBody = () => {
  const dispatch = useDispatch();

  function openEditTaskModal(data) {
    data.date = setHours(data.date, data.startHour);
    data.date = setMinutes(data.date, data.startMinutes);
    dispatch(setEditingTaskAction(data));
    dispatch(openModalAction('task'));
  }

  return (
    <div className="flex  pt-10">
      <TimeColumn />
      <div className="border-l border-neutral-100 divide-x divide-neutral-100 flex calendar-bound">
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
        <Column openEditTaskModal={openEditTaskModal} date={new Date()} />
      </div>
    </div>
  );
};

export default CalendarBody;
