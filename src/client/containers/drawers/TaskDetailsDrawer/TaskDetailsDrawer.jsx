import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { globalStateSelector, getOpenedTaskSelector } from '@app/selectors';
import { setOpenedTaskAction, closeDrawerAction } from '@app/actions';

const TaskDetailsDrawer = () => {
  const { drawer } = useSelector(globalStateSelector);
  const task = useSelector(getOpenedTaskSelector);
  const dispatch = useDispatch();
  const isOpen = drawer === 'task';

  console.log(task);

  function onClose() {
    dispatch(closeDrawerAction());
    dispatch(setOpenedTaskAction(null));
  }

  return (
    <Drawer
      title={task && task.title}
      placement="right"
      visible={isOpen}
      onClose={onClose}
    >
      <h2>Something beatiful</h2>
    </Drawer>
  );
};

export default TaskDetailsDrawer;
