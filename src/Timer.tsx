import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState } from "react";
import { useBoolean, useInterval } from "react-use";

dayjs.extend(duration);

interface TimerProps {
  delay?: number;
  isoDuration?: string;
}

function Timer(props: TimerProps): JSX.Element {
  const { delay = 1000, isoDuration = "PT25M" } = props;

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
    isRunning ? delay : null
  );

  return (
    <>
      <output>
        {dayjs.duration(dayjs(endAt).diff(dayjs(currentTime))).format("mm:ss")}
      </output>
      {isRunning ? (
        <button onClick={onStopClick}>Stop</button>
      ) : (
        <button onClick={onStartClick}>Start</button>
      )}
    </>
  );
}

export default Timer;
