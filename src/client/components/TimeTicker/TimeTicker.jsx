import { useStopwatch } from 'react-timer-hook';
import { Button } from '@app/components';
import { PauseIcon, PlayIcon } from '@app/components/Icons';

const TimeTicker = ({ startTime, task }) => {
  const { seconds, minutes, hours, start, pause, isRunning } = useStopwatch({
    autoStart: false,
  });

  const formattedHours = `0${hours}`.slice(-2);
  const formattedMinutes = `0${minutes}`.slice(-2);
  const formattedSeconds = `0${seconds}`.slice(-2);

  function startTimer() {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }

  return (
    <div className="flex items-center max-w-sm">
      <span className="text-primary-500 font-bold">{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</span>
      &nbsp;
      <Button onClick={startTimer}>
        {isRunning ? (
          <PauseIcon size="sm" className="text-secondary-600" />
        ) : (
          <PlayIcon size="sm" />
        )}
      </Button>
    </div>
  );
};

export default TimeTicker;
