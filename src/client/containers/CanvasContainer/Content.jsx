import PropTypes from 'prop-types';
import CalendarContainer from '../CalendarContainer';
import AboutContainer from '../AboutContainer';
import BoardContainer from '../BoardContainer';
import TimelineContainer from '../TimelineContainer';

const Content = ({ view }) => {
  if (view === 'calendar') {
    return <CalendarContainer />;
  }

  if (view === 'agenda') {
    return <TimelineContainer />;
  }

  if (view === 'board') {
    return <BoardContainer />;
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
