import { CreateTask } from '@app/components';
import { useSelector, useDispatch } from 'react-redux';
import { globalStateSelector, tasksStateSelector } from '@app/selectors';
import { closeModalAction, submitTaskAction } from '@app/actions';

const CreateTaskModalContainer = () => {
  const { modal } = useSelector(globalStateSelector);
  const { editingTask } = useSelector(tasksStateSelector);
  const dispatch = useDispatch();

  function onSubmit(data) {
    dispatch(submitTaskAction(data));
  }

  return (
    <CreateTask
      isOpen={modal === 'task'}
      closeModal={() => dispatch(closeModalAction())}
      onSubmit={onSubmit}
      editingTask={editingTask}
    />
  );
};

export default CreateTaskModalContainer;
