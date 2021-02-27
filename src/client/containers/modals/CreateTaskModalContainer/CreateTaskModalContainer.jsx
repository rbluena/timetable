import { CreateTask } from '@app/components';
import { useSelector, useDispatch } from 'react-redux';
import { globalStateSelector, tasksStateSelector } from '@app/selectors';
import {
  closeModalAction,
  createTaskAction,
  cancelEditingTaskAction,
} from '@app/actions';

const CreateTaskModalContainer = () => {
  const { modal } = useSelector(globalStateSelector);
  const { editingTask } = useSelector(tasksStateSelector);
  const dispatch = useDispatch();

  function onSubmit(data) {
    console.log(data);
    dispatch(createTaskAction(data));
    dispatch(closeModalAction());
  }

  function onCancel() {
    dispatch(cancelEditingTaskAction(editingTask));
    dispatch(closeModalAction());
  }

  return (
    <CreateTask
      isOpen={modal === 'task'}
      closeModal={onCancel}
      onSubmit={onSubmit}
      editingTask={editingTask}
    />
  );
};

export default CreateTaskModalContainer;
