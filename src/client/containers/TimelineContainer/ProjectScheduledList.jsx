import { ProjectScheduleItem } from '@app/components';
import { PlayIcon } from '@app/components/Icons';

const item = {
  title: "Newton's law of motion.",
  timer: '00:00:00',
  startAt: '11:00 am',
  endAt: '12:45 pm',
  activities: [
    {
      title: 'Study time',
      spanTime: '15 mins',
    },
    {
      title: 'Study time',
      spanTime: '25 mins',
    },
    {
      title: 'Study time',
      spanTime: '1 hr',
    },
  ],
  assets: 6,
};

const ProjectScheduledList = () => (
  <div>
    <ProjectScheduleItem item={item} />
  </div>
);

export default ProjectScheduledList;
