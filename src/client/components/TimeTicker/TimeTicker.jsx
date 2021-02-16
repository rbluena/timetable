import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button } from '@app/components';
import { PauseIcon, PlayIcon } from '@app/components/Icons';

const TimeTicker = ({ stopTimer, isTimerRunning }) => {
  const { seconds, minutes, hours, start, pause, isRunning } = useStopwatch({
    autoStart: false,
  });

  const formttedHours = `0${hours}`.slice(-2);
  const formttedMinutes = `0${minutes}`.slice(-2);
  const formttedSeconds = `0${seconds}`.slice(-2);

  function startTimer() {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }

  return (
    <div className="flex max-w-md">
      <span className="text-primary-700 text-xl font-bold">{`${formttedHours}:${formttedMinutes}:${formttedSeconds}`}</span>
      &nbsp;
      <Button onClick={startTimer}>
        {isRunning ? (
          <PauseIcon size="sm" className="text-secondary-600" />
        ) : (
          <PlayIcon size="sm" variant="secondary" />
        )}
      </Button>
    </div>
  );
};

export default TimeTicker;
