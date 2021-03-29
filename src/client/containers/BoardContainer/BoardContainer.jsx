import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Typography } from 'antd';
import { openModalAction, addNewTaskAction } from '@app/actions';
import { backlogSelector, taskCategoriesSelector, taskAssigneesSelector } from '@app/selectors';
import BoardColumns from './BoardColumns';
import BacklogsList from './BacklogsList';
import Header from './Header';

const { Title } = Typography;

function reorder(columnsData, taskId, source, destination) {
  const columns = cloneDeep(columnsData);
  const sourceColumnTasks = columns[source.droppableId].tasks;
  const destinationColumTasks = columns[destination.droppableId].tasks;

  const task = sourceColumnTasks.find((item) => item._id === taskId);

  const newSourceTasks = sourceColumnTasks.filter(
    (item) => item._id !== taskId
  );

  const newDestTasks =
    source.droppableId === destination.droppableId
      ? destinationColumTasks.slice(destination.index, 1, task)
      : destinationColumTasks.splice(destination.index, 0, task);

  columns[source.droppableId].tasks = newSourceTasks;
  columns[destination.droppableId].tasks = newDestTasks;

  return columns;
}

const BoardContainer = () => {
  const dispatch = useDispatch();
  const { backlogIds, backlog } = useSelector(backlogSelector);
  const categories = useSelector(taskCategoriesSelector);
  const { userAssignees, groupAssignees} = useSelector(taskAssigneesSelector);

  const [backlogTasks, setBacklogTasks] = useState({
    tasks: {
      2345644: {
        _id: 2345644,
        text: 'What do you do!',
      },
      2345641: {
        _id: 2345641,
        text: 'Something second',
      },
      2345601: {
        _id: 2345601,
        text: 'What else can we make reasonable.',
      },
    },
    result: [2345601, 2345644, 2345641],
  });

  const [board, setBoard] = useState({
    columns: {
      1: {
        tasks: [
          { _id: 1, text: 'First' },
          { _id: 2, text: 'Second' },
          { _id: 3, text: 'Third' },
          { _id: 4, text: 'Fourth' },
          { _id: 5, text: 'Fifth' },
        ],
      },
      2: {
        tasks: [],
      },
      0: {
        tasks: [{ _id: 6, text: 'Sixth' }],
      },
      3: {
        tasks: [{ _id: 7, text: 'Seventh' }],
      },
    },
    result: [2, 3, 1, 0],
  });

  function handleDragEnd({ draggableId, destination, source }) {
    if (!destination) {
      return;
    }
    console.log(draggableId);
    console.log(destination);
    console.log(source);
  }

  function openNewTaskModal(data) {
    data.title = 'New task';
    data.new = true;
    data._id = 'new:reandom_string';

    dispatch(addNewTaskAction(data));
    dispatch(openModalAction('task'));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="md:w-2/12">
          <BacklogsList
            openNewTaskModal={openNewTaskModal}
            backlog={backlog}
            backlogIds={backlogIds}
            categories={categories}
            groupAssignees={groupAssignees}
            userAssignees={userAssignees}
          />
        </div>
        <div className="m-2 w-8/12">
          <Title type="secondary" level={4}>
            Title of the page.
          </Title>
          <div className="bg-white shadow rounded p-2">
            <Header />
            <BoardColumns board={board} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
