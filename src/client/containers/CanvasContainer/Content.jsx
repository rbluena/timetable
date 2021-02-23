import PropTypes from 'prop-types';
import CalendarContainer from '../CalendarContainer';
import AboutContainer from '../AboutContainer';
import TimelineContainer from '../TimelineContainer';

const Content = ({ view }) => {
  if (view === 'calendar') {
    return <CalendarContainer />;
  }

  if (view === 'agenda') {
    return <TimelineContainer />;
  }

  if (view === 'board') {
    return (
      <div>
        <h2 className="font-bold text-2xl">Board</h2>
      </div>
    );
  }

  return <AboutContainer />;
};

Content.defaultProps = {
  view: 'about',
};

Content.propTypes = {
  view: PropTypes.string,
};

export default Content;
