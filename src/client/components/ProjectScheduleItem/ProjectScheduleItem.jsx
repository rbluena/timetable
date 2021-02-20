import PropTypes from 'prop-types';
import { Text, Button, TimeTicker } from '@app/components';

const ProjectScheduleItem = ({ item }) => (
  <div className="pl-2 my-2 mb-6 border-l-2 border-primary-200 max-w-lg">
    <Text text={item.title} type="xl" />
    <div className="flex">
      <Text text={item.startAt} variant="neutral" />
      &nbsp;-&nbsp;
      <Text text={item.endAt} variant="neutral" />
    </div>
    <div className="my-2">
      <TimeTicker />
    </div>

    <footer>
      <ul className="flex flex-wrap my-4">
        <li className="pr-4">
          <Button type="text-button" variant="primary">
            Activities &nbsp;
            <span className="text-neutral-400">3</span>
          </Button>
        </li>
        <li className="pr-2">
          <Button type="text-button" variant="primary">
            Assets &nbsp;
            <span className="text-neutral-400">3</span>
          </Button>
        </li>
      </ul>
    </footer>
  </div>
);

ProjectScheduleItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default ProjectScheduleItem;
