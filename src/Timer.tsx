import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useBoolean, useInterval } from 'react-use';
import dayjs from './dayjs';

interface TimerProps {
  delay?: number;
  isoDuration?: string;
}

function Timer(props: TimerProps): JSX.Element {
  const { delay = 1000, isoDuration = 'PT25M' } = props;

  const now = dayjs();
  const duration = dayjs.duration(isoDuration);

  const [isRunning, toggleIsRunning] = useBoolean(false);
  const [currentTime, setCurrentTime] = useState<Date>(now.toDate());
  const [endAt, setEndAt] = useState<Date>(now.add(duration).toDate());

  function onStartClick() {
    const now = dayjs();
    const endDate = now.add(duration);

    setCurrentTime(now.toDate());
    setEndAt(endDate.toDate());
    toggleIsRunning(true);
  }

  function onStopClick() {
    toggleIsRunning(false);
  }

  useInterval(
    () => {
      const now = new Date();

      if (now > endAt) {
        toggleIsRunning(false);
      }

      setCurrentTime(now);
    },
    isRunning ? delay : null,
  );

  const output = dayjs.duration(dayjs(endAt).diff(dayjs(currentTime))).format('HH:mm:ss');

  return (
    <>
      <Helmet>
        <title>{output}</title>
      </Helmet>
      <output>{output}</output>
      {isRunning ? (
        <button onClick={onStopClick}>Stop</button>
      ) : (
        <button onClick={onStartClick}>Start</button>
      )}
    </>
  );
}

export default Timer;
