import { useParams } from 'react-router-dom';
import { z } from 'zod';
import Timer from './Timer';
import dayjs from './dayjs';

const paramsSchema = z.object({
  minutes: z.coerce
    .number()
    .int()
    .positive()
    .lt(24 * 60),
});

function App(): JSX.Element {
  const params = useParams();
  const { minutes } = paramsSchema.parse(params);
  const isoDuration = dayjs
    .duration({
      minutes,
    })
    .toISOString();

  return <Timer isoDuration={isoDuration} />;
}

export default App;
