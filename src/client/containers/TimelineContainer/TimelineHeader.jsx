import PropTypes from 'prop-types';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

const TimelineHeader = ({ date }) => (
  <div className="py-4 md:py-6">
    <span className="block text-lg lg:text-2xl font-bold text-primary-800">
      {isYesterday(date) && 'Yesterday'}
      {isToday(date) && 'Today'}
      {isTomorrow(date) && 'Tomorrow'}

      {/* If not any of the days, yesterday, today or tomorrow */}
      {!isYesterday(date) &&
        !isToday(date) &&
        !isTomorrow(date) &&
        format(date, 'EEEE dd')}
    </span>
    <span className="block text-neutral-500 font-normal text-small">
      {format(date, 'MMM yyyy')}
    </span>
  </div>
);

TimelineHeader.propTypes = {
  date: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TimelineHeader;
