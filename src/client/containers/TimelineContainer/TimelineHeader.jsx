import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TimelineHeader = ({ date }) => (
  <div className="px-4 text-center">
    <span className="block uppercase font-normal text-neutral-400">
      {format(date, 'MMM')}
    </span>
    <span className="block font-light text-small">{format(date, 'EEE')}</span>
    <span className="block text-lg font-bold">{format(date, 'dd')}</span>
  </div>
);

TimelineHeader.propTypes = {
  date: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TimelineHeader;
