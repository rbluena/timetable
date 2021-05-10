import { TaskModal } from '@app/components';
import { useSelector, useDispatch } from 'react-redux';
import {
  globalStateSelector,
  getOpenedTaskSelector,
  taskCategoriesSelector,
  projectAssigneesSelector,
} from '@app/selectors';
import {
  closeModalAction,
  createTaskAction,
  updateTaskAction,
  cancelEditingTaskAction,
} from '@app/actions';

const CreateTaskModalContainer = () => {
  const { modal } = useSelector(globalStateSelector);
  const task = useSelector(getOpenedTaskSelector);
  const assignees = useSelector(projectAssigneesSelector);
  const categories = useSelector(taskCategoriesSelector);
  const dispatch = useDispatch();

  const isModalOpen = modal === 'task' && task !== null;

  function onSubmit(data) {
    // We update task if it's not a new task
    if (!data.new) {
      dispatch(updateTaskAction(data._id, data));
    } else {
      delete data.new;
      dispatch(createTaskAction(data));
      dispatch(closeModalAction());
    }
  }

  function onCancel() {
    dispatch(closeModalAction());
    dispatch(cancelEditingTaskAction(task));
  }

  return (
    <TaskModal
      isOpen={isModalOpen}
      closeModal={onCancel}
      onSubmit={onSubmit}
      task={task}
      categories={categories}
      assignees={assignees}
    />
  );
};

export default CreateTaskModalContainer;
