import { useState } from 'react';
import { Rnd as Draggable } from 'react-rnd';

const TaskCard = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimension, setDimension] = useState({ width: 165, height: 49 });
  const [isInteract, setIsInteract] = useState(false);

  function onDrag(e, data) {
    setIsInteract(true);

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

  function onDragEnd() {
    setIsInteract(false);
  }

  function onResize(e, direction, ref) {
    setIsInteract(true);

    setDimension((state) => ({
      ...state,
      height: ref.offsetHeight,
    }));
  }

  function onResizeEnd() {
    setIsInteract(false);
  }

  return (
    <Draggable
      className={`text-left px-2 bg-primary-100 relative text-primary-700 border-l-2 rounded z-50 ${
        dimension.height <= 21 ? '' : 'p-2'
      } ${isInteract ? 'shadow-lg' : 'shadow-sm'}`}
      // size={{ width: dimension.width, height: dimension.height }}
      position={{ x: position.x, y: position.y }}
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
      <p className="text-sm font-secondary flex items-center">
        <span
          className={`truncate block ${
            dimension.height <= 21 ? 'text-xs' : ''
          }`}
        >
          This is dragable and text is very long
        </span>
        {dimension.height <= 35 && (
          <span className="block text-xs text-neutral-700 truncate">
            10:00am - 11:30am
          </span>
        )}
      </p>
      {dimension.height > 35 && (
        <p className="text-xs font-bold text-neutral-900">10:00am - 11:30am</p>
      )}
    </Draggable>
  );
};

export default TaskCard;
