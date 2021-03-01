import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { format } from 'date-fns';
import { Drawer, TimeTicker } from '@app/components';
import { globalStateSelector, getOpenedTaskSelector } from '@app/selectors';
// import { setOpenedTaskAction, closeDrawerAction } from '@app/actions';
import { setOpenedTaskAction, closeDrawerAction } from '../../actions';

const { Title } = Typography;

const TaskDrawerContainer = () => {
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
    <Drawer isOpen={isOpen}>
      <Drawer.Header onClose={onClose}>
        {task && (
          <div className="pl-2">
            {/* <Title level={5} className="p-0 m-0">
              {task && task.title}
            </Title> */}
            <div className="p-0 m-0">
              <span className="font-bold">{format(task.date, 'EEE dd')}</span>
              <span className="text-sm text-neutral-400">
                &nbsp;&nbsp;{task.startTime}-{task.endTime}
              </span>
            </div>
            {/* <Title level={5}>
              {format(task.date, 'EEE dd')}
              <span className="text-base font-thin">
                &nbsp;&nbsp;{task.startTime}-{task.endTime}
              </span>
            </Title> */}
            <TimeTicker />
          </div>
        )}
      </Drawer.Header>
      <div className="px-4 pl-6">
        <Title level={5}>{task && task.title}</Title>
        <p className="font-light text-neutral-500">
          {task && task.description}
        </p>
      </div>
    </Drawer>
  );
};

export default TaskDrawerContainer;
