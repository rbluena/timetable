import PropTypes from 'prop-types';
import { useState } from 'react';
// import { get } from 'lodash';
import { Rnd as Draggable } from 'react-rnd';
import { positionToTime } from '@app/utils';

const TaskCard = ({ task, updateTask }) => {
  const [position, setPosition] = useState(task.position);
  const [time, setTime] = useState({
    startTime: task.startTime,
    endTime: task.endTime,
  });
  const [dimension, setDimension] = useState(task.dimension);
  const [isInteract, setIsInteract] = useState(false);

  const { title } = task;
  // const bgColor = get(task, 'category.bgColor');

  function updateTime(data) {
    setTime(() => {
      const newStartTime = positionToTime[position.y + data.deltaY];
      const newEndTime =
        positionToTime[position.y + data.deltaY + dimension.height];

      return {
        startTime: newStartTime,
        endTime: newEndTime,
      };
    });
  }

  function updatePosition(data) {
    if (data.y < 0) {
      setPosition((state) => ({
        y: 0,
        x: state.x + data.deltaX,
      }));
    } else {
      setPosition((state) => ({
        y: state.y + data.deltaY,
        x: state.x + data.deltaX,
      }));
    }
  }

  function updateDimensionOnResize(ref) {
    setDimension((state) => ({
      ...state,
      height: ref.offsetHeight,
    }));

    setTime((state) => ({
      ...state,
      endTime: positionToTime[position.y + ref.offsetHeight],
    }));
  }

  /**
   *
   */
  function onDrag(e, data) {
    setIsInteract(true);
    updatePosition(data);
    updateTime(data);
  }

  /**
   *
   */
  function onDragEnd() {
    setIsInteract(false);
    updateTask({
      ...task,
      ...time,
    });
  }

  /**
   *
   */
  function onResize(e, direction, ref) {
    setIsInteract(true);
    updateDimensionOnResize(ref);
  }

  /**
   *
   */
  function onResizeEnd() {
    setIsInteract(false);
    updateTask({
      ...task,
      ...time,
    });
  }

  /**
   *
   */
  function openTaskCard() {
    // setIsInteract(true);
    // cardClicked();
  }

  return (
    <Draggable
      className={`text-left px-2 bg-primary-100 relative text-primary-700 border-l-2 rounded z-50 ${
        dimension.height <= 21 ? '' : 'p-2'
      } ${isInteract ? 'shadow-lg' : 'shadow-sm'}`}
      size={{ width: dimension.width, height: dimension.height }}
      position={position}
      dragGrid={[176, 7]}
      resizeGrid={[0, 7]}
      default={{
        x: position.x,
        y: position.y,
        width: 165,
      }}
      bounds=".calendar-bound"
      minHeight={14}
      enableResizing={{ bottom: true }}
      onDragStop={onDragEnd}
      onDrag={onDrag}
      onResize={onResize}
      onResizeStop={onResizeEnd}
    >
      <div role="button" onClick={() => console.log('+++++++ CLICKED ++++++')}>
        <p className="text-sm font-secondary flex items-center p-0 m-0">
          <span
            className={`truncate block ${
              dimension.height <= 28 ? 'text-xs' : ''
            }`}
          >
            {title}
          </span>
          {dimension.height <= 35 && (
            <span className="block text-xs text-neutral-700 truncate">
              {`${time.startTime} - ${time.endTime}`}
            </span>
          )}
        </p>
        {dimension.height > 35 && (
          <span className="inline-block mt-0 text-xs font-bold text-neutral-900">
            {`${time.startTime} - ${time.endTime}`}
          </span>
        )}
        <button onClick={openTaskCard} className="absolute bottom-0 right-0">
          Button
        </button>
      </div>
    </Draggable>
  );
};

TaskCard.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskCard;
