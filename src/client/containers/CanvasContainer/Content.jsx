import PropTypes from 'prop-types';

const Content = ({ view }) => {
  if (view === 'calendar') {
    return (
      <div>
        <h2 className="font-bold text-2xl">Calendar</h2>
      </div>
    );
  }

  if (view === 'timeline') {
    return (
      <div>
        <h2 className="font-bold text-2xl">Timeline</h2>
      </div>
    );
  }

  if (view === 'board') {
    return (
      <div>
        <h2 className="font-bold text-2xl">Board</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">About</h2>
    </div>
  );
};

Content.defaultProps = {
  view: 'about',
};

Content.propTypes = {
  view: PropTypes.string,
};

export default Content;
