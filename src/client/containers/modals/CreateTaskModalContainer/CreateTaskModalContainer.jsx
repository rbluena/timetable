import { CreateTask } from '@app/components';
import { useSelector, useDispatch } from 'react-redux';
import {
  globalStateSelector,
  tasksStateSelector,
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
  const { editingTask } = useSelector(tasksStateSelector);
  const assignees = useSelector(projectAssigneesSelector);
  const categories = useSelector(taskCategoriesSelector);
  const dispatch = useDispatch();

  function onSubmit(data) {
    // We update task if it's not a new task
    if (!data.new) {
      dispatch(updateTaskAction(data._id, data));
    } else {
      delete data.new;
      dispatch(createTaskAction(data));
    }
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
      categories={categories}
      assignees={assignees}
    />
  );
};

export default CreateTaskModalContainer;
